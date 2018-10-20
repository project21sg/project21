import React, { Component } from 'react';
import {
    Navbar, 
    Button,
    Alignment
} from '@blueprintjs/core';
import { NavLink, Route, BrowserRouter } from 'react-router-dom';

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
                        <Route exact path="/check"></Route>
                        <Route exact path="/remove"></Route>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
