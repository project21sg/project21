import React from "react";
import { message, Spin, Form, Icon } from "antd";

import "./LoginPage.css";
import logoPath from "./res/img/logo.png";

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
    if ((username === user && pw === password) || true) {
      this.setState({ loading: true });

      setTimeout(() => this.handleLogin(true), 1000); // purposely delay login
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
            <img src={logoPath} id="icon" alt="User Icon" />
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
                placeholder="Username"
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
                placeholder="Password"
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
                {loading ? (
                  <Spin
                    delay={3}
                    spinning={true}
                    indicator={
                      <Icon
                        type="loading"
                        spin
                        style={{ fonSize: 20, color: "white" }}
                      />
                    }
                  />
                ) : (
                  "LOGIN"
                )}
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
