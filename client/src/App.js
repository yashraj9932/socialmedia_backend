import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/layout/Home";
import Navbar from "./components/layout/Navbar";
import "./App.css";
import Profile from "./components/user/Profile";
import UserState from "./context/user/UserState";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./routing/PrivateRoute";
import PostState from "./context/posts/PostState";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <UserState>
      <PostState>
        <Router>
          <div className="container">
            <Navbar />
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </div>
        </Router>
      </PostState>
    </UserState>
  );
};

export default App;
