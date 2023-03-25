import React, { useEffect, useContext } from "react";
import UserContext from "../../context/user/userContext";
import MainDetail from "./MainDetail";
import UserPosts from "./UserPosts";

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
        {user?.posts?.map((post, i) => {
          return <UserPosts source={`/uploads/${post.picture}`} key={i} />;
        })}
      </div>
    </div>
  );
};

export default Profile;
