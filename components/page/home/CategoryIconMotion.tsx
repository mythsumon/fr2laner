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
      initial={{ opacity: 0, y: 40, rotate: -45, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.08,
      }}
      className="flex h-full w-full items-center justify-center"
    >
      {children}
    </motion.div>
  );
};





