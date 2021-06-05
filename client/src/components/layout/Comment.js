import React, { useContext } from "react";
import PostContext from "../../context/posts/postContext";

const Comment = ({ comment, post }) => {
  const postContext = useContext(PostContext);

  const { deleteComment } = postContext;

  const onDelete = (e) => {
    deleteComment(post, comment._id);
  };
  return (
    <div>
      <span>{comment.text}</span>
      <span onClick={onDelete} style={{ paddingLeft: "5%" }}>
        <i className="fas fa-trash-alt"></i>
      </span>
    </div>
  );
};

export default Comment;
