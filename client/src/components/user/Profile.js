import React, { useEffect, useContext } from "react";
import UserContext from "../../context/user/userContext";
import MainDetail from "./MainDetail";
import UserPosts from "./UserPosts";

const Profile = () => {
  const userContext = useContext(UserContext);

  const { loadUser, user } = userContext;

  // useEffect(() => {
  //   userContext.loadUser();
  //   // eslint-disable-next-line
  // }, []);
  let source;
  if (user) {
    console.log(user.posts);
    source = `../../../${user.posts[0].picture}`;
  }
  return (
    <div>
      <MainDetail user={user} />
      <div style={{ marginTop: "5%" }} className="row">
        {user &&
          user.posts.map((contact) => {
            return <UserPosts source={`../../picture.jpeg`} />;
          })}
        <UserPosts source={source} />
      </div>
    </div>
  );
};

export default Profile;
