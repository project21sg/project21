import React, { Component } from 'react';
import {
    Button,
    Tab,
    Tabs,
    Card,
    Text
} from '@blueprintjs/core';

class PatientReportsView extends Component {
    constructor(props) {
        super();
        this.state = {
            report: props.report
        }
        this.generatePatientReportsListView = this.generatePatientReportsListView.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({
            report: props.report
        })
    }

    generatePatientReportsListView() {
        return this.state.report && <Text>{this.state.report[0]}</Text>;
    }

    render() {
        var s = this.state;
        var p = s.patientData;
        return(
            <Card>
                {this.generatePatientReportsListView()}
            </Card>
        );
    }
}

export default PatientReportsView;