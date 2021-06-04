import React from "react";

const MainDetail = ({ user }) => {
  if (user === null) return <h1></h1>;
  const { followers, following, posts, bio } = user;
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
          <div className="col-md-4">
            <strong>{posts.length}</strong>
            <p>Posts</p>
          </div>
          <div className="col-md-4">
            <strong>{following.length}</strong>
            <p>Following</p>
          </div>
          <div className="col-md-4">
            <strong>{followers.length}</strong>
            <p>Followers</p>
          </div>
        </div>
        <p style={{ marginTop: "5%" }}>{bio}</p>
      </div>
    </div>
  );
};

export default MainDetail;
