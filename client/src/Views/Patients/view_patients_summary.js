import React, { Component } from 'react';
import {
    Tabs
} from 'antd';
import PatientInformationView from './view_patients_information';

class PatientsSummaryView extends Component {
    constructor(props) {
        super();
        this.state = {
            patientData: props.patientData
        }

        this.handleTabChange = this.handleTabChange.bind(this);
    }

    componentDidUpdate(prevProps) {
        if(prevProps.patientData != this.props.patientData) {
            this.setState({
                patientData : this.props.patientData
            })
        }
    }

    handleTabChange(key) {
        this.setState({
            selectedTabId: key
        })
    }

    render() {
        var s = this.state;
        return(
            <div>
                 <Tabs defaultActiveKey="1" onChange={this.handleTabChange}>
                    <Tabs.TabPane tab="Patient Information" key="1">
                        <PatientInformationView patientData={s.patientData} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Past Reports/Logs" key="2">
                        <PatientInformationView patientData={s.patientData} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Conduct Test" key="3">
                        <PatientInformationView patientData={s.patientData} />
                    </Tabs.TabPane>
                </Tabs>
            </div>
        );
    }
}

export default PatientsSummaryView;