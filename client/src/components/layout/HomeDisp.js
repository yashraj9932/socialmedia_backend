import React, { useContext, useState } from "react";
import PostContext from "../../context/posts/postContext";
import Comment from "./Comment";

import { Link } from "react-router-dom";

const HomeDisp = ({ post, follower }) => {
  const postContext = useContext(PostContext);

  const [cs, setCs] = useState(false);
  const [text, setText] = useState("");
  const onComment = (e) => {
    setCs(true);
  };

  const { name } = follower;

  const { likes, caption, picture, comments, _id } = post;
  const onLike = (e) => {
    postContext.addLike(_id);
  };

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    postContext.addComment(text, _id);

    setText("");
    setCs(false);
  };

  return (
    <div
      className="row"
      style={{ borderBottom: "1px solid black", paddingTop: "4%" }}
    >
      <div className=" text-center" style={{ margin: "0 auto " }}>
        <p>
          <Link to={`/profile/${follower._id}`}>
            <strong>{name}</strong>
          </Link>
        </p>
        <img
          src={`/uploads/${picture}`}
          alt="picc"
          style={{
            maxWidth: "100%",
            maxHeight: "320px",
          }}
        />
        <div style={{ margin: "5% auto" }}>
          <p>
            <strong>{caption}</strong>
          </p>
          <span>{likes.length}</span>
          {"  "}
          <span id="heart" onClick={onLike}>
            <i className="fas fa-heart" aria-hidden="true"></i>{" "}
          </span>
          {comments.length === 0 ? (
            <p>No Comments</p>
          ) : (
            comments.map((comment) => {
              return <Comment comment={comment} post={_id} />;
            })
          )}
          {cs && (
            <form onSubmit={onSubmit}>
              <input
                style={{ border: "none", borderBottom: "1px solid black" }}
                type="text"
                value={text}
                name="comment"
                onChange={onChange}
              />
              <input
                className="btn btn-link"
                type="submit"
                value="Post Comment"
              />
            </form>
          )}
          <button
            style={{ color: "black" }}
            type="button"
            className="btn btn-link"
            onClick={onComment}
          >
            Add Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeDisp;
