import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "sonner";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./styles/App.css";

import Footer from "./components/Footer";
import Header from "./components/Header";
import PageTransitionLoader from "./components/PageTransitionLoader";
import ScrollToTop from "./components/ScrollToTop";
import { publicRoutes } from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Toaster richColors position="bottom-left" />

      <Header />
      <ScrollToTop />
      <PageTransitionLoader />

      <div className="relative @container bg-gradient-to-b from-[#1a1a1abb] to-black min-h-screen text-white z-10 w-full">
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
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
