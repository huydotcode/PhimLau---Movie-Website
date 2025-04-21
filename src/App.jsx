import { BrowserRouter } from "react-router";
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

function App() {
  return (
    <BrowserRouter>
      <Toaster richColors position="bottom-left" />

      <PageTransitionLoader />
    </BrowserRouter>
  );
}

export default App;
