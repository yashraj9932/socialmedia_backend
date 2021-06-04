import React, { useContext, useEffect } from "react";
import UserContext from "../../context/user/userContext";

const Home = () => {
  const userContext = useContext(UserContext);

  const onClick = (e) => {};
  // useEffect(() => {
  //   userContext.loadUser();
  //   // eslint-disable-next-line
  // }, []);
  return (
    <div className="row">
      <div className=" text-center" style={{ margin: "0 auto " }}>
        <p>Yash Raj Goel</p>
        <img src="../../picture.jpeg" alt="picc" />
        <div style={{ margin: "5% auto" }}>
          <span id="heart" onClick={onClick}>
            <i class="fas fa-heart" aria-hidden="true"></i>{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
