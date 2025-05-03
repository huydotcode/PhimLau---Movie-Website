import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loading from "./Loading";

const PageTransitionLoader = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.pathname.includes("/admin")) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="relative bg-linear-to-b from-[#383838bb] to-black">
      {/* Animate loader phủ lên */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            className="w-screen h-screen fixed top-0 left-0 z-[100] flex items-center justify-center bg-black select-none"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Loading isLoading={loading} imageWidth={100} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PageTransitionLoader;
