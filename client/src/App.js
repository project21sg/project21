import React, { Component } from 'react';
import {
    Menu,
    Layout,
    Icon
} from 'antd';
import { NavLink, Route, BrowserRouter } from 'react-router-dom';

import logoPath from './res/img/logo.png';
import styles from './index.css'; //TODO: css modules not working for some reason

import CheckPatientsView from './Views/Patients/view_patients_check';
import AddPatientsView from './Views/Patients/view_patients_add';
import UploadView from './Views/Upload/view_upload';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Layout style={{height: "100vh"}}>
                    <Layout.Sider className="header" style={{background: "white"}}>
                        <NavLink exact to="/">
                            <div style={{width: 100, height: 100, margin: "auto"}}>
                                <img src={logoPath} style={{width: 75, height: 75, margin: 10}}/>
                            </div>
                        </NavLink>
                        <Menu
                            theme="light"      
                        >
                            <Menu.Item key="checkPatients">
                                <NavLink exact to="/patients">
                                    <Icon type="team" />Check Patients
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key="addPatients">
                                <NavLink exact to="/patients/add">
                                    <Icon type="user-add"/>Add New Patient
                                </NavLink>
                            </Menu.Item>
                        </Menu>
                    </Layout.Sider>
                    <Layout>
                        <Layout.Content className="content">
                            <Route exact path="/patients" component = {CheckPatientsView} />
                            <Route exact path="/patients/add" component = {AddPatientsView} />
                        </Layout.Content>
                    </Layout>
                </Layout>
            </BrowserRouter>
        );
    }
}

export default App;
