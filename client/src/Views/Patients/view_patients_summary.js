import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import PatientInformationView from './view_patients_information';

class PatientsSummaryView extends Component {
    constructor(props) {
        super();
        this.state = {
            patientData: props.patientData
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
                {/* <Tabs id="patientFunctionTabs" onChange={this.handleTabChange} selectedTabId={s.selectedTabId} style={{width: '100%'}}>
                    <Tab id="pi" title="Patient Information" panel={<PatientInformationView patientData={s.patientData} />}/>
                    <Tab id="pr" title="Past Reports/Logs" panel={<PatientInformationView patientData={s.patientData} />}/>
                    <Tab id="ct" title="Conduct Test"  panel={<PatientInformationView patientData={s.patientData} />}/>
                </Tabs> */}
            </div>
        );
    }
}

export default PatientsSummaryView;