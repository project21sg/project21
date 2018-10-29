import React, { Component } from 'react';
import {
    Alignment,
    Button,
    Card,
    FormGroup,
    InputGroup,
    RadioGroup,
    Radio,
    Switch,
    TextArea,
    Toaster,
    Position
} from '@blueprintjs/core';
import {withRouter} from 'react-router';

import MainPatientPanel from '../../Components/Panels/main_panel';
import QuestionaireForm from '../../Components/Form/questionaire';

const DUMMY_QUESTIONAIRE = [
    {
        category: "Part 1: Patient Particulars",
        fields: [
            {
                type: "text",
                label : "Patient Name: ",
            },
            {
                type: "text",
                label : "NRIC: ",
            },
            {
                type: "text",
                label: "Gender: "
            },
            {
                type: "text",
                label: "Date of Birth",
            }
        ],
    },
];

class AddPatientsView extends Component {
    constructor(props) {
        super();
        this.state = {
            selectedTabId: "ng",
            questionaire: props.questionaire,
            success : false
        }

        this.handleTabChange = this.handleTabChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm() {
        this.showSuccess();
        this.props.history.push("/patients")
        //this.props.addPatientHAX();
    }

    handleTabChange(e) {
        this.setState((prevState) => {
            return {
                selectedTabId: e.selectedTabId
            };
        })
    }

    showSuccess() {
        var toaster = Toaster.create({position: Position.TOP,});
        toaster.show({message: "Patient successfully added!", intent: "success"})
    }

    render() {
        var s = this.state;
        return(
            <div style={{align: 'center', justifyContent: "center"}}>
                <QuestionaireForm 
                questionaire={DUMMY_QUESTIONAIRE} 
                submitForm={this.submitForm}
                history={this.props.history}/>
            </div>
        );
    }
}

export default AddPatientsView;