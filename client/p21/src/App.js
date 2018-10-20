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
                            <Button minimal icon="add">
                                <NavLink exact to="/check">Check</NavLink>
                            </Button>
                            <Button minimal icon="minus">
                                <NavLink exact to="/upload">Upload</NavLink>
                            </Button>
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
