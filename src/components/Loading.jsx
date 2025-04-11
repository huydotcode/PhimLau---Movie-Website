import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const Loading = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="inset-0 flex items-center justify-center z-[9999] h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.img
            src="/logo.svg"
            alt="Loading"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.8, 1.05, 1], opacity: 1 }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror",
            }}
            className="w-32 h-auto"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loading;
