import styled from "styled-components";

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
