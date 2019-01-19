import React, { Component } from 'react';
import {
    Row,
    Col,
    Card
} from 'antd';

import SingleCircularBar from '../../Components/Charts/circular_bar';
import HoriLabeledBar from '../../Components/Charts/hori_labeled_bar';
import LineChart from '../../Components/Charts/line_chart';

const DUMMY_DATA = [
    {
        fallRiskPercent: 4,
        speed: 39,
        symmetry: 43,
        stopRatio: 39,
        tugDuration: 10,
        riskFactorData: {
            recentFalls: "None in the last 12 months",
            medication: "Taking 1",
            psychological: "Does not appear to be affected",
            AMTS: "9, 10",
            riskFactorChecklist: "1/8",
        }
    }
]

const DUMMY_GAIT_DATA = [
    [0.98, -0.09, 0.07,	-3.01, -0.83, -1.53, 0],
    [0.97, -0.1	, 0.08, -1.34, -1.01, -1.76, 0.031051],
    [0.98, -0.11, 0.07,	-0.62, -1.39, -1.53, 0.051635],
    [0.97, -0.1	, 0.07, 0.85, -1.79, -1.5,  0.07219],
    [0.98, -0.08, 0.08,	1.09, -1.59, -1.26, 0.092733],
    [0.98, -0.08, 0.08,	-0.56, -1.75, -1.13, 0.113255],
]

class PatientLogsView extends Component {
    constructor(props) {
        super();
        this.state = {
            patientData: DUMMY_DATA,//props.patientData
            gaitData: DUMMY_GAIT_DATA,
            selectedDataIdx: 0
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.patientData !== this.props.patientData) {
            this.setState({
                patientData : DUMMY_DATA,// this.props.patientData
                gaitData: DUMMY_GAIT_DATA
            })
        }
    }

    _buildRiskFactorView(p, ex) {
        return this.unpackObjectToRowCol(p, ex);
    }

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
                        <Col span={5}>
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
        var data = this.state.patientData[this.state.selectedDataIdx];
        var gaitData = this.state.gaitData;
        if(!data) { return <div></div>; }

        return( 
        <div>
            <Row>
                <Col span={5}>
                    <Card style={{margin: 5, height: 250}}>
                        <span style={{fontWeight: 'bold', fontSize: 15}}>Overall Score</span>
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
                        <span style={{fontWeight: 'bold', fontSize: 15}}>Gait Balance</span>
                        <HoriLabeledBar data={[
                            {value: data.speed, label: 'Speed'},
                            {value: data.symmetry, label: 'Symmetry'},
                            {value: data.stopRatio, label: 'Stop Ratio'},
                        ]}/>
                    </Card> 
                </Col>
                <Col span={5}>
                    <Card style={{margin: 5, height: 250}}>
                        <span style={{fontWeight: 'bold', fontSize: 15}}>Timed Up and Go</span>
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
                <Col span={20}>
                    <Card style={{margin: 5}}>
                        <span style={{fontWeight: 'bold', fontSize: 15}}>Gait Data</span>
                        <LineChart data={gaitData} />
                    </Card> 
                </Col>
            </Row>
            <Row>
                <Col span={20}>
                    <Card style={{margin: 5}}>
                        <span style={{fontWeight: 'bold', fontSize: 15}}>Fall Risk Status/ Risk Factor Checklist</span>
                        { this._buildRiskFactorView(data.riskFactorData) }
                    </Card> 
                </Col>
            </Row>
        </div>
        );
    
    }
}

export default PatientLogsView;