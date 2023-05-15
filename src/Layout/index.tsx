import HeaderWithMenu from "components/Header";
import React, { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Content } from "./styles";

type PageProps = {
  children: React.ReactNode;
};

const useHeader = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    isHeaderTransparent: true,
  });

  useLayoutEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setState((prevState) => ({
        ...prevState,
        isHeaderTransparent: scrollTop === 0,
      }));
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return {
    ...state,
    navigate,
    setState,
  };
};

const Page: React.FC<PageProps> = React.memo(({ children }) => {
  return (
    <Container>
      <HeaderWithMenu />
      <Content>{children}</Content>
    </Container>
  );
});

export default Page;
