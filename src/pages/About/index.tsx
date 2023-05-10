import { Heading, Flex } from "@chakra-ui/react";
import { StyledContainer, StyledText } from "./styles";

const AboutPage = () => {
  return (
    <StyledContainer p={4}>
      <Heading as="h1" size="xl" mb={4}>
        Sobre
      </Heading>
      <StyledText>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt
        dui a leo eleifend, nec lacinia tortor commodo. Sed lacinia mauris
        lectus, non luctus velit mattis vitae. Nulla facilisi. Mauris tempus
        justo vel finibus rutrum. Nunc aliquet est sed lectus dignissim, non
        vestibulum justo bibendum. Integer eget lectus a neque maximus mollis.
        Donec dictum, sem in auctor iaculis, tellus sapien semper ante, sed
        rutrum leo ante in enim. In egestas nulla non commodo ullamcorper. Sed
        id lacus vel ligula auctor sollicitudin. Nunc scelerisque varius nunc
        vel venenatis. Mauris in ligula eget mi blandit feugiat. Vivamus tempus
        massa et augue convallis posuere. Proin consectetur feugiat eros, ut
        laoreet ligula iaculis at. Donec in pulvinar turpis. Donec a efficitur
        sapien. Sed mollis tincidunt sem, id ultrices turpis finibus vitae.
      </StyledText>
      <Flex justify="center" mt={8}>
        <StyledText>?</StyledText>
      </Flex>
    </StyledContainer>
  );
};

export default AboutPage;
