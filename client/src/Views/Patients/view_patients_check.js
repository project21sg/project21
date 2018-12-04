import React, { Component } from 'react';


import PatientsSummaryView from './view_patients_summary';

var DUMMY_PATIENTS_DATA = [
    {
        id: 0,
        name: 'Regina Tan',
        age: 20,
        dob: Date(),
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
        healthProblems: ["Heart disease", "Anxiety", "Disappointment"]
    },
    {
        id: 1,
        name: 'Tan Hwa Peow',
        age: 73,
        dob: Date(),
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
        dob: Date(),
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
        return this.state.patients && this.state.patients.map((p) => {}
            // <Tab id={p.id} key ={p.name} title={p.name} panel={<PatientsSummaryView patientData={p}/>}/>
        )
    }

    render() {
        var s = this.state;
        return(
            <div>
                12
                {/* <Tabs vertical id="TabsExample" onChange={this.handleTabChange} selectedTabId={s.selectedTabId} style={{width: '10%'}}>
                    {this.generatePatientsListView()}
                    <Tabs.Expander />
                    <input className="bp3-input" type="text" placeholder="Search..." />
                </Tabs> */}
            </div>
        );
    }
}

export default CheckPatientsView;