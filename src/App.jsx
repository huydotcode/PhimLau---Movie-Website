import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "sonner";
import { store } from "./app/store";
import PageTransitionLoader from "./components/PageTransitionLoader";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

import { fetchAndActivate, getValue } from "firebase/remote-config";
import { remoteConfig } from "./app/firebase";
import { AuthProvider } from "./context/AuthProvider";
import LoginPage from "./pages/LoginPage";
import { adminRoutes, publicRoutes } from "./routes";

import ProtectedRoute from "./routes/ProtectedRoute";
import Loading from "./components/Loading";
import "./styles/App.css";

const queryClient = new QueryClient();

import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";

// Lazy load các trang
// const Dashboard = lazy(() => import("../pages/Dashboard"));
const AdminRoutes = lazy(() => import("./routes/AdminRoutes"));

const MainLayout = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }} // Giảm thời gian transition để mượt hơn
    className="relative bg-gradient-to-b from-[#0a0a0abb] to-black min-h-screen text-white z-10 w-full"
  >
    <PageTransitionLoader />
    <Outlet />
  </motion.div>
);

function App() {
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    ) {
      setIsEnabled(true);
      return;
    }

    fetchAndActivate(remoteConfig).then(() => {
      const status = getValue(remoteConfig, "app_enabled").asBoolean();
      setIsEnabled(status);
    });
  }, []);

  if (!isEnabled) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black text-white flex-col">
        <img src="/logo.png" alt="logo" />
        <h1 className="text-2xl font-bold mt-10">
          Ứng dụng hiện đang dừng hoạt động
        </h1>
        <p className="mt-1">
          Xin lỗi bạn, ứng dụng hiện đang tạm thời ngừng hoạt động để bảo trì và
          nâng cấp.
        </p>
        <p>Chúng tôi sẽ sớm trở lại. Rất mong bạn thông cảm.</p>
        <p className="text-sm text-gray-400 mt-2">
          Liên hệ với Admin qua email: ngonhuthuy1234@gmail.com
        </p>
      </div>
    );
  }

  return (
    <Provider store={store}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#fb2c06",
                colorTextBase: "#ffffff",
                colorTextLightSolid: "#ffffff",
                colorBgBase: "#000000",
                colorBgContainer: "#000000",
                colorFillAlter: "#fb2c06",
                colorTextPlaceholder: "#ffffff",
                fontSize: 16,
                fontWeightStrong: 800,
              },
            }}
          >
            <BrowserRouter>
              <Toaster
                richColors
                position="bottom-right"
                theme="dark"
                duration={3000}
                closeButton={false}
                expand={false}
                containerClassName="z-50"
              />
              <Suspense fallback={<Loading isLoading={true} />}>
                <Routes>
                  {/* Public routes */}
                  <Route path="/login" element={<LoginPage />} />

                  {/* Protected routes */}
                  <Route element={<ProtectedRoute />}>
                    <Route element={<MainLayout />}>
                      {publicRoutes.map((route, index) => {
                        const Layout = route?.layout ?? React.Fragment;
                        const Page = route.element;
                        if (route.children) {
                          return (
                            <Route
                              key={index}
                              path={route.path}
                              element={
                                <Layout>
                                  <Page />
                                </Layout>
                              }
                            >
                              {route.children.map((child, index) => {
                                const ChildLayout =
                                  child?.layout ?? React.Fragment;
                                const ChildPage = child.element;
                                return (
                                  <Route
                                    key={index}
                                    path={child.path}
                                    element={
                                      <ChildLayout>
                                        <ChildPage />
                                      </ChildLayout>
                                    }
                                  />
                                );
                              })}
                            </Route>
                          );
                        }
                        return (
                          <Route
                            key={index}
                            path={route.path}
                            element={
                              <Layout>
                                <Page />
                              </Layout>
                            }
                          />
                        );
                      })}
                    </Route>

                    {/* Admin Routes */}
                    <Route element={<AdminRoutes />}>
                      {adminRoutes.map((route, index) => {
                        const Layout = route?.layout ?? React.Fragment;
                        const Page = route.element;
                        if (route.children) {
                          return (
                            <Route
                              key={index}
                              path={route.path}
                              element={
                                <Layout>
                                  <Page />
                                </Layout>
                              }
                            >
                              {route.children.map((child, index) => {
                                const ChildLayout =
                                  child?.layout ?? React.Fragment;
                                const ChildPage = child.element;
                                return (
                                  <Route
                                    key={index}
                                    path={child.path}
                                    element={
                                      <ChildLayout>
                                        <ChildPage />
                                      </ChildLayout>
                                    }
                                  />
                                );
                              })}
                            </Route>
                          );
                        }
                        return (
                          <Route
                            key={index}
                            path={route.path}
                            element={
                              <Layout>
                                <Page />
                              </Layout>
                            }
                          />
                        );
                      })}
                    </Route>
                  </Route>
                </Routes>
              </Suspense>
            </BrowserRouter>
          </ConfigProvider>
        </QueryClientProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;

