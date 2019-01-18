import React, { Component } from 'react';
import {
    Row,
    Col,
    Card
} from 'antd';

import SingleCircularBar from '../../Components/Charts/circular_bar';

class PatientLogsView extends Component {
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
            return <div></div>;//default
        })
    }

    render() {
        return( 
        <div>
            <Row>
                <Col span={4}>
                    <Card style={{margin: 5}}>
                        Overall Score
                        <SingleCircularBar value={50} maxValue={100} suffix={'%'} thresholds={
                            [
                                {level: 30, label:'LOW', color: 'green'},
                                {level: 60, label:'MEDIUM', color: 'orange'},
                                {level: 100, label:'HIGH', color: 'red'},
                            ]
                        }/>
                    </Card> 
                </Col>
                <Col span={6}>
                    <Card style={{margin: 5}}>
                        Gait Balance
                        
                    </Card> 
                </Col>
                <Col span={4}>
                    <Card style={{margin: 5}}>
                        Timed Up and Go
                        <SingleCircularBar value={10} maxValue={60} suffix={''} thresholds={
                            [
                                {level: 15, label:'SECONDS', color: 'green'},
                                {level: 30, label:'SECONDS', color: 'orange'},
                                {level: 45, label:'SECONDS', color: 'red'},
                            ]
                        }/>
                    </Card> 
                </Col>
            </Row>
            <Row>
                <Col span={14}>
                    <Card style={{margin: 5}}>
                        Gait Data
                        
                    </Card> 
                </Col>
            </Row>
            <Row>
                <Col span={14}>
                    <Card style={{margin: 5}}>
                        Fall Risk Status/ Risk Factor Checklist
                    </Card> 
                </Col>
            </Row>
        </div>
        );
    
    }
}

export default PatientLogsView;