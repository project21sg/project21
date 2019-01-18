import React, { Component } from 'react';
import {
    Row,
    Col,
    Card,
} from 'antd';

class PatientInformationView extends Component {
    constructor(props) {
        super();
        this.state = {
            patientData: props.patientData
        }
    
        this.generatePatientDataView = this.generatePatientDataView.bind(this);
    }

    componentDidUpdate(prevProps) {
        if(prevProps.patientData !== this.props.patientData) {
            this.setState({
                patientData : this.props.patientData
            })
        }
    }

    generatePatientDataView(p, ex) {
        return this.unpackObjectToRowCol(p, ex);
    }

    //TODO: refactor this... direct mapping would be neater and simpler
    unpackObjectToRowCol(object, exclusions=[]) {
        return Object.keys(object).map((key) => {
            if(object[key] instanceof Object && !(object[key] instanceof Array)) {
                return this.unpackObjectToRowCol(object[key]);
            } else if (!exclusions.includes(key)) {
                var label = key.charAt(0).toLocaleUpperCase() + key.substring(1); //TODO: kinda unnecessary extra logic...
                label = label.replace(/([A-Z])/g, ' $1').trim();

                return (
                    <Row 
                    key={label}>
                        <Col span={9}>
                            {label}
                        </Col>
                        <Col span={15}>
                            {
                                object[key] instanceof Array 
                                ? object[key].map(x => x+', ') 
                                : key === 'dateOfBirth' ? object[key].substring(0, 10) //very temp workaround
                                : object[key].charAt(0).toLocaleUpperCase() + object[key].substring(1)
                            }
                        </Col>
                    </Row>               
                )
            }
            return <div></div>; //default
        })
    }

    render() {
        var s = this.state;
        var p = s.patientData;
        var patient = p && {
            name: p.name,
            nric: p.nric,
            gender: p.gender,
            dateOfBirth: p.dateOfBirth,
            contact: p.contact,
            address: p.address,
            zipCode: p.zipCode,
            occupation: p.occupation,
            maritalStatus: p.maritalStatus,
            knownHealthIssues: p.knownHealthIssues
        };

        var nok = p && {
            name: p.nokName,
            relation: p.nokRelation,
            address: p.nokAddress,
            contact: p.nokContact
        };
        var ex = ['_id', '__v', 'createdAt', 'updatedAt'];

        return( 
            p?
            <div>
            <Row>
                <Col span={14}>
                    <Card style={{margin: 5}}>
                        <span style={{fontWeight: 'bold', fontSize: 15}}>Patient</span>
                        {p && this.generatePatientDataView(patient, ex)}
                    </Card> 
                </Col>
            </Row>
            <Row>
                <Col span={14}>
                    <Card style={{margin: 5}}>
                        <span style={{fontWeight: 'bold', fontSize: 15}}>Next of Kin</span>
                        {p && this.generatePatientDataView(nok, ex)}
                    </Card>
                </Col>
            </Row>
            </div>
            :<div></div>
        );
    }
}

export default PatientInformationView;