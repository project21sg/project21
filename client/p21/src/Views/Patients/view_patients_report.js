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
            <Card style={{height: '10000'}}>
                {this.generatePatientReportsListView()}
                {s.report && s.report[2].Sheets[s.report[2].SheetNames[0]].A1.v}
            </Card>
        );
    }
}

export default PatientReportsView;