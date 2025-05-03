import AdminLayout from "../layouts/AdminLayout";
import CategoryList from "../pages/admin/CategoryList";
import MovieList from "../pages/admin/MovieList";
import UserList from "../pages/admin/UserList";
import AdminPage from "../pages/AdminPage";

export const adminRoutes = {
  path: "/admin",
  element: AdminPage,
  layout: AdminLayout,
  children: [
    {
      path: "movies",
      element: MovieList,
      layout: AdminLayout,
    },
    {
      path: "categories",
      element: CategoryList,
      layout: AdminLayout,
    },
    {
      path: "users",
      element: UserList,
      layout: AdminLayout,
    },
  ],
};
