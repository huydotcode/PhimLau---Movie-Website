import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./styles/App.css";

import PageTransitionLoader from "./components/PageTransitionLoader";

function App() {
  return (
    <BrowserRouter>
      <Toaster richColors position="bottom-right" theme="dark" />

      <PageTransitionLoader />
    </BrowserRouter>
  );
}

export default App;
