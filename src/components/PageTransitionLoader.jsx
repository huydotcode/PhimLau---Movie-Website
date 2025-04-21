import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Loading from "./Loading";
import { publicRoutes } from "../routes";

const PageTransitionLoader = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        key="page-transition"
        id="page-transition"
        className="relative @container bg-gradient-to-b from-[#1a1a1abb] to-black min-h-screen text-white z-10 w-full"
      >
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.element;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <>
                    <Page />
                  </>
                }
              />
            );
          })}
        </Routes>
      </motion.div>
    </>
  );
};

export default PageTransitionLoader;
