import React, { Component } from 'react';
import{
    Row,
    Col,
    Button,
} from 'antd';

import PatientForm from '../../Components/Forms/patient_form';

var PRIMARY_FIELDS = {
    header: "Patient Particulars",
    fields: [
        {
            label: "Name",
            inputType: "text", //text, number, dropdown, radio, datepicker, ...

        },
        {
            label: "NRIC",
            inputType: "text", //text, number, dropdown, radio, datepicker, ...
        },
        {
            label: "Gender",
            inputType: "radio", //text, number, dropdown, radio, datepicker, ...
            options: ["Male", "Female"],
        },
        {
            label: "Date of Birth",
            inputType: "datepicker", //text, number, dropdown, radio, datepicker, ...
        },
        {
            label: "Contact",
            inputType: "number", //text, number, dropdown, radio, datepicker, ...
        },
        {
            label: "Address",
            inputType: "text", //text, number, dropdown, radio, datepicker, ...
        },
        {
            label: "Zip Code",
            inputType: "number", //text, number, dropdown, radio, datepicker, ...
        },
        {
            label: "Occupation",
            inputType: "text", //text, number, dropdown, radio, datepicker, ...
        },
        {
            label: "Marital Status",
            inputType: "dropdown", //text, number, dropdown, radio, datepicker, ...
            options: ["Single", "Engaged", "Married"],
        },
        {
            label: "Known Health Issues",
            inputType: "text", //text, number, dropdown, radio, datepicker, ...
        },
    ],
}

var SECONDARY_FIELDS = {
    header: "Next of Kin",
    fields: [
        {
            label: "Next of Kin Name",
            inputType: "text", //text, number, dropdown, radio, datepicker, ...
        },
        {
            label: "Relation to Patient",
            inputType: "dropdown", //text, number, dropdown, radio, datepicker, ...
            options: ["N.A.","Mother", "Father", "Sibling", "Relative", "Guardian", "Caretaker"],
        },
        {
            label: "Next of Kin Address",
            inputType: "text", //text, number, dropdown, radio, datepicker, ...
        },
        {
            label: "Next of Kin Contact",
            inputType: "number", //text, number, dropdown, radio, datepicker, ...
        },
    ],
}

class AddPatientsView extends Component {
    constructor(props) {
        super();
    }

    render() {
        var s = this.state;

        return(
            <div style={{margin: "5px 5px 5px 5px", padding: "0px 20px", height: "100vh", width:"100%", background: 'white'}}>
                <PatientForm fields={[PRIMARY_FIELDS, SECONDARY_FIELDS]} formSubmit={this._childFormSubmit}/>
            </div>
        );
    }
}

export default AddPatientsView;