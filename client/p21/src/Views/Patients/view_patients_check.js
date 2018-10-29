import React, { Component } from 'react';
import {
    Button,
    Tab,
    Tabs,
    Card
} from '@blueprintjs/core';

import PatientsSummaryView from './view_patients_summary';

var DUMMY_PATIENTS_DATA = [
    {
        id: 0,
        name: 'Regina Tan',
        age: 20,
        dob: "20 May 1998",
        gender: 'F',
        address: "Blk 14 Beach Road #01-4661, 199597 Bugis, Singapore",
        contactInfo: {
            mobile: "94321432"
        },
        zip: "199597",
        occupation: "Entrepreneur",
        maritalStatus: "Widowed",
        nokInfo: {
            name: "Amos Yee",
            relationToPatient: "Mistress",
            address: "Blk 14 Beach Road #01-4661, 199597 Bugis, Singapore",
            contactInfo: {
                mobile: "81234123"
            }
        },
        healthProblems: ["Heart disease", "Anxiety", "Osteoporosis", "Arthritis", "High Blood Pressure"]
    },,
    {
        id: 1,
        name: 'Tan Hwa Peow',
        age: 73,
        dob: "1 Jan 1945",
        gender: 'M',
        address: "38B Pagoda Street",
        contactInfo: {
            mobile: "94233452"
        },
        zip: "540192",
        occupation: "Ex-policeman",
        maritalStatus: "Widowed",
        nokInfo: {
            name: "Samantha Tan",
            relationToPatient: "Daughter",
            address: "38B Pagoda Street",
            contactInfo: {
                mobile: "81234342"
            }
        },
        healthProblems: ["Heart disease", "Arthritis"]
    },
    {
        id: 2,
        name: 'Kwek Geok Hwa',
        age: 68,
        dob: "5 March 1950",
        gender: 'F',
        address: "Blk 3007 Ubi Rd 1 05-412",
        contactInfo: {
            mobile: "94231940"
        },
        zip: "406701",
        occupation: "Ex-Seamstress",
        maritalStatus: "Widowed",
        nokInfo: {
            name: "Elyssa Kwek",
            relationToPatient: "Daughter",
            address: "Blk 3007 Ubi Rd 1 05-412",
            contactInfo: {
                mobile: "81234123"
            }
        },
        healthProblems: ["Heart disease", "Anxiety", "Osteoporosis", "Arthritis", "High Blood Pressure"]
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
        return this.state.patients && this.state.patients.map((p) => 
            <Tab id={p.id} key ={p.name} title={p.name} panel={<PatientsSummaryView patientData={p} history={this.props.history}/>}/>)
    }

    render() {
        var s = this.state;
        return(
            <Card style={{width: '100%', height: '5000'}}>
                <Tabs vertical id="TabsExample" onChange={this.handleTabChange} selectedTabId={s.selectedTabId} style={{height: "100em"}}>
                    {this.generatePatientsListView()}
                    <Tabs.Expander />
                    <input className="bp3-input" type="text" placeholder="Search..." />
                </Tabs>
            </Card>
        );
    }
}

export default CheckPatientsView;