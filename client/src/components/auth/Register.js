import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/user/userContext";

const Register = () => {
  const userContext = useContext(UserContext);
  const { register } = userContext;
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      // setAlert("Please Enter All The Fields", "danger");
    } else if (password !== password2) {
      // setAlert("Passwords Do Not Match", "danger");
    } else {
      register({
        name,
        email,
        password,
      });
    }
  };

  return (
    <div className="row h-100">
      <form
        className="col-md-4 col-sm-12 my-auto"
        style={{ margin: "0 auto" }}
        onSubmit={onSubmit}
      >
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            className="form-control"
            type="name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            className="form-control"
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Confirm Password</label>
          <input
            className="form-control"
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
            required
          />
        </div>
        <input
          type="submit"
          value="Sign Up"
          className="btn btn-primary btn-block"
          style={{ margin: "10% auto" }}
        />
        <p className="text-center">
          <Link to="/login">Already A User? Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
