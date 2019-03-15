import React, { Component } from 'react';
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
            key: 'fallRiskAssessment_1',
            inputType: "dropdown",
            options: [
                {label: 'None in the last 12 months' ,value: 2}, 
                {label: '1 or more between 3 and 12 months ago', value: 4},
                {label: '1 or more in last 3 months', value: 6},
                {label: '1 or more in last 3 months whilst inpatient/resident', value: 8},
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
            key: 'fallRiskAssessment_2',
            inputType: "dropdown",
            options: [
                {label: 'Not taking any of these', value: 1},
                {label: 'Taking one', value: 2},
                {label: 'Taking two', value: 3},
                {label: 'Taking more than two', value: 4}
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
            key: 'fallRiskAssessment_3',
            inputType: "dropdown",
            options: [
                {label: 'Does not appear to have any of these', value: 1},
                {label: 'Mildly affected by one or more', value: 2},
                {label: 'Moderately affected by one or more', value: 3},
                {label: 'Appears severly affected by one or more', value: 4}
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
            key: 'fallRiskAssessment_4',
            inputType: "dropdown",
            options: [
                {label: 'AMTS 9/10 or 10 or intact', value: 1},
                {label: 'AMTS 7/8, mildly impaired', value: 2},
                {label: 'AMTS 5/6, moderately impaired', value: 3},
                {label: 'AMTS 4 or less, severly impaired', value: 4}
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
            label: "Reports/ observed difficulty with vision",
            key: "fallRiskFactor_1",
            inputType: "radio", //text, number, dropdown, radio, datepicker, ...
            options: [{label: "Yes", value: 1}, {label: "No", value: 0}],
            validationConfig:  {
                rules: [{required: true, message: "Please select an option!"}],
            }
        },
        {
            label: "Mobility status unknown or appears unsafe",
            key: "fallRiskFactor_2",
            inputType: "radio", //text, number, dropdown, radio, datepicker, ...
            options: [{label: "Yes", value: 1}, {label: "No", value: 0}],
            validationConfig:  {
                rules: [{required: true, message: "Please select an option!"}],
            }
        },
        {
            label: "Transfer status unknown or appears unsafe",
            key: "fallRiskFactor_3",
            inputType: "radio", //text, number, dropdown, radio, datepicker, ...
            options: [{label: "Yes", value: 1}, {label: "No", value: 0}],
            validationConfig:  {
                rules: [{required: true, message: "Please select an option!"}],
            }
        },
        {
            label: "Observed/reportedly comitting risk-taking behaviours",
            key: "fallRiskFactor_4",
            inputType: "radio", //text, number, dropdown, radio, datepicker, ...
            options: [{label: "Yes", value: 1}, {label: "No", value: 0}],
            validationConfig:  {
                rules: [{required: true, message: "Please select an option!"}],
            }
        },
        {
            label: "Observed unsafe usage of equipment",
            key: "fallRiskFactor_5",
            inputType: "radio", //text, number, dropdown, radio, datepicker, ...
            options: [{label: "Yes", value: 1}, {label: "No", value: 0}],
            validationConfig:  {
                rules: [{required: true, message: "Please select an option!"}],
            }
        },
        {
            label: "Unsafe footwear/ inappropriate clothing",
            key: "fallRiskFactor_6",
            inputType: "radio", //text, number, dropdown, radio, datepicker, ...
            options: [{label: "Yes", value: 1}, {label: "No", value: 0}],
            validationConfig:  {
                rules: [{required: true, message: "Please select an option!"}],
            }
        },
        {
            label: "Difficulties with orientation to environment",
            key: "fallRiskFactor_7",
            inputType: "radio", //text, number, dropdown, radio, datepicker, ...
            options: [{label: "Yes", value: 1}, {label: "No", value: 0}],
            validationConfig:  {
                rules: [{required: true, message: "Please select an option!"}],
            }
        },
        {
            label: "Underweight/ low appetite",
            key: "fallRiskFactor_8",
            inputType: "radio", //text, number, dropdown, radio, datepicker, ...
            options: [{label: "Yes", value: 1}, {label: "No", value: 0}],
            validationConfig:  {
                rules: [{required: true, message: "Please select an option!"}],
            }
        },
        {
            label: "Reported/known urgency, nocturia, accidents",
            key: "fallRiskFactor_9",
            inputType: "radio", //text, number, dropdown, radio, datepicker, ...
            options: [{label: "Yes", value: 1}, {label: "No", value: 0}],
            validationConfig:  {
                rules: [{required: true, message: "Please select an option!"}],
            }
        },
        // {
        //     label: "Others",
        //     key: "fallRiskFactor_10",
        //     inputType: "text", //text, number, dropdown, radio, datepicker, ...
        //     validationConfig:  {
        //         rules: [{required: false, message: ""}],
        //     }
        // },
    ],
}

class TestPatientsView extends Component {
    constructor(props) {
        super();
        this.state = {
            patientId: props.patientId
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.patientId !== this.props.patientId) {
            this.setState({
                patientId : this.props.patientId
            })
        }
    }

    render() {
        return(
            <div style={{margin: "5px 5px 5px 5px", padding: "0px 20px", height: "100vh", width:"100%", background: 'white'}}>
                {
                    this.state.patientId && 
                    <DataForm 
                    patientId={this.state.patientId}
                    fields={[DATA_FIELDS, FALL_RISK_FIELDS, CHECKLIST_FIELDS]} 
                    formSubmit={this._childFormSubmit}
                    history={this.props.history} />
                }
            </div>
        );
    }
}

export default TestPatientsView;