import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/raleway/400.css";
import "@fontsource/open-sans/700.css";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";

import Router from "routes";
import theme from "theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider
      theme={theme}
      toastOptions={{ defaultOptions: { duration: 3000, isClosable: true } }}
    >
      <RecoilRoot>
        <Router />
      </RecoilRoot>
    </ChakraProvider>
  </React.StrictMode>
);
