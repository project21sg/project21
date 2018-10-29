import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {
    Button,
    Tab,
    Tabs,
    Card
} from '@blueprintjs/core';

import PatientInformationView from './view_patients_information';
import PatientReportsView from './view_patients_report';
import PatientTestView from './view_patients_test';

class PatientsSummaryView extends Component {
    constructor(props) {
        super();
        this.state = {
            patientData: props.patientData
        }

        this.handleTabChange = this.handleTabChange.bind(this);
        this.uploadDataHAX = this.uploadDataHAX.bind(this);
    }

    handleTabChange(e) {
        this.setState((prevState) => {
            return {
                selectedTabId: e.selectedTabId
            };
        })
    }

    uploadDataHAX(report) {
        this.setState({
            report: [report.uploadedFileName, report.uploadedFiles]
        })
    }

    render() {
        var s = this.state;
        return(
            <div style={{width: '100%'}}>
                <Tabs id="patientFunctionTabs" onChange={this.handleTabChange} selectedTabId={s.selectedTabId} style={{width: '100%'}}>
                    <Tab id="pi" title="Patient Information" panel={<PatientInformationView patientData={s.patientData} />}/>
                    <Tab id="pr" title="Past Reports/Logs" panel={<PatientReportsView patientData={s.patientData} report={s.report}/>}/>
                    <Tab id="ct" title="Conduct Test"  panel={<PatientTestView 
                    uploadDataHAX={this.uploadDataHAX} 
                    patientData={s.patientData} 
                    navigateToReports={() => this.setState({selectedTabId: "pr"})}
                    history={this.props.history}/>}/>
                </Tabs>
            </div>
        );
    }
}

export default PatientsSummaryView;