import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Sidebar = styled.aside<{ open: boolean }>`
  display: flex;
  flex-direction: column;
  background: rgb(40, 40, 42);
  background: linear-gradient(
    180deg,
    rgba(40, 40, 42, 1) 0%,
    rgba(1, 1, 5, 1) 100%,
    rgba(0, 212, 255, 1) 100%
  );
  padding: 1rem;
  width: 8vw;
  height: 100vh;
  transition: transform 0.3s ease;
  z-index: 1;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    max-width: 38vw;
    z-index: 1;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  }
`;

export const BoxUser = styled.div`
  margin-bottom: 1rem;
  font-weight: bold;

  &.box-user {
    color: white;
    display: flex;
    height: 100px;
    align-items: center;
    justify-content: center;
  }
`;

export const Content = styled.div`
  padding: 1rem;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;
