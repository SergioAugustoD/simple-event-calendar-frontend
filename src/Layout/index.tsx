import React, { ReactNode } from "react";
import { Box, Flex } from "@chakra-ui/react";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Flex>
      {/* Sidebar */}
      <Box w="200px" bg="gray.200" p={4}>
        {/* Conteúdo da Sidebar */}
      </Box>

      {/* Conteúdo Principal */}
      <Box flex="1" p={4}>
        {children}
      </Box>
    </Flex>
  );
};

export default Layout;
