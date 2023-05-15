import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const Header = styled.header<{ isTransparent: boolean }>`
  background-color: ${({ isTransparent }) =>
    isTransparent ? "#333" : "rgba(51, 51, 51, 0.8)"};
  color: #fff;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  z-index: 999;
  transition: background-color 0.3s;
`;

export const MenuButton = styled.button`
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #ff9900;
  }
`;

export const MenuList = styled.ul<{ isOpen: boolean }>`
  position: absolute;
  top: 65px;
  right: 20px;
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  background-color: #333;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  z-index: 1;
`;

export const MenuItem = styled.li`
  padding: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #444;
  }
`;

export const Content = styled.main`
  flex-grow: 1;
  padding: 20px;
  background-color: #f9f9f9;
  position: relative;
  margin-top: 80px; /* Ajuste o valor para corresponder à altura do cabeçalho */
`;
