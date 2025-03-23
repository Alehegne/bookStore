"use client";
import { useGetBooksQuery } from "@/app/Redux/features/backendConnection/bookApi";
import { Button } from "@/components/ui/button";
import { Filter, PlusCircle } from "lucide-react";
import React from "react";
import { NewBookDialog } from "../_components/sections/NewBookDialog";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import CategorySelector from "@/components/shared/categorySelector";
import AuthorSelector from "@/components/shared/AuthorSelector";
import Image from "next/image";
import Loading from "@/components/shared/loading";

const dummyStock = ["In Stock", "Out of Stock", "Pre Order", "Coming Soon"];
const dummyAuthor = ["John Doe", "Jane Doe", "Mark Twain", "J.K. Rowling"];

const Books = () => {
  const [showFilters, setShowFilters] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [selectedAuthor, setSelectedAuthor] = React.useState("All Author");
  const [selectedStock, setSelectedStock] = React.useState("All Stock");
  const [search, setSearch] = React.useState("");
  const [pageNum, setPageNum] = React.useState(1);
  const { data, isLoading, isError } = useGetBooksQuery({
    page: pageNum,
    limit: 10,
  });

  console.log("data in admin books", data?.books);
  console.log("analysis", data?.analysis);
  console.log("pagenum", pageNum);

  return (
    <>
      <div className="flex flex-col bg-300 w-full h-full md:w-flex-1 px-4 py-4">
        {/* headers */}
        <div className="flex md:justify-between flex-col md:flex-row gap-4 md:items-center mb-5">
          <div className="flex flex-col gap-0">
            <h1 className="text-3xl font-bold pb-0 mb-0">Books</h1>
            <p className="text-[16px] opacity-75 mt-0">
              Manage your book inventory.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:items-center">
            <Button
              onClick={() => setShowFilters((prev) => !prev)}
              className="flex hover:scale-[1.01] active:scale-100 hover:bg-gray-100/5 items-center ring-1 bg-gray-50 ring-gray-400/20 gap-1"
            >
              <Filter className="w-4 h-4" />
              <span>{showFilters ? "Hide Filters" : "Show Filters"}</span>
            </Button>
            <NewBookDialog>
              <Button
                variant="ghost"
                className="bg-black hover:scale-[1.01] active:scale-100  text-white flex items-center gap-1"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add New Book</span>
              </Button>
            </NewBookDialog>
          </div>
        </div>
        {/* filtering  */}
        <div className="flex flex-col">
          {showFilters && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0.5, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.2 }}
                className="  py-4 px-2 ring-2 mb-8 rounded-3xl  ring-gray-600/20 overflow-hidden "
              >
                <div className="grid gap-8 grid-cols-1 ] md:grid-cols-3 w-full items-center   py-2">
                  <CategorySelector
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                  />

                  <AuthorSelector
                    selectedAuthor={selectedAuthor}
                    setSelectedAuthor={setSelectedAuthor}
                  />
                  <div className="">
                    <Label htmlFor="author" className="text-right">
                      Stock Status
                    </Label>
                    <Select
                      onValueChange={(value) => setSelectedStock(value)}
                      defaultValue={selectedStock}
                    >
                      <SelectTrigger className="col-span-3 bg-gray-100 ring-1 ring-gray-900/20 border-none focus-visible:ring-2 focus-visible:ring-gray-800/40 focus-visible:border-none focus-visible:outline-none text-gray-900 placeholder:text-gray-500 w-full h-[50px] rounded-md">
                        <SelectValue placeholder="stock status" />
                      </SelectTrigger>
                      <SelectContent
                        style={{ scrollbarWidth: "none" }}
                        className="bg-gray-100 ring-1 ring-gray-500/20 border-none w-full overflow-x-hidden overflow-y-scroll"
                      >
                        {dummyStock.map((stock, index) => (
                          <SelectItem
                            className="hover:bg-gray-400/20 cursor-pointer "
                            key={index}
                            value={stock}
                          >
                            {stock}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="justify-end flex gap-2 mt-8">
                  <Button
                    variant="outline"
                    className="bg-gray-100 cursor-pointer text-gray-900 hover:bg-gray-100/90 hover:scale-[1.01] active:scale-100"
                  >
                    Reset
                  </Button>
                  <Button className="bg-black text-white hover:bg-black/90 hover:scale-[1.01] active:scale-100">
                    Apply Filters
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
          <div className="flex flex-col gap-4">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search for books"
              className="bg-gray-100 ring-1 ring-gray-900/20 border-none focus-visible:ring-2 focus-visible:ring-gray-800/40 focus-visible:border-none focus-visible:outline-none text-gray-900 placeholder:text-gray-500 w-full h-[50px] rounded-md"
            />
            <div className="overflow-x-auto w-full ring-1 ring-gray-900/10 px-2 py-4">
              <table
                style={{ scrollbarWidth: "none" }}
                className="w-full min-w-[600px] overflow-x-scroll"
              >
                <thead>
                  <tr className="opacity-90 text-left text-gray-900/67">
                    <th className="w-[10px] pr-1">No</th>
                    <th className="w-[80px]">Cover</th>
                    <th className="columns-2 ">Title</th>
                    <th className="columns-2 ">Author</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                  </tr>
                </thead>
                {isLoading && <Loading message="Loading Book Details" />}

                <tbody>
                  {data?.books.map((book, index) => (
                    <>
                      <motion.tr
                        className="border-b-1 border-b-gray-600/20"
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.1, delay: 0.01 * index }}
                        key={index}
                      >
                        <td className="w-[20px] text-gray-900/50">
                          {data?.analysis.currentPage === 1
                            ? index + 1
                            : index + 1 + (data?.analysis.currentPage - 1) * 10}
                        </td>
                        <td className="w-[80px] py-1 pl-1">
                          <div className="w-[70px] relative h-[50px] rounded-md ">
                            <Image
                              src={book.coverImage}
                              alt="cover image"
                              fill
                              className=" rounded-md"
                              priority
                            />
                          </div>
                        </td>
                        <td className="columns-2">{book.title}</td>
                        <td className="columns-2">{book.author}</td>
                        <td>{book.genre[0]}</td>
                        <td>${book.newPrice}</td>
                        <td>34</td>
                        <td>
                          <Button
                            variant="outline"
                            className="bg-gray-100 hover:bg-gray-400/20 hover:scale-[1.01] active:scale-100"
                          >
                            View
                          </Button>
                        </td>
                      </motion.tr>
                    </>
                  ))}
                </tbody>
              </table>
              <div className="flex gap-4 items-center">
                <p>pages:</p>
                <div
                  style={{ scrollbarWidth: "none" }}
                  className="flex gap-4 w-full overflow-x-scroll items-center mt-4"
                >
                  {data?.analysis.totalPages && (
                    <>
                      {Array.from(
                        { length: data?.analysis.totalPages },
                        (_, index) => (
                          <Button
                            onClick={() => {
                              console.log("clicked page", index + 1);
                              // handle page change
                              setPageNum(index + 1);
                            }}
                            key={index}
                            variant="outline"
                            className={`bg-gray-100 hover:bg-gray-400/20 hover:scale-[1.01] active:scale-100
                              ${
                                data.analysis.currentPage === index + 1
                                  ? "bg-gray-400/20 text-gray-900"
                                  : " bg-gray-100 text-gray-900"
                              }
                                 
                              `}
                          >
                            {index + 1}
                          </Button>
                        )
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Books;
