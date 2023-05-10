import { BsGithub } from "react-icons/bs";
import { FooterContainer, FooterText } from "./styles";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText textAlign="center">
        © 2023 Desenvolvido por SergioAugustoD.
        <a href="https://github.com/SergioAugustoD" target="_blank">
          <BsGithub size={24} />
        </a>
      </FooterText>
    </FooterContainer>
  );
};

export default Footer;
