import React from "react";

const MainDetail = ({ user }) => {
  if (user === null) return;
  const { followers, following, posts, bio, name } = user;
  return (
    <div className="row">
      <div className="col-md-6 ">
        <div className="text-center">
          <img
            src="../../../picture.jpeg"
            alt="profilepic"
            className="rounded-circle"
          />
        </div>
      </div>
      <div className="col-md-6 text-center" style={{ marginTop: "5%" }}>
        <div className="row ">
          <div className="col-sm-4">
            <strong>{posts.length}</strong>
            <p>Posts</p>
          </div>
          <div className="col-sm-4">
            <strong>{following.length}</strong>
            <p>Following</p>
          </div>
          <div className="col-sm-4">
            <strong>{followers.length}</strong>
            <p>Followers</p>
          </div>
        </div>
        <div>
          <h4 style={{ marginTop: "5%" }}>{name}</h4>
          <p>{bio}</p>
        </div>
      </div>
    </div>
  );
};

export default MainDetail;
