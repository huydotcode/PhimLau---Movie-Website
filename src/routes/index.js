import CategoryPage from "../pages/CategoryPage";
import CountryPage from "../pages/CountryPage";
import FilterMoviePager from "../pages/FilterMoviePager";
import HomePage from "../pages/HomePage";
import MovieInfomationPage from "../pages/MovieInfomationPage";
import SearchPage from "../pages/SearchPage";
import SerieMoviePage from "../pages/SerieMoviePage";
import SingleMoviePage from "../pages/SingleMoviePage";
import WatchMoviePage from "../pages/WatchMoviePage";

export const publicRoutes = [
  { path: "/", element: HomePage },
  { path: "/phim-le", element: SingleMoviePage },
  { path: "/phim-bo", element: SerieMoviePage },
  { path: "/the-loai", element: CategoryPage },
  { path: "/quoc-gia", element: CountryPage },
  { path: "/tim-kiem", element: SearchPage },
  { path: "/duyet-phim", element: FilterMoviePager },
  { path: "/xem-phim/:slug", element: WatchMoviePage },
  { path: "/phim/:slug", element: MovieInfomationPage },
];
