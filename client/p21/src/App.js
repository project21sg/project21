import React, { Component } from 'react';
import { 
  AppBar, 
  Toolbar,
  SvgIcon,
  IconButton,
  Typography 
} from '@material-ui/core';
import {
  Menu
} from '@material-ui/icons';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar 
          position="static"
          color="primary">
          <Toolbar>
            <IconButton 
              color="inherit"
              aria-label="Open drawer">
              <SvgIcon>
                <Menu />
              </SvgIcon>
            </IconButton>
            <Typography 
              color="inherit">
              Project 21
            </Typography>
          </Toolbar>

        </AppBar>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
