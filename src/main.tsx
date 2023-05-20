import "@fontsource/open-sans/700.css";
import "@fontsource/raleway/400.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";
import Router from "routes";
//import theme from "theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 2000 }}
      />
      <Router />
    </RecoilRoot>
  </React.StrictMode>
);
