"use client";

import { motion } from "motion/react";
const HamburgerMenu = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className="flex flex-col gap-2 text-black">
      <motion.span
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? "4px" : 0,
        }}
        transition={{ duration: 0.3 }}
        className="h-[1px] w-[20px] bg-black"
      />
      <motion.span
        animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? "-4px" : 0 }}
        transition={{ duration: 0.3 }}
        className="h-[1px] w-[20px] bg-black"
      />
    </div>
  );
};

export default HamburgerMenu;
