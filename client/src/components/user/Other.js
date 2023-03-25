import React, { useContext, useEffect } from "react";
import UserContext from "../../context/user/userContext";
import UserPosts from "./UserPosts";

const Other = ({ match }) => {
  const userContext = useContext(UserContext);
  const { urluser, otheruser, followUser, user } = userContext;

  useEffect(() => {
    // userContext.loadUser();
    urluser(match.params.id);
    // eslint-disable-next-line
  }, []);

  if (!otheruser) return <div />;
  const { followers, following, posts, bio, name } = otheruser;

  const onClick = (e) => {
    followUser(match.params.id);
  };

  return (
    otheruser && (
      <div>
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
            <button className="btn btn-primary" onClick={onClick}>
              {otheruser.followers.indexOf(user._id) === -1
                ? "Follow"
                : "Unfollow"}
            </button>
          </div>
        </div>
        <div style={{ marginTop: "20%" }} className="row">
          {otheruser &&
            otheruser.posts.map((post, i) => {
              return <UserPosts source={`/uploads/${post.picture}`} key={i} />;
            })}
        </div>
      </div>
    )
  );
};

export default Other;
