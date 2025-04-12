import React, { useEffect } from "react";
import Icons from "./Icons";
import Button from "./ui/Button";
import { motion } from "framer-motion";

const ScrollToTop = () => {
  const [showScroll, setShowScroll] = React.useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showScroll && (
        <motion.div
          className="fixed flex items-center bg-black justify-center bottom-4 right-4 z-50 text-white p-2 rounded-full cursor-pointer ease-in-out w-10 h-10"
          animate={{ opacity: 0.5, scale: 1 }}
          whileHover={{ scale: 1.1, opacity: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Button onClick={handleScrollToTop}>
            <Icons.ArrowUp className="text-xl" />
          </Button>
        </motion.div>
      )}
    </>
  );
};

export default ScrollToTop;
