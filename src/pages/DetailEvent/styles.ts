import { Box, Button, ButtonProps, Heading, Input, Text } from "@chakra-ui/react";
import styled from "styled-components";

type EventDetailProps = {
  confirmUntil: string;
};

export const Container = styled(Box)`
  && {
    padding: 1rem;
    background-color: #f8f8f8;
  }
`;

export const EventTitle = styled(Heading)`
  && {
    margin-bottom: 2rem;
    color: #333333;
    font-size: 1rem;

    @media screen and (max-width: 768px) {
      font-size: 1.5rem;
    }
  }
`;

export const EventDetails = styled(Box)<EventDetailProps>`
  && {
    border: 1px solid #cccccc;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
  }
`;

export const EventInfo = styled(Text)`
  && {
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
    color: #555555;

    @media screen and (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

export const DeleteButton = styled(Button)<ButtonProps>`
  && {
    background-color: #e74c3c;
    color: #ffffff;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #c0392b;
    }

    @media screen and (max-width: 768px) {
      font-size: 0.8rem;
    }
  }
`;

export const ParticipantsList = styled(Box)`
  && {
    margin-top: 2rem;
  }
`;

export const ParticipantItem = styled(Box)`
  && {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
`;

export const ParticipantName = styled(Text)`
  && {
    margin-left: 1rem;
    color: #333333;
    font-size: 1.2rem;

    @media screen and (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

export const StyledButton = styled.button`
  && {
    background-color: #ff5722;
    color: #ffffff;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    margin: 5px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #e64a19;
    }

    @media screen and (max-width: 768px) {
      font-size: 0.8rem;
    }
  }
`;

export const CommentSectionContainer = styled(Box)`
  && {
    margin-top: 20px;
  }
`;

export const CommentContainer = styled(Box)`
  && {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 10px;
  }
`;

export const CommentAuthor = styled(Heading).attrs({
  as: "h4",
  size: "sm",
})`
  && {
    margin-bottom: 5px;

@media screen and (max-width: 768px) {
  font-size: 0.9rem;
}
}
`;

export const CommentText = styled(Box)`
&& {
margin-bottom: 10px;

@media screen and (max-width: 768px) {
  font-size: 0.9rem;
}
}
`;

export const CommentForm = styled(Box)`
&& {
margin-top: 20px;
}
`;

export const CommentInput = styled(Input)`
&& {
margin-bottom: 10px;
}
`;

export const CommentButton = styled(Button)`
&& {
width: 100%;
}

@media screen and (max-width: 768px) {
font-size: 0.9rem; 
}

`
