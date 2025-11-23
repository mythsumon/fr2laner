"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type CategoryIconMotionProps = {
  index: number;
  children: ReactNode;
};

export const CategoryIconMotion = ({ index, children }: CategoryIconMotionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.05,
      }}
      className="flex h-full w-full items-center justify-center"
    >
      {children}
    </motion.div>
  );
};





