import React, { useContext, useEffect } from "react";
import UserContext from "../../context/user/userContext";
import PostContext from "../../context/posts/postContext";
import HomeDisp from "./HomeDisp";

const Home = () => {
  const userContext = useContext(UserContext);
  const postContext = useContext(PostContext);

  const { user, loadUser } = userContext;
  const { getallposts, postfollowers } = postContext;
  useEffect(() => {
    // loadUser();
    if (user) {
      getallposts(user._id);
    }
    // eslint-disable-next-line
  }, [loadUser]);
  console.log(postfollowers);
  return (
    <div>
      {postfollowers.length > 0 &&
        postfollowers.map((follower) => {
          return (
            follower.posts.length > 0 &&
            follower.posts.map((post) => {
              return <HomeDisp post={post} name={follower.name} />;
            })
          );
        })}
    </div>
  );
};

export default Home;
