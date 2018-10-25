import React, { Component } from 'react';
import {
    Button,
    Tab,
    Tabs,
    Card
} from '@blueprintjs/core';

import MainPatientPanel from '../../Components/Panels/main_panel';

var DUMMY_PATIENTS_DATA = [
    {
        name: 'Regina Tan',
        age: 20
    },
]

class CheckPatientsView extends Component {
    constructor(props) {
        super();
        this.state = {
            selectedTabId: "ng",
            patients: DUMMY_PATIENTS_DATA
        }

        this.handleTabChange = this.handleTabChange.bind(this);
        this.generatePatientsListView = this.generatePatientsListView.bind(this);
    }

    handleTabChange(e) {
        this.setState((prevState) => {
            return {
                selectedTabId: e.selectedTabId
            };
        })
    }

    generatePatientsListView() {
        return this.state.patients.map((p) => <Tab id="ng" title={p.name} panel={<MainPatientPanel data={p}/>}/>)
    }

    render() {
        var s = this.state;
        return(
            <div>
                <Tabs vertical id="TabsExample" onChange={this.handleTabChange} selectedTabId={s.selectedTabId} style={{width: '10%'}}>
                    {this.generatePatientsListView()}
                    <Tabs.Expander />
                    <input className="bp3-input" type="text" placeholder="Search..." />
                </Tabs>
            </div>
        );
    }
}

export default CheckPatientsView;