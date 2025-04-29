import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { publicRoutes } from "../routes";
import Footer from "./Footer";
import Header from "./Header";
import Loading from "./Loading";
import ScrollToTop from "./ScrollToTop";

const PageTransitionLoader = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

      {/* Nội dung app luôn luôn render */}
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        id="page-transition"
        className="relative bg-gradient-to-b from-[#0a0a0abb] to-black min-h-screen text-white z-10 w-full"
      >
        <Header />
        <ScrollToTop />

        <Routes location={location} key={location.pathname}>
          {publicRoutes.map((route, index) => {
            const Layout = route?.layout ?? React.Fragment;

            const Page = route.element;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <>
                    <Layout>
                      <Page />
                    </Layout>
                  </>
                }
              />
            );
          })}
        </Routes>

        <Footer />
      </motion.div>
    </div>
  );
};

export default PageTransitionLoader;
