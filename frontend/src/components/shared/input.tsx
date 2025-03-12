"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
interface InputProps {
  onchange: () => void;
  placeholder: string;
  icon?: React.FC;
  type: string;
  className?: string;
}
const Input: React.FC<InputProps> = ({
  onchange,
  placeholder,
  icon: Icon,
  type,
  className,
}) => {
  const [showIcon, setShowIcon] = React.useState(true);
  return (
    <div
      className={clsx(
        " text-md flex-1 flex items-center gap-2 py-2 px-2 rounded-md",
        !showIcon && "pl-4",
        className
      )}
    >
      {Icon && showIcon && (
        <AnimatePresence>
          <motion.div
            initial={{ x: -5 }}
            whileInView={{ x: 0 }}
            exit={{ x: -5 }}
            transition={{ duration: 0.1 }}
          >
            <Icon />
          </motion.div>
        </AnimatePresence>
      )}

      <input
        onFocus={() => setShowIcon(false)}
        onBlur={() => setShowIcon(true)}
        className="flex-1 bg-transparent focus:outline-hidden focus:border-b focus:border-gray-500  rounded-sm  py-2 px-3 "
        type={type}
        placeholder={placeholder}
        onChange={onchange}
      />
    </div>
  );
};

export default Input;
