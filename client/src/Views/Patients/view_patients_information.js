import React, { Component } from 'react';
import {
    Row,
    Col,
    Card
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
        if(prevProps.patientData != this.props.patientData) {
            this.setState({
                patientData : this.props.patientData
            })
        }
    }

    generatePatientDataView(p, ex) {
        return this.unpackObjectToRowCol(p, ex);
    }

    unpackObjectToRowCol(object, exclusions=[]) {
        return Object.keys(object).map((key) => {
            if(object[key] instanceof Object && !(object[key] instanceof Array)) {
                return this.unpackObjectToRowCol(object[key]);
            } else if (exclusions && !exclusions.includes(key)) {
                var label = key.charAt(0).toLocaleUpperCase() + key.substring(1); //TODO: kinda unnecessary extra logic...
                return (
                    <Row>
                        <Col span={8}>
                            {label}
                        </Col>
                        <Col span={16}>
                            {
                                object[key] instanceof Array ? object[key].map(x => x+', ') : object[key]
                            }
                        </Col>
                    </Row>               
                )
            }
        })
    }

    render() {
        var s = this.state;
        var p = s.patientData;
        var ex = ['id'];
        return( 
            <Row>
                <Col span={12}>
                    <Card style={{margin: 5}}>
                        {p && this.generatePatientDataView(p, ex)}
                    </Card> 
                </Col>
                <Col span={12}>
                    <Card style={{margin: 5}}>

                    </Card>
                </Col>
            </Row>
        );
    }
}

export default PatientInformationView;