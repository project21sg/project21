import React, { Component } from 'react';
import {
    Row,
    Col,
    List,
} from 'antd';
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
            patients: DUMMY_PATIENTS_DATA
        }

        this.generatePatientsListView = this.generatePatientsListView.bind(this);
    }

    generatePatientsListView() {
        return (
            <List
            itemLayout="horizontal"
            dataSource={this.state.patients}
            renderItem={p => (
                <List.Item>
                    <List.Item.Meta
                    title={p.name}
                    />
                </List.Item>
            )}
            />
        )
    }

    render() {
        var s = this.state;
        return(
            <div style={{margin: "5px 5px 5px 5px", padding: 20, height: "100vh", width:"100%", background: 'white'}}>
                <Row>
                    <Col span={3}>
                        { this.generatePatientsListView() }
                    </Col>
                    <Col>
                        Rest
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CheckPatientsView;