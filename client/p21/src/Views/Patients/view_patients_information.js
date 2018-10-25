import React, { Component } from 'react';
import {
    Button,
    Tab,
    Tabs,
    Card,
    Text
} from '@blueprintjs/core';

class PatientInformationView extends Component {
    constructor(props) {
        super();
        this.state = {
            patientData: props.patientData
        }
        this.generatePatientDataView = this.generatePatientDataView.bind(this);
    }

    generatePatientDataView() {
        return this.unpackObjectToText(this.state.patientData);
    }

    //this method should be a helper
    unpackObjectToText(object) {
        return Object.keys(object).map((key) => {
            if(object[key] instanceof Object) {
                return this.unpackObjectToText(object[key]);
            } else {
                return <Text>{key}: {object[key]}</Text>
            }
        }
    )
    }

    render() {
        var s = this.state;
        var p = s.patientData;
        return(
            <Card>
                {this.generatePatientDataView()}
            </Card>
        );
    }
}

export default PatientInformationView;