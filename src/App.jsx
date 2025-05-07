import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "sonner";
import { store } from "./app/store";
import PageTransitionLoader from "./components/PageTransitionLoader";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { motion } from "framer-motion";
import React from "react";

import { AuthProvider } from "./context/AuthProvider";
import { adminRoutes, publicRoutes } from "./routes";
import AdminRoutes from "./routes/AdminRoutes";
import "./styles/App.css";

const queryClient = new QueryClient();

function App() {
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

              <PageTransitionLoader />
              {/* Nội dung app luôn luôn render */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                id="page-transition"
                className="relative bg-gradient-to-b from-[#0a0a0abb] to-black min-h-screen text-white z-10 w-full"
              >
                {/* Public routes */}
                <Routes location={location}>
                  {publicRoutes.map((route, index) => {
                    const Layout = route?.layout ?? React.Fragment;

                    const Page = route.element;
                    // Nếu route có children thì render children
                    if (route.children) {
                      return (
                        <Route
                          path={route.path}
                          element={
                            <Layout>
                              <Page />
                            </Layout>
                          }
                        >
                          {route.children.map((child, index) => {
                            const ChildLayout = child?.layout ?? React.Fragment;
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

                {/* Admin Routes */}
                <Routes element={<AdminRoutes />}>
                  {adminRoutes.map((route, index) => {
                    const Layout = route?.layout ?? React.Fragment;
                    const Page = route.element;
                    // Nếu route có children thì render children
                    if (route.children) {
                      return (
                        <Route
                          path={route.path}
                          element={
                            <Layout>
                              <Page />
                            </Layout>
                          }
                        >
                          {route.children.map((child, index) => {
                            const ChildLayout = child?.layout ?? React.Fragment;
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
              </motion.div>
            </BrowserRouter>
          </ConfigProvider>
        </QueryClientProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
