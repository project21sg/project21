import React, { Component } from 'react';
import {
    Navbar, 
    Button,
    Alignment
} from '@blueprintjs/core';
import { NavLink, Route, BrowserRouter } from 'react-router-dom';

import PatientsView from './Views/Patients/view_patients';

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
                                <NavLink exact to="/remove">Remove</NavLink>
                            </Button>
                        </Navbar.Group>
                    </Navbar>
                    <div className="root-container">
                        <Route exact path="/check" component = {PatientsView} />
                        <Route exact path="/remove" component = {() => <div>nah</div>} />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
