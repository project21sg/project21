import React, { Component } from 'react';
import {
    Row,
    Col,
    Card
} from 'antd';

import SingleCircularBar from '../../Components/Charts/circular_bar';
import HoriLabeledBar from '../../Components/Charts/hori_labeled_bar';

const DUMMY_DATA = [
    {
        fallRiskPercent: 4,
        speed: 39,
        symmetry: 43,
        stopRatio: 39,
        tugDuration: 10,
    }
]

class PatientLogsView extends Component {
    constructor(props) {
        super();
        this.state = {
            patientData: DUMMY_DATA,//props.patientData
            selectedDataIdx: 0
        }
    
        this.generatePatientDataView = this.generatePatientDataView.bind(this);
    }

    componentDidUpdate(prevProps) {
        if(prevProps.patientData !== this.props.patientData) {
            this.setState({
                patientData : DUMMY_DATA// this.props.patientData
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
        var data = this.state.patientData[this.state.selectedDataIdx];
        return( 
        <div>
            <Row>
                <Col span={4}>
                    <Card style={{margin: 5, height: 250}}>
                        Overall Score
                        <SingleCircularBar value={data.fallRiskPercent} maxValue={100} suffix={'%'} thresholds={
                            [
                                {level: 30, label:'LOW', color: 'green'},
                                {level: 60, label:'MEDIUM', color: 'orange'},
                                {level: 100, label:'HIGH', color: 'red'},
                            ]
                        }/>
                    </Card> 
                </Col>
                <Col span={10}>
                    <Card style={{margin: 5, height: 250}}>
                        Gait Balance
                        <HoriLabeledBar data={[
                            {value: data.speed, label: 'Speed'},
                            {value: data.symmetry, label: 'Symmetry'},
                            {value: data.stopRatio, label: 'Stop Ratio'},
                        ]}/>
                    </Card> 
                </Col>
                <Col span={4}>
                    <Card style={{margin: 5, height: 250}}>
                        Timed Up and Go
                        <SingleCircularBar value={data.tugDuration} maxValue={60} suffix={''} thresholds={
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
                <Col span={18}>
                    <Card style={{margin: 5}}>
                        Gait Data
                        
                    </Card> 
                </Col>
            </Row>
            <Row>
                <Col span={18}>
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