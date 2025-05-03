import AdminLayout from "../layouts/AdminLayout";
import LayoutWithBanner from "../layouts/LayoutWithBanner";
import LayoutWithoutBanner from "../layouts/LayoutWithoutBanner";
import CategoryList from "../pages/admin/CategoryList";
import Dashboard from "../pages/admin/Dashboard";
import FavoriteList from "../pages/admin/FavoriteList";
import MovieList from "../pages/admin/MovieList";
import UserList from "../pages/admin/UserList";
import AdminPage from "../pages/AdminPage";
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
  { path: "/", element: HomePage, layout: LayoutWithBanner },
  { path: "/phim-le", element: SingleMoviePage, layout: LayoutWithoutBanner },
  { path: "/phim-bo", element: SerieMoviePage, layout: LayoutWithoutBanner },
  { path: "/the-loai", element: CategoryPage, layout: LayoutWithoutBanner },
  { path: "/quoc-gia", element: CountryPage, layout: LayoutWithoutBanner },
  { path: "/tim-kiem", element: SearchPage, layout: LayoutWithoutBanner },
  {
    path: "/duyet-phim",
    element: FilterMoviePager,
    layout: LayoutWithoutBanner,
  },
  {
    path: "/xem-phim/:slug",
    element: WatchMoviePage,
    layout: LayoutWithBanner,
  },
  {
    path: "/phim/:slug",
    element: MovieInfomationPage,
    layout: LayoutWithBanner,
  },
  {
    path: "/quoc-gia/:slug",
    element: CountryPage,
    layout: LayoutWithoutBanner,
  },
  {
    path: "/the-loai/:slug",
    element: CategoryPage,
    layout: LayoutWithoutBanner,
  },
];

export const adminRoutes = [
  {
    path: "/admin",
    element: AdminPage,
    layout: AdminLayout,
    children: [
      {
        path: "",
        element: Dashboard,
      },
      {
        path: "movies",
        element: MovieList,
      },
      {
        path: "categories",
        element: CategoryList,
      },
      {
        path: "users",
        element: UserList,
      },
      {
        path: "favorites",
        element: FavoriteList,
      },
    ],
  },
];
