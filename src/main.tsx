import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "@fontsource/open-sans/700.css";
import "@fontsource/raleway/400.css";
import { StepsTheme as Steps } from "chakra-ui-steps";
import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";

import Router from "routes";
//import theme from "theme";

const theme = extendTheme({
  components: {
    Steps,
  },
});
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
