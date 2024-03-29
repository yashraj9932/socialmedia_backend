import React, { useContext, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import UserContext from "../../context/user/userContext";

const Navbar = ({ title, icon }) => {
  const userContext = useContext(UserContext);
  const { isAuthenticated, loadUser, logout } = userContext;
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const onLogout = () => {
    logout();
    // clearContacts();
  };

  const authLinks = (
    <>
      <li>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "Black",
            paddingBottom: "4%",
            borderBottom: "1px solid black",
          }}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/profile"
          style={{
            textDecoration: "none",
            color: "Black",
            paddingBottom: "4%",
            borderBottom: "1px solid black",
          }}
        >
          Profile
        </Link>
      </li>
      <li>
        <Link
          to="/search"
          style={{
            textDecoration: "none",
            color: "Black",
            paddingBottom: "4%",
            borderBottom: "1px solid black",
            display: "flex",
          }}
        >
          Search
          <i
            style={{ marginLeft: "10%", marginTop: "5%" }}
            className="fas fa-search"
          />
        </Link>
      </li>
      <li>
        <a
          onClick={onLogout}
          href="#!"
          style={{
            textDecoration: "none",
            color: "Black",
            paddingBottom: "4%",
            borderBottom: "1px solid black",
          }}
        >
          <i className="fas fa-sign-out-alt" />{" "}
        </a>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li>
        <Link
          to="/register"
          style={{
            textDecoration: "none",
            color: "Black",
            paddingBottom: "4%",
            borderBottom: "1px solid black",
          }}
        >
          Register
        </Link>
      </li>
      <li>
        <Link
          to="/login"
          style={{
            textDecoration: "none",
            color: "Black",
            paddingBottom: "4%",
            borderBottom: "1px solid black",
          }}
        >
          Login
        </Link>
      </li>
    </>
  );

  return (
    <div className="navbar">
      <h1 style={{ margin: "0 auto" }}>
        <Link to="/">
          <img
            src="../../../instagramicon.png"
            alt="Instagram"
            className="img-fluid"
            style={{ height: "50px", marginLeft: "60%" }}
          />
        </Link>
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
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
