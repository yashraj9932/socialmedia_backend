import React, { useEffect, useContext } from "react";
import UserContext from "../../context/user/userContext";
import MainDetail from "./MainDetail";
import UserPosts from "./UserPosts";
import { url } from "../../config";


const Profile = () => {
  const userContext = useContext(UserContext);

  const { loadUser, user } = userContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <MainDetail user={user} />
      <div style={{ marginTop: "20%" }} className="row">
        {user &&
          user.posts.map((post) => {
            return <UserPosts source={`${url}/uploads/${post.picture}`} />;
          })}
      </div>
    </div>
  );
};

export default Profile;
