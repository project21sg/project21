import React, { Component } from 'react';
import {
    Button,
    Tab,
    Tabs,
    Card
} from '@blueprintjs/core';

import MainPatientPanel from '../../Components/Panels/main_panel';

class AddPatientsView extends Component {
    constructor(props) {
        super();
        this.state = {
            selectedTabId: "ng"
        }

        this.handleTabChange = this.handleTabChange.bind(this);
    }

    handleTabChange(e) {
        this.setState((prevState) => {
            return {
                selectedTabId: e.selectedTabId
            };
        })
    }

    render() {
        var s = this.state;
        return(
            <div>
                <Tabs vertical id="TabsExample" onChange={this.handleTabChange} selectedTabId={s.selectedTabId} style={{width: '10%'}}>
                    <Tab id="ng" title="Angular" panel={<MainPatientPanel />}/>
                    <Tab id="mb" title="Ember" />
                    <Tab id="rx" title="React"  />
                    <Tab id="bb" title="Backbone" />
                    <Tabs.Expander />
                    <input className="bp3-input" type="text" placeholder="Search..." />
                </Tabs>
            </div>
        );
    }
}

export default AddPatientsView;