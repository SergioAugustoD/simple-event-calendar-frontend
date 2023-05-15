import styled from "styled-components";

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
  z-index: 2;
`;

export const MenuItem = styled.li`
  padding: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #444;
  }
`;
