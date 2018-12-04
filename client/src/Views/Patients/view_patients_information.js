import React, { Component } from 'react';

class PatientInformationView extends Component {
    constructor(props) {
        super();
        this.state = {
            patientData: props.patientData
        }
        this.generatePatientDataView = this.generatePatientDataView.bind(this);
    }

    generatePatientDataView() {
        return this.unpackObjectToText(this.state.patientData);
    }

    //this method should be a helper
    unpackObjectToText(object) {
        return Object.keys(object).map((key) => {
            if(object[key] instanceof Object) {
                return this.unpackObjectToText(object[key]);
            } else {
                // return <Text>{key}: {object[key]}</Text>
            }
        }
    )
    }

    render() {
        var s = this.state;
        var p = s.patientData;
        return( <div></div>
            // <Card>
            //     {this.generatePatientDataView()}
            // </Card>
        );
    }
}

export default PatientInformationView;