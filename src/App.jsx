import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "./app/store";
import PageTransitionLoader from "./components/PageTransitionLoader";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./styles/App.css";
import { AuthProvider } from "./context/AuthProvider";

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
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
      </AuthProvider>
    </Provider>
  );
}

export default App;
