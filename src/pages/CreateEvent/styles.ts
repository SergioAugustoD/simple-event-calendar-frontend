import styled from "styled-components";

export const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

export const Heading = styled.h1`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
`;

export const Form = styled.form`
  margin-top: 2rem;
`;

export const FormControl = styled.div`
  margin-bottom: 1rem;
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
`;

export const ErrorBox = styled.div`
  color: red;
  margin-top: 0.5rem;
`;

export const StyledButton = styled.button`
  background-color: blue;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    opacity: 0.8;
  }
`;
