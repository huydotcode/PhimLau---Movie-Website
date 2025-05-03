import { motion } from "framer-motion";
import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ScrollToTop from "../components/ScrollToTop";

const LayoutWithoutBanner = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      id="page-transition"
      className="relative bg-gradient-to-b from-[#0a0a0abb] to-black min-h-screen text-white z-10 w-full"
    >
      <Header />
      <ScrollToTop />

      <div className="@container container mx-auto px-4 pt-[80px] pb-10">
        {children}
      </div>

      <Footer />
    </motion.div>
  );
};

export default LayoutWithoutBanner;
