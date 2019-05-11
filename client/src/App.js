import React, { Component } from "react";
import { Menu, Layout, Icon } from "antd";
import { NavLink, Route, BrowserRouter } from "react-router-dom";

import logoPath from "./res/img/logo.png";
import "./App.css";

//import styles from './index.css'; //TODO: css modules not working for some reason

import { MainContainer } from "./Views/Main";
import CheckPatientsView from "./Views/Patients/view_patients_check";
import AddPatientsView from "./Views/Patients/view_patients_add";
import LoginPage from "./LoginPage";
//import UploadView from './Views/Upload/view_upload';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(truth) {
    this.setState({ isLogin: truth });
  }

  state = {
    isLogin: false
  };

  render() {
    if (this.state.isLogin) {
      return (
        <div>
          <div class="fade-in one">
            <BrowserRouter>
              <Layout style={{ height: "100%" }}>
                <Layout.Sider
                  className="header"
                  style={{ background: "white" }}
                >
                  <NavLink exact to="/">
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        margin: "auto",
                        alignContent: "center"
                      }}
                    >
                      <img
                        src={logoPath}
                        style={{ width: 100, height: 100, margin: 30 }}
                        alt="p21-logo"
                      />
                    </div>
                  </NavLink>
                  <Menu theme="light">
                    <Menu.Item key="checkPatients">
                      <NavLink exact to="/patients">
                        <Icon type="team" />
                        Check Patients
                      </NavLink>
                    </Menu.Item>
                    <Menu.Item key="addPatients">
                      <NavLink exact to="/patients/add">
                        <Icon type="user-add" />
                        Add New Patient
                      </NavLink>
                    </Menu.Item>
                  </Menu>
                </Layout.Sider>
                <Layout>
                  <Layout.Content className="content">
                    <Route exact path="/" component={MainContainer} />
                    <Route
                      exact
                      path="/patients"
                      component={CheckPatientsView}
                    />
                    <Route
                      exact
                      path="/patients/add"
                      component={AddPatientsView}
                    />
                  </Layout.Content>
                </Layout>
              </Layout>
            </BrowserRouter>
          </div>
        </div>
      );
    } else {
      return <LoginPage handleLogin={this.handleLogin} />;
    }
  }
}

export default App;
