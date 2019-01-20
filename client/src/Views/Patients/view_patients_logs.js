import React, { Component } from 'react';
import {
    Row,
    Col,
    Card,
    Select
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

//need to fetch labels from central source of risk factor data
var FALL_RISK_FIELDS = {
    recentFalls: [
        'None in the last 12 months' ,
        '1 or more between 3 and 12 months ago', 
        '1 or more in last 3 months',
        '1 or more in last 3 months whilst inpatient/resident',
    ],
    medications: [
        'Not taking any of these',
        'Taking one', 
        'Taking two', 
        'Taking more than two', 
    ],
    psychological:[
        'Does not appear to have any of these',
        'Mildly affected by one or more',
        'Moderately affected by one or more',
        'Appears severly affected by one or more',
    ],
    AMTS:[
        'AMTS 9/10 or 10 or intact',
        'AMTS 7/8, mildly impaired',
        'AMTS 5/6, moderately impaired',
        'AMTS 4 or less, severly impaired',
    ],
}

class PatientLogsView extends Component {
    constructor(props) {
        super();
        this.state = {
            patientData: DUMMY_DATA, //props.patientData.datasets,
            gaitData: DUMMY_GAIT_DATA,
            selectedDataIdx: 0
        }
        this._handleDataSelect = this._handleDataSelect.bind(this);
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
        return object && Object.keys(object).map((key) => {
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
                                key === 'riskFactor' ? object[key]
                                : key === 'tugDuration' ? object[key]+' seconds'
                                : FALL_RISK_FIELDS[key][object[key] - 1]
                            }
                        </Col>
                    </Row>               
                )
            }
            return <div></div>; //default
        })
    }

    _handleDataSelect(value) {
        this.setState({
            selectedDataIdx: value
        })
    }

    render() {
        var data = this.state.patientData[0];
        var gaitData = this.state.gaitData;
        if(!data) { return <div>Data seems to be missing!</div>; }

        return( 
        <div>
            <Row>
                <Select
                block
                key="dataSelect"
                defaultValue={0}
                onChange={this._handleDataSelect}
                >
                {this.props.patientData && this.props.patientData.datasets.filter(x => x !== null && x.name !== undefined ).map((x, i) =>
                    <Select.Option
                    key={x.name+' '+x.dateUploaded}
                    value={i}
                    >
                        {x.name+' '+x.dateUploaded}
                    </Select.Option>
                )
                }
                </Select>
            </Row>
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
                        { this.props.patientData.datasets.length > 0 && this._buildRiskFactorView(this.props.patientData.datasets[this.state.selectedDataIdx], ['_id', 'dateUploaded', 'name']) }
                    </Card> 
                </Col>
            </Row>
        </div>
        );
    
    }
}

export default PatientLogsView;