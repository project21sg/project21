import React, { Component } from 'react';
import {
    Button, 
    Card,
    Label,
    Toaster,
    Position
} from '@blueprintjs/core';

import UploadView from '../Upload/view_upload';
import QuestionaireForm from '../../Components/Form/questionaire';

const DUMMY_QUESTIONAIRE = [
    {
        category: "Part 2: Fall Risk Status",
        fields: [
            {
                type: "radio",
                label: "Recent Falls: ",
                hint: "(To score this, complete history of falls, overleaf) ",
                options: [
                    "None in the last 12 months",
                    "One or more between 3 and 12 months ago",
                    "One or more in last 3 months",
                    "One or more in last 3 months whilst inpatient/resident"
                ],
            },
            {
                type: "radio",
                label: "Medications:  ",
                hint: "(Sedatives, Anti-Depressants, Anti-Parkinson's, Diuretics, Anti-Hypertensives, Hypnotics) ",
                options: [
                    "Not taking any of these",
                    "Taking one",
                    "Taking two",
                    "Taking more than two"
                ],
            },
            {
                type: "radio",
                label: "Psychological:  ",
                hint: "(Anxiety,Depression, Impaired Judgement) ",
                options: [
                    "Does not appear to have any of these",
                    "Mildly affected by one or more",
                    "Moderately affected by one or more",
                    "Appears severely affected by one or more)"
                ],
            },
            {
                type: "radio",
                label: "Cognitive Status:  ",
                hint: "(Hadkinson Abbreviated Mental Test Score) ",
                options: [
                    "AMTS 9 or 10 and intact",
                    "AMTS 7-8 mildly impaired",
                    "AMTS 5-6 moderately impaired",
                    "AMTS 4 or less severely impaired"
                ],
            },
            {
                type: "radio",
                label: "Automatic high risk factors:  ",
                hint: "(Hadkinson Abbreviated Mental Test Score) ",
                options: [
                    "Recent change in functional status",
                    "Medications affecting safe mobility(or anticipated)",
                    "Dizziness",
                    "Postural hypotension"
                ],
            },
        ]
    },
    {
        category: "Part 3: Risk Factor Checklist",
        fields: [
            {
                type: "switch",
                label: "Reports/observed difficulty seeing objects/signs/finding way around: "
            },
            {
                type: "switch",
                label: "Mobility status unknown or appears unsafe/impulsive/forgets gait aid: "
            },
            {
                type: "switch",
                label: "Transfer status unknown or appears unsafe i.e over-reaches, impulsive: "
            },
            {
                type: "switch",
                label: "Observed risk-taking behaviours, or reported from referrer/previous facility: "
            },
            {
                type: "switch",
                label: "Observed unsafe use of equipment: "
            },
            {
                type: "switch",
                label: "Difficulties with orientation to environment i.e areas between bed/bathroom/dining room: "
            },
            {
                type: "switch",
                label: "Underweight/low appetite: "
            },
            {
                type: "switch",
                label: "Reported or known urgency/nocturia/accidents: "
            },
            {
                type: "text-area",
                label: "Other factors: "
            },
        ]
    },
    {
        category: "Fall History Details",
        fields: [
            {
                type: "switch",
                label: "Falls prior to this admission and/or during current stay"
            },
            {
                type: "text",
                label: "Information Obtained from: "
            },
            {
                type: "text",
                label: "Time Ago: "
            },
            {
                type: "radio",
                label: "Type of fall: ",
                options: [
                    "Trip",
                    "Slip",
                    "Lost Balance",
                    "Collapse",
                    "Legs gave way",
                    "Dizziness"
                ]
            }
        ]
    },
    {
        category: "Part 4: Action Plan",
        fields: [
            {
                type: "text-area",
                label: "Problem List:"
            },
            {
                type: "text-area",
                label: "Intervention Strategies:"
            }
        ]
    }
];

class PatientTestView extends Component {
    constructor(props) {
        super();
        this.state = {
            showQuestionaire: false
        }
        this.submitForm = this.submitForm.bind(this);
    }

    showSuccess() {
        var toaster = Toaster.create({position: Position.TOP,});
        toaster.show({message: "Gait data successfully uploaded!", intent: "success"})
    }

    submitForm() {
        this.showSuccess();
        this.props.navigateToReports();
        {this.setState({showQuestionaire: false})}
        //this.props.addPatientHAX();
    }

    render() {
        var s = this.state;
        if(!this.state.showQuestionaire) {
            return(
                <Card>
                    <Label><h4>Proceed by first uploading the recorded patient gait data, </h4></Label>
                    <UploadView uploadDataHAX={this.props.uploadDataHAX}/>
                    <div style={{marginTop: 20, justifyContent: "right"}}>
                        <Button text="Next" intent="success" onClick={() => {this.setState({showQuestionaire: true})}}/>
                    </div>
                </Card>
            );
        } else {
            return(
                <QuestionaireForm 
                questionaire={DUMMY_QUESTIONAIRE} 
                submitForm={this.submitForm}
                history={this.props.history}/>
            )
        }
    }
}

export default PatientTestView;