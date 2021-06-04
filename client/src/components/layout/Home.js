import React, { useContext, useEffect } from "react";
import UserContext from "../../context/user/userContext";

const Home = () => {
  const userContext = useContext(UserContext);

  useEffect(() => {
    userContext.loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
};

export default Home;
