import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const BooksByCategoryOrYear = () => {
  const [filter, setFilter] = React.useState<string>("year");

  // Dummy data for books by category and year
  const booksByCategory = [
    {
      category: "Fiction",
      count: 14354,
    },
    {
      category: "Non-Fiction",
      count: 7883,
    },
    {
      category: "Science",
      count: 433876,
    },
    {
      category: "History",
      count: 2345,
    },
    {
      category: "Biography",
      count: 12345,
    },
  ];
  const booksByYear = [
    {
      year: 2020,
      count: 143,
    },
    {
      year: 2021,
      count: 234,
    },
    {
      year: 2022,
      count: 345,
    },
    {
      year: 2023,
      count: 456,
    },
    {
      year: 2024,
      count: 567,
    },
  ];

  return (
    <div className="flex flex-col  w-full h-full md:w-flex-1 px-2 py-4 ring-1 ring-gray-500/5 rounded-2xl shadow-sm">
      <h1 className="h1 pb-0">Book Overview</h1>
      <p className="text-[16px] opacity-85 mt-0">
        Distribution of books by category and publication year.
      </p>
      <div className="w-full  h-[40px] flex justify-between items-center p-0.5 bg-gray-200 mt-4 rounded-md">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: 200 }}
            whileInView={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
            viewport={{ once: false }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setFilter("category")}
            className={`w-[50%] h-full cursor-pointer   flex justify-center items-center rounded-md
            ${filter === "category" ? "bg-white" : "bg-gray-200"} `}
          >
            <h1 className="text-[18px] text-center">Books by Category</h1>
          </motion.div>
        </AnimatePresence>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: -200 }}
            whileInView={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
            viewport={{ once: false }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setFilter("year")}
            className={`w-[50%] h-full cursor-pointer   flex items-center justify-center rounded-md $
            ${filter === "year" ? "bg-white" : "bg-gray-200"} `}
          >
            <h1 className="text-[18px] text-center">Books by Year</h1>
          </motion.div>
        </AnimatePresence>
      </div>
      {filter === "category" ? (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { duration: 0.2 } }}
          viewport={{ once: false }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ scrollbarWidth: "none" }}
          className="flex flex-col gap-1 my-4 overflow-y-scroll"
        >
          {booksByCategory.map((book, index) => (
            <div
              key={index}
              className="flex justify-between items-center pl-2 pr-4 py-2"
            >
              <h1 className="text-[16px]">{book.category}</h1>
              <p className="text-[16px] font-semibold">{book.count}</p>
            </div>
          ))}
        </motion.div>
      ) : (
        filter === "year" && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { duration: 0.4 } }}
            viewport={{ once: false }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-1 my-4"
          >
            {booksByYear.map((book, index) => (
              <div
                key={index}
                className="flex justify-between items-center pl-2 pr-4 py-2"
              >
                <h1 className="text-[16px]">{book.year}</h1>
                <p className="text-[16px] font-semibold">{book.count}</p>
              </div>
            ))}
          </motion.div>
        )
      )}
    </div>
  );
};

export default BooksByCategoryOrYear;
