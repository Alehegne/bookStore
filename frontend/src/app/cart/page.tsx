"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart } from "lucide-react";
import Image from "next/image";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store/cart";
import { useDispatch } from "react-redux";
import { clearCart, removeFromCart } from "../Redux/features/cart/cartSlice";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loading from "@/components/shared/loading";
const Cart = () => {
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useDispatch<AppDispatch>();
  const [isMounted, setIsMounted] = React.useState(false); //to avoid hydration error

  const total = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);
  }, [cartItems]);

  //to avoid hydration error
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleRemove = (id: string | number) => {
    console.log("removing item fromcart", id);
    dispatch(removeFromCart({ id }));
  };
  const handleClearCart = () => {
    console.log("clearing cart");
    dispatch(clearCart());
  };
  if (!isMounted) {
    return <Loading message="Loading your cart" />;
  }

  console.log("cartItems in cart", cartItems);
  return (
    <div className="bg-gray-100 min-h-screen w-full">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0.7, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.2 }}
          className="customContainer mt-14 pt-16 mb-10 sm:mt-10 md:pt-10"
        >
          {cartItems.length > 0 ? (
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <h4 className="h2 opacity-70">shopping cart</h4>
                <Button
                  onClick={handleClearCart}
                  variant="outline"
                  className="bg-amber-300 pmedium  hover:scale-105 active:scale-100 transition-all"
                >
                  clear cart
                  <ShoppingCart strokeWidth={1} size={38} />
                </Button>
              </div>

              {/* cart items */}
              {cartItems.map((item, index) => (
                <AnimatePresence key={item._id}>
                  <motion.div
                    initial={{ opacity: 0.7, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0.7, x: 400 }}
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                    className="flex justify-between pt-0.5  bg-gray-50 rounded-2xl px-0.5  h-[110px]  w-full mt-4 border-b-2 pb-4 border-gray-700/10"
                  >
                    <div className="flex gap-4">
                      <div className="relative h-[100px] w-[100px]">
                        <Image
                          src={item.coverImage}
                          alt="productImage"
                          fill
                          className="rounded-md"
                        />
                      </div>
                      <div className="flex h-full flex-col gap-1 ">
                        <h2 className="h2">{item.title}</h2>
                        <p className="pmedium opacity-60">
                          category:
                          <span className="bg-gray-300 ml-2 py-0.5 px-1.5 font-bold   rounded-lg">
                            {item.genre}
                          </span>
                        </p>
                        <p className="pmedium">
                          Qt:<span className="pbold ml-1">12</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between items-end mr-4">
                      <p className="font-bold text-sm">
                        ${item.newPrice.toFixed(2)}
                      </p>
                      <Button
                        onClick={() => handleRemove(item._id)}
                        variant="outline"
                        className="bg-transparent text-red-500 hover:border-2 hover:border-red-600 hover:scale-[1.01] active:scale-[1]"
                      >
                        remove
                      </Button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              ))}
              <div className="flex flex-col  w-full bg-gray-50 mt-8 py-2 px-4">
                <div className="flex justify-between mr-4 ">
                  <h2 className="h2">Total</h2>
                  <p className="pbold">${total}</p>
                </div>
                <p className="text-sm font-light mb-4">
                  shipping and taxes will be calculated at checkouts
                </p>
                <Button
                  onClick={() => router.push("/cart/checkout")}
                  className="bg-violet-600 mb-2 text-white text-lg hover:bg-violet-800"
                >
                  Check out
                </Button>
                <Link
                  href="/"
                  className="flex cursor-pointer hover:scale-[1.01] active:scale-[1] group gap-4 items-center justify-center"
                >
                  <span>or continue shopping </span>

                  <span className=" group-hover:scale-200 group-active:scale-100 transition-all">
                    <ArrowRight className="hover:underline" />
                  </span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex rounded flex-col items-center justify-center h-[80vh] gap-4">
              <div className=" w-[400px] h-[300px] flex items-center justify-center ">
                <Image
                  src="/assets/emptyCart.png"
                  width={300}
                  height={200}
                  alt="empty cart"
                />
              </div>
              <h1 className="h1">Your Cart is empty</h1>
              <Link
                href="/"
                className="flex cursor-pointer hover:scale-[1.01] active:scale-[1] group gap-4 items-center justify-center"
              >
                <span>Explore products </span>

                <span className=" group-hover:scale-200 group-active:scale-100 transition-all">
                  <ArrowRight className="hover:underline" />
                </span>
              </Link>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Cart;
