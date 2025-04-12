import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "sonner";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./styles/App.css";

import Banner from "./components/Banner";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import MovieInfomationPage from "./pages/MovieInfomationPage";
import SearchPage from "./pages/SearchPage";
import WatchMoviePage from "./pages/WatchMoviePage";
import CategoryPage from "./pages/CategoryPage";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import SingleMoviePage from "./pages/SingleMoviePage";
import SerieMoviePage from "./pages/SerieMoviePage";
import CountryPage from "./pages/CountryPage";
import FilterMoviePager from "./pages/FilterMoviePager";

function App() {
  return (
    <BrowserRouter>
      <Toaster richColors position="bottom-left" />

      <Header />
      <Banner />
      <ScrollToTop />

      <div className="relative @container bg-gradient-to-b from-[#1a1a1abb] to-black min-h-screen text-white z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/phim-le" element={<SingleMoviePage />} />
          <Route path="/phim-bo" element={<SerieMoviePage />} />
          <Route path="/the-loai" element={<CategoryPage />} />
          <Route path="/quoc-gia" element={<CountryPage />} />
          <Route path="/tim-kiem" element={<SearchPage />} />
          <Route path="/duyet-phim" element={<FilterMoviePager />} />

          <Route path="/xem-phim/:slug" element={<WatchMoviePage />} />
          <Route path="/phim/:slug" element={<MovieInfomationPage />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
