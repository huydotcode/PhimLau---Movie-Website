import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./styles/App.css";

import { ConfigProvider } from "antd";
import PageTransitionLoader from "./components/PageTransitionLoader";

function App() {
  return (
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
          motionBase: 0.8,
        },
      }}
    >
      <BrowserRouter>
        <Toaster richColors position="bottom-right" theme="dark" />

        <PageTransitionLoader />
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
