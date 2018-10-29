import React, { Component } from 'react';
import {
    Button,
    Tab,
    Tabs,
    Card,
    Text
} from '@blueprintjs/core';

class PatientInformationView extends Component {
    constructor(props) {
        super();
        this.state = {
            patientData: props.patientData
        }
        this.generatePatientDataView = this.generatePatientDataView.bind(this);
    }

    generatePatientDataView() {
        return (
            <tbody>
                {this.unpackObjectToText(this.state.patientData)}
            </tbody>
        );
    }

    //this method should be a helper
    unpackObjectToText(object) {
        return (
            Object.keys(object).map((key) => {
                if(key === 'id') return;

                if(object[key] instanceof Array) {
                    return (
                        <tr>
                            <td>Health Issues</td> <td>{object[key].map((item) => item + ", ")}</td>
                        </tr>
                    );
                }
                else if(object[key] instanceof Object) {
                    return this.unpackObjectToText(object[key]);
                } 
                else {
                    return (
                        <tr>
                            <td>{key}</td> <td>{object[key]}</td>
                        </tr>
                    );
                }
            })
        )
    }

    render() {
        var s = this.state;
        var p = s.patientData;
        return(
            <Card style={{width: "100%"}}>
                <table class="bp3-html-table .modifier">
                    {this.generatePatientDataView()}
                </table>
            </Card>
        );
    }
}

export default PatientInformationView;