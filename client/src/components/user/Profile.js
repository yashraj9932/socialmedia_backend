import React from "react";
import MainDetail from "./MainDetail";
import UserPosts from "./UserPosts";

const Profile = () => {
  const source = "../../picture.jpeg";
  return (
    <div>
      <MainDetail />
      <div style={{ marginTop: "5%" }} className="row">
        <UserPosts source={source} />
      </div>
    </div>
  );
};

export default Profile;
