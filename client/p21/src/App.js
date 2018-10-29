import React, { Component } from 'react';
import {
    Navbar, 
    Button,
    Alignment
} from '@blueprintjs/core';
import { NavLink, Route, BrowserRouter } from 'react-router-dom';

import logo from './res/img/logo.png';

import CheckPatientsView from './Views/Patients/view_patients_check';
import AddPatientsView from './Views/Patients/view_patients_add';
import UploadView from './Views/Upload/view_upload';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Navbar>
                        <Navbar.Group align={Alignment.LEFT}>
                            <Navbar.Heading>
                                <img src={logo} style={{width: 32, height: 32}}/>
                            </Navbar.Heading>
                            <Navbar.Divider />
                                <NavLink exact to="/patients">
                                    <Button minimal icon="people">
                                        Check 
                                    </Button>
                                </NavLink>
                                <NavLink exact to="/patients/add">
                                    <Button minimal icon="plus">
                                        Add
                                    </Button>
                                </NavLink>
                        </Navbar.Group>
                    </Navbar>
                    <div className="root-container" style={{backgroundColor: "#202B33"}}>
                        <Route exact path="/patients" component = {CheckPatientsView} />
                        <Route exact path="/patients/add" component = {AddPatientsView} />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
