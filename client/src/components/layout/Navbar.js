import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import UserContext from "../../context/user/userContext";

const Navbar = ({ title, icon }) => {
  const userContext = useContext(UserContext);
  return (
    <div className="navbar">
      <h1>
        <Link to="/">
          <img
            src="../../../instagramicon.png"
            alt="Instagram"
            className="img-fluid"
            style={{ height: "80px" }}
          />
        </Link>
      </h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>Logout</li>
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: "Instagram",
  icon: "fas fa-id-card-alt",
};

export default Navbar;
