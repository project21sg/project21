import React, { Component } from 'react';
import moment from 'moment';

import PatientForm from '../../Components/Forms/patient_form';

// TODO: refactor into to-be-imported .json file
var PRIMARY_FIELDS = {
    header: "Patient Particulars",
    fields: [
        {
            label: "Name",
            inputType: "text", //text, number, dropdown, radio, datepicker, ...
            validationConfig:  {
                rules: [
                    {required: true, message: "Name cannot be left empty!"},
                    {pattern: /^[a-z ,.'-]+$/i, message: "Please check for spelling or formatting errors!"}
                ],
            }
        },
        {
            label: "NRIC",
            inputType: "text", //text, number, dropdown, radio, datepicker, ...
            validationConfig:  {
                rules: [
                    {required: true, message: "NRIC cannot be left empty!"},
                    {pattern: /^[STFG]\d{7}[A-Z]$/, message: "NRIC seems to be incorrect!"}
                ],
            }
        },
        {
            label: "Gender",
            inputType: "radio", //text, number, dropdown, radio, datepicker, ...
            options: ["Male", "Female"],
            validationConfig:  {
                rules: [{required: true, message: "Please select a gender!"}],
            }
        },
        {
            label: "Date of Birth",
            inputType: "datepicker", //text, number, dropdown, radio, datepicker, ...
            validationConfig:  {
                rules: [{required: true, message: "DoB cannot be left empty!"}],
                initialValue: moment('01-01-1980', "DD-MM-YYYY")
            }
        },
        {
            label: "Contact",
            inputType: "number", //text, number, dropdown, radio, datepicker, ...
            validationConfig:  {
                rules: [
                    {required: true, message: "Please input a valid contact number!"},
                    {pattern: /^[0-9]{8}$/, message: "Please input a valid, 8-digit contact number!"}
                ],
            }
        },
        {
            label: "Address",
            inputType: "text", //text, number, dropdown, radio, datepicker, ...
            validationConfig:  {
                rules: [
                    {required: true, message: "Address cannot be left empty!"},
                ],
            }
        },
        {
            label: "Zip Code",
            inputType: "number", //text, number, dropdown, radio, datepicker, ...
            validationConfig:  {
                rules: [
                    {required: true, message: "ZIP code cannot be left empty!"},
                    {pattern: /^[0-9]{6}$/, message: "ZIP code seems to be incorrect!"}
                ],
            }
        },
        {
            label: "Occupation",
            inputType: "text", //text, number, dropdown, radio, datepicker, ...
            validationConfig:  {
                rules: [{required: true, message: "Occupation cannot be empty! If Unemployed, please input as such."}],
            }
        },
        {
            label: "Marital Status",
            inputType: "dropdown", //text, number, dropdown, radio, datepicker, ...
            options: ["Single", "Engaged", "Married"],
            validationConfig:  {
                rules: [
                    {required: true, message: "Please select patient's Marital Status!"}
                ],
            }
        },
        {
            label: "Known Health Issues",
            inputType: "text", //text, number, dropdown, radio, datepicker, ...
            validationConfig:  {
                rules: [{required: true, message: "Field cannot be left empty! If none, please input as N.A."}],
            }
        },
    ],
}

var SECONDARY_FIELDS = {
    header: "Next of Kin",
    fields: [
        {
            label: "Next of Kin Name",
            inputType: "text", //text, number, dropdown, radio, datepicker, ...
            validationConfig:  {
                rules: [
                    {required: true, message: "Next of Kin's name cannot be left empty!"},
                    {pattern: /^[a-z ,.'-]+$/i, message: "Please check for spelling or formatting errors!"}
                ],
            }
        },
        {
            label: "Relation to Patient",
            inputType: "dropdown", //text, number, dropdown, radio, datepicker, ...
            options: ["N.A.","Mother", "Father", "Sibling", "Relative", "Guardian", "Caretaker", "Children", "Partner"],
            validationConfig:  {
                rules: [{required: true, message: "NoK's relation to patient cannot be left empty!"}],
            }
        },
        {
            label: "Next of Kin Address",
            inputType: "text", //text, number, dropdown, radio, datepicker, ...
            validationConfig:  {
                rules: [{required: true, message: "NoK's address cannot be left empty!"}],
            }
        },
        {
            label: "Next of Kin Contact",
            inputType: "number", //text, number, dropdown, radio, datepicker, ...
            validationConfig:  {
                rules: [
                    {required: true, message: "Field cannot be left empty!"},
                    {pattern: /^[0-9]{8}$/, message: "Please input a valid, 8-digit contact number!"}
                ],
            }
        },
    ],
}

class AddPatientsView extends Component {
    constructor(props) {
        super();
    }

    render() {
        return(
            <div style={{margin: "5px 5px 5px 5px", padding: "0px 20px", height: "100vh", width:"100%", background: 'white'}}>
                <PatientForm fields={[PRIMARY_FIELDS, SECONDARY_FIELDS]} formSubmit={this._childFormSubmit}/>
            </div>
        );
    }
}

export default AddPatientsView;