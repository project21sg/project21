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
      <div className="col-md-6 col-md-offset-3">
        <form name="form" onSubmit={this.handleSubmit}>
          <div
            className={
              "form-group" + (submitted && !username ? " has-error" : "")
            }
          >
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={this.handleChange}
            />
            {submitted && !username && (
              <div className="help-block">Username is required</div>
            )}
          </div>
          <div
            className={
              "form-group" + (submitted && !password ? " has-error" : "")
            }
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
            {submitted && !password && (
              <div className="help-block">Password is required</div>
            )}
          </div>
          <div className="form-group">
            <button className="LoginButton" disabled={loading}>
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginPage;
