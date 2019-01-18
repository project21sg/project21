import React, { Component } from 'react';
import moment from 'moment';

import DataForm from '../../Components/Forms/data_form';

// TODO: refactor into to-be-imported .json file
var DATA_FIELDS = {
    header: "Dataset",
    size: "normal",
    fields: [
        {
            label: "Dataset Name",
            inputType: "text", //text, number, dropdown, radio, datepicker, ...
            validationConfig:  {
                rules: [
                    {required: true, message: "Please name the dataset!"},
                    {pattern: /^[a-z ,.'-]+$/i, message: "Please check for spelling or formatting errors!"}
                ],
            }
        },
        {
            label: "Gait Data File",
            inputType: "file", //text, number, dropdown, radio, datepicker, ...
            validationConfig:  {
                rules: [
                    {required: true, message: "Please upload the gait data file!"},
                ],
            }
        },
        {
            label: "Timed Up and Go Duration",
            inputType: "number", //text, number, dropdown, radio, datepicker, ...
            validationConfig:  {
                rules: [
                    {required: true, message: "Please input the Timed Up and Go test duration!"},
                    {pattern: /^(\d*\.)?\d+$/, message: "Please input a valid duration in seconds!"}
                ],
            }
        },
    ],
}

var FALL_RISK_FIELDS = {
    header: "Fall Risk Assessment Data",
    size: "normal",
    fields: [
        {
            label: "Recent Falls",
            inputType: "dropdown",
            options: [
                'None in the last 12 months', 
                '1 or more between 3 and 12 months ago',
                '1 or more in last 3 months',
                '1 or more in last 3 months whilst inpatient/resident'
            ],
            help: "Use patient's full history of falls to score this.",
            validationConfig:  {
                rules: [
                    {required: true, message: "Please indicate patient's recent fall status!"},
                ],
            }
        },
        {
            label: "Medications",
            inputType: "dropdown",
            options: [
                'Not taking any of these', 
                'Taking one',
                'Taking two',
                'Taking more than two'
            ],
            help: "Sedatives, Anti-depressants, Anti-parkinsons, Diuretics, Anti-hypertensives, Hypnotics.",
            validationConfig:  {
                rules: [
                    {required: true, message: "Please indicate patient's medications!"},
                ],
            }
        },
        {
            label: "Psychological",
            inputType: "dropdown",
            options: [
                'Does not appear to have any of these', 
                'Mildly affected by one or more',
                'Moderately affected by one or more',
                'Appears severly affected by one or more'
            ],
            help: "Anxiety, Depression, Poor Judgement regarding mobility, etc.",
            validationConfig:  {
                rules: [
                    {required: true, message: "Please indicate patient's psychological status!"},
                ],
            }
        },
        {
            label: "Cognitive Status",
            inputType: "dropdown",
            options: [
                'AMTS 9/10 or 10 or intact', 
                'AMTS 7/8, mildly impaired',
                'AMTS 5/6, moderately impaired',
                'AMTS 4 or less, severly impaired'
            ],
            help: "Hadkinson Abbreviated Mental Test Scores.",
            validationConfig:  {
                rules: [
                    {required: true, message: "Please indicate patient's cognitive status!"},
                ],
            }
        },
    ],
}

var CHECKLIST_FIELDS = {
    header: "Risk Factor Checklist",
    size: "wide",
    fields: [
        {
            label: "Reports/ observed difficulty seeing - objects/ signs/ finding way around",
            inputType: "radio", //text, number, dropdown, radio, datepicker, ...
            options: ["Yes", "No"],
            validationConfig:  {
                rules: [{required: true, message: "Please select an option!"}],
            }
        },
        {
            label: "Mobility status unknown or appears unsafe/ impulsive/ forgets gait aid",
            inputType: "radio", //text, number, dropdown, radio, datepicker, ...
            options: ["Yes", "No"],
            validationConfig:  {
                rules: [{required: true, message: "Please select an option!"}],
            }
        },
        {
            label: "Transfer status unknown or appears unsafe ie. over-reaches, impulsive",
            inputType: "radio", //text, number, dropdown, radio, datepicker, ...
            options: ["Yes", "No"],
            validationConfig:  {
                rules: [{required: true, message: "Please select an option!"}],
            }
        },
        {
            label: "Observed risk-taking behaviours, or reported from referrer/ previous facility",
            inputType: "radio", //text, number, dropdown, radio, datepicker, ...
            options: ["Yes", "No"],
            validationConfig:  {
                rules: [{required: true, message: "Please select an option!"}],
            }
        },
        {
            label: "Observed unsafe use of equipment",
            inputType: "radio", //text, number, dropdown, radio, datepicker, ...
            options: ["Yes", "No"],
            validationConfig:  {
                rules: [{required: true, message: "Please select an option!"}],
            }
        },
        {
            label: "Unsafe footwear/ inappropriate clothing",
            inputType: "radio", //text, number, dropdown, radio, datepicker, ...
            options: ["Yes", "No"],
            validationConfig:  {
                rules: [{required: true, message: "Please select an option!"}],
            }
        },
        {
            label: "Difficulties with orientation to environment i.e. areas between bed/ bathroom / dining room",
            inputType: "radio", //text, number, dropdown, radio, datepicker, ...
            options: ["Yes", "No"],
            validationConfig:  {
                rules: [{required: true, message: "Please select an option!"}],
            }
        },
        {
            label: "Underweight/ low appetite",
            inputType: "radio", //text, number, dropdown, radio, datepicker, ...
            options: ["Yes", "No"],
            validationConfig:  {
                rules: [{required: true, message: "Please select an option!"}],
            }
        },
        {
            label: "Reported or known urgency/ nocturia/ accidents",
            inputType: "radio", //text, number, dropdown, radio, datepicker, ...
            options: ["Yes", "No"],
            validationConfig:  {
                rules: [{required: true, message: "Please select an option!"}],
            }
        },
        {
            label: "Others",
            inputType: "text", //text, number, dropdown, radio, datepicker, ...
            validationConfig:  {
                rules: [{required: false, message: ""}],
            }
        },
    ],
}

class TestPatientsView extends Component {
    constructor(props) {
        super();
    }

    render() {
        return(
            <div style={{margin: "5px 5px 5px 5px", padding: "0px 20px", height: "100vh", width:"100%", background: 'white'}}>
                <DataForm fields={[DATA_FIELDS, FALL_RISK_FIELDS, CHECKLIST_FIELDS]} formSubmit={this._childFormSubmit} history={this.props.history} />
            </div>
        );
    }
}

export default TestPatientsView;