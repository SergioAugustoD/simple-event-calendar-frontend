import styled from "styled-components";

export const CommentsContainer = styled.div`
  background-color: #f9f9f9;
  padding: 16px;
  border-radius: 4px;
`;

export const CommentItem = styled.div`
  margin-bottom: 16px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
    border-bottom: none;
    padding-bottom: 0;
  }
`;

export const CommentAuthor = styled.h4`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
`;

export const CommentText = styled.p`
  font-size: 16px;
  margin-bottom: 4px;
  color: #555;
`;

export const CommentDate = styled.span`
  font-size: 14px;
  color: #888;
`;
