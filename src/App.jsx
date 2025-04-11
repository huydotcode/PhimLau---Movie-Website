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

function App() {
  return (
    <BrowserRouter>
      <Toaster richColors position="bottom-left" />

      <Header />
      <Banner />

      <div className="relative @container bg-gradient-to-b from-[#1a1a1abb] to-black min-h-screen text-white z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/watch-movie/:slug" element={<WatchMoviePage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/movie/:slug" element={<MovieInfomationPage />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
