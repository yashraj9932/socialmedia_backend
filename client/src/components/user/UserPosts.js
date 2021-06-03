import React from "react";

const UserPosts = ({ source }) => {
  return (
    <div className="col-md-4 text-center" style={{ marginTop: "2%" }}>
      <div>
        <img src={source} alt="image" />
      </div>
    </div>
  );
};

export default UserPosts;
