import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const Content = styled.main`
  flex-grow: 1;
  padding: 20px;
  background-color: #f9f9f9;
  position: relative;
  margin-top: 80px; /* Ajuste o valor para corresponder à altura do cabeçalho */
`;
