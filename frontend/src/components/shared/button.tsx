import clsx from "clsx";
import React from "react";

interface ButtonProps {
  onclick: () => void;
  label?: string;
  icon?: React.FC;
  className?: string;
}
const Button: React.FC<ButtonProps> = ({
  onclick,
  label,
  icon: Icon,
  className,
}) => {
  return (
    <button
      onClick={onclick}
      className={clsx(
        className,
        `bg-primary text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-primary/80 hover:scale-105 transition-all active:scale-100`
      )}
    >
      {Icon && <Icon />}
      <span className="text-[18px] ">{label}</span>
    </button>
  );
};

export default Button;
