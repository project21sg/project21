import React from "react";
import { message } from "antd";

import "./LoginPage.css";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogin = props.handleLogin;

    this.state = {
      username: "",
      password: "",
      submitted: false,
      loading: false,
      error: "",
      isloading: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  } // end of constructor

  componentWillMount() {
    localStorage.setItem("username", "admin@p21.com");
    localStorage.setItem("password", "adminadmin");
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password } = this.state;

    // stop here if form is invalid
    if (!(username && password)) {
      return;
    }
    var user = localStorage.getItem("username");
    var pw = localStorage.getItem("password");
    if (username === user && pw === password) {
      this.setState({ loading: true });
      this.handleLogin(true);
    } else {
      message.info(
        "You have entered an incorrect username and password. Please try again."
      );
    }
  }

  render() {
    const { username, password, submitted, loading, error } = this.state;

    return (
      <div id="bigBox">
        <div id="formContent">
          <div class="fadeIn first">
            <img
              src="https://avatars2.githubusercontent.com/u/43009716?s=200&v=4"
              id="icon"
              alt="User Icon"
            />
          </div>

          {/* form */}
          <form onSubmit={this.handleSubmit}>
            {/* username */}
            <div
              className={
                "form-group" + (submitted && !username ? " has-error" : "")
              }
            >
              {/* <label htmlFor="username">Username</label> */}
              <input
                type="text"
                className="fadeIn second"
                id="login"
                name="username"
                placeholder="username"
                value={username}
                onChange={this.handleChange}
              />
              {submitted && !username && (
                <div className="help-block">Username is required</div>
              )}
            </div>
            {/* username */}

            {/* password */}
            <div
              className={
                "form-group" + (submitted && !password ? " has-error" : "")
              }
            >
              {/* <label htmlFor="password">Password</label> */}
              <input
                type="password"
                className="fadeIn third"
                id="password"
                name="password"
                placeholder="password"
                value={password}
                onChange={this.handleChange}
              />
              {submitted && !password && (
                <div className="help-block">Password is required</div>
              )}
            </div>
            {/* password */}

            {/* login button */}
            <div className="form-group">
              <button className="fadeIn fourth btn" disabled={loading}>
                Login
              </button>
            </div>
            {/* login button */}
          </form>
          {/* form */}
        </div>
      </div>
    );
  }
}

export default LoginPage;
