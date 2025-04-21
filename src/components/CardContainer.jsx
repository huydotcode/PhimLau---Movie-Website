import React from "react";
import { motion } from "framer-motion";

const CardContainer = ({ className = "", children, onClick = () => {} }) => {
  return (
    <motion.div
      className={`relative h-[360px] rounded-xl overflow-hidden cursor-pointer shadow-lg bg-[#1c1c1e] w-full ${className}`}
      initial={{ scale: 0.8, y: 0 }}
      whileInView={{ scale: 1, y: 0, opacity: 0.8 }}
      viewport={{ once: true, amount: 0.2 }}
      exit={{ scale: 0.95, y: 0 }}
      whileTap={{ scale: 0.95 }}
      whileFocus={{ scale: 0.95 }}
      whileHover={{
        scale: 1.01,
        y: -8,
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",
      }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default CardContainer;
