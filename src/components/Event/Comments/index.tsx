import { IComment } from "interfaces/IComment";
import React from "react";
import {
  CommentAuthor,
  CommentDate,
  CommentItem,
  CommentText,
  CommentsContainer,
} from "./styles";

interface CommentsProps {
  comments: IComment[];
}
const Comments: React.FC<CommentsProps> = ({ comments }) => {
  return (
    <CommentsContainer>
      {comments.map((comment) => (
        <CommentItem key={comment.id}>
          <CommentAuthor>{comment.author}</CommentAuthor>
          <CommentText>{comment.comment}</CommentText>
          <CommentDate>{comment.created_at}</CommentDate>
        </CommentItem>
      ))}
    </CommentsContainer>
  );
};

export default Comments;
