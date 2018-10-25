import React, { Component } from 'react';
import {
    Button,
    Tab,
    Tabs,
    Card
} from '@blueprintjs/core';

class PatientInformationView extends Component {
    constructor(props) {
        super();
        this.state = {
            patientData: props.patientData
        }
    }

    render() {
        var s = this.state;
        return(
            <div>
                
            </div>
        );
    }
}

export default PatientInformationView;