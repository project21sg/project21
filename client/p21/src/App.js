import React, { Component } from 'react';
import {
    Navbar, 
    Button,
    Alignment
} from '@blueprintjs/core';
import { NavLink, Route, BrowserRouter } from 'react-router-dom';

import PatientsView from './Views/Patients/view_patients';
import UploadView from './Views/Upload/view_upload';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Navbar>
                        <Navbar.Group align={Alignment.LEFT}>
                            <Navbar.Heading>P21</Navbar.Heading>
                            <Navbar.Divider />
                                <NavLink exact to="/check">
                                    <Button minimal icon="add">
                                        Check 
                                    </Button>
                                </NavLink>
                                <NavLink exact to="/upload">
                                    <Button minimal icon="minus">
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
