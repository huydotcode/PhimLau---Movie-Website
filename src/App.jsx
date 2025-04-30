import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";
import { store } from "./app/store";
import PageTransitionLoader from "./components/PageTransitionLoader";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { AuthProvider } from "./context/AuthProvider";
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
                colorPrimary: "#ff4d4f",
                colorTextBase: "#ffffff",
                colorTextLightSolid: "#ffffff",
                colorBgBase: "#000000",
                colorBgContainer: "#000000",
                colorFillAlter: "#ff4d4f",
                colorTextPlaceholder: "#ffffff",
                fontSize: 16,
                fontWeightStrong: 800,
              },
            }}
          >
            <BrowserRouter>
              <Toaster richColors position="bottom-right" theme="dark" />

              <PageTransitionLoader />
            </BrowserRouter>
          </ConfigProvider>
        </QueryClientProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
