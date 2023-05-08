import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";

import { RecoilRoot } from "recoil";
import Router from "routes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <RecoilRoot>
        <Router />
      </RecoilRoot>
    </ChakraProvider>
  </React.StrictMode>
);
