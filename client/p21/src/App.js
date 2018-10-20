import React, { Component } from 'react';
import {
    Navbar, 
    Button,
    Alignment
} from '@blueprintjs/core';
import { NavLink, Route, BrowserRouter } from 'react-router-dom';

import logo from './res/img/logo.png';

import PatientsView from './Views/Patients/view_patients';
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
                                <NavLink exact to="/check">
                                    <Button minimal icon="people">
                                        Check 
                                    </Button>
                                </NavLink>
                                <NavLink exact to="/upload">
                                    <Button minimal icon="import">
                                        Upload
                                    </Button>
                                </NavLink>
                        </Navbar.Group>
                    </Navbar>
                    <div className="root-container">
                        <Route exact path="/check" component = {PatientsView} />
                        <Route exact path="/upload" component = {UploadView} />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
