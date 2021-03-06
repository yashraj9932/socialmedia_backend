import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/user/userContext";
import PostContext from "../../context/posts/postContext";
import HomeDisp from "./HomeDisp";
import { Link } from "react-router-dom";

const Home = () => {
  const userContext = useContext(UserContext);
  const postContext = useContext(PostContext);

  const { user, loadUser } = userContext;
  const { getallposts, postfollowers } = postContext;

  const [caption, setCaption] = useState("");
  const [files, setFiles] = useState([]);

  const [show, setShow] = useState(false);

  const onCp = () => {
    if (show) {
      setShow(false);
    } else setShow(true);
  };

  const onChange = (e) => {
    setCaption(e.target.value);
  };

  const onChange2 = (e) => {
    // console.log(e.target.files);

    const fi = e.target.files;
    setFiles(fi);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("caption", caption);
    postContext.createPost(formData);
    setShow(false);
  };

  // window.location.reload();
  useEffect(() => {
    loadUser();
    if (user) {
      getallposts(user._id);
    }
    // eslint-disable-next-line
  }, [postfollowers, getallposts]);
  return (
    <div>
      <div>
        <Link to="/search">
          <p
            className="btn btn-dark"
            style={{
              textAlign: "right",
              borderRadius: "6px",
              marginRight: "2%",
            }}
          >
            Search {"  "} <i className="fas fa-search"></i>
          </p>
        </Link>
        <p
          className="btn btn-dark"
          style={{ textAlign: "right", borderRadius: "6px" }}
          onClick={onCp}
        >
          Create {"  "} <i className="fas fa-plus"></i>
        </p>
      </div>
      {show && (
        <form
          className="col-md-4 my-auto"
          style={{ margin: "0 auto" }}
          onSubmit={onSubmit}
        >
          <div className="form-group">
            <label htmlFor="caption">Caption</label>
            <input
              className="form-control"
              type="text"
              name="caption"
              value={caption}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="file">File</label>
            <input
              className="btn btn-link"
              type="file"
              name="file"
              onChange={onChange2}
              required
            />
          </div>
          <input
            type="submit"
            value="Post"
            className="btn btn-primary btn-block"
            style={{ margin: "10% auto" }}
          />
        </form>
      )}
      <div>
        {postfollowers.length > 0 &&
          postfollowers.map((follower) => {
            return (
              follower.posts.length > 0 &&
              follower.posts.map((post) => {
                return <HomeDisp post={post} follower={follower} />;
              })
            );
          })}
      </div>
    </div>
  );
};

export default Home;
