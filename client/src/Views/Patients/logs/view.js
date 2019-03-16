import React, { Component } from 'react';
import {
    Row,
    Col,
    Card,
    Select
} from 'antd';

import SingleCircularBar from '../../../Components/Charts/circular_bar';
import HoriLabeledBar from '../../../Components/Charts/hori_labeled_bar';
import LineChart from '../../../Components/Charts/line_chart';

//need to fetch labels from central source of risk factor data
const FALL_RISK_FIELDS = {
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

//need to fetch labels from central source of risk factor data
class PatientLogsView extends Component {
    constructor(props) {
        super();
        this.state = {
            patientData: props.patientData,
            gaitData: props.gaitData,
            dataset: props.dataset,
        }
        this.handleDataSelect = props.handleDataSelect;
    }

    componentDidUpdate(prevProps) {
        if(prevProps.patientData !== this.props.patientData) {
            this.setState({
                patientData:  this.props.patientData,
                gaitData: this.props.gaitData,
                dataset: this.props.dataset,
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
                let label = key.charAt(0).toLocaleUpperCase() + key.substring(1); //TODO: kinda unnecessary extra logic...
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

    render() {
        const patientData = this.state.patientData;
        const gaitData = this.state.gaitData;
        const dataset = this.state.dataset;

        const gaitBalanceData = [
            {value: patientData.speed, label: 'Speed'},
            {value: patientData.symmetry, label: 'Symmetry'},
            {value: patientData.stepRatio, label: 'Step Ratio'},
        ]

        if(!patientData) { return <div>Data seems to be missing!</div>; }

        return( 
        <div>
            <Row>
                <Select
                block
                key="dataSelect"
                defaultValue={0}
                onChange={this._handleDataSelect}
                >
                {patientData && patientData.filter(x => x !== null && x.name !== undefined ).map((x, i) =>
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
                        <SingleCircularBar value={patientData.fallRiskPercent} maxValue={100} suffix={'%'} thresholds={
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
                        <HoriLabeledBar 
                        height={200}
                        width={'99%'}
                        data={gaitBalanceData}/>
                    </Card> 
                </Col>
                <Col span={5}>
                    <Card style={{margin: 5, height: 250}}>
                        <span style={{fontWeight: 'bold', fontSize: 15}}>Timed Up and Go</span>
                        <SingleCircularBar value={patientData.tugDuration} maxValue={60} suffix={''} thresholds={
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
                        <LineChart 
                        height={500}
                        width={'99%'}
                        data={gaitData} />
                    </Card> 
                </Col>
            </Row>
            <Row>
                <Col span={20}>
                    <Card style={{margin: 5}}>
                        <span style={{fontWeight: 'bold', fontSize: 15}}>Fall Risk Status/ Risk Factor Checklist</span>
                        { dataset && this._buildRiskFactorView(dataset, ['_id', 'dateUploaded', 'name']) }
                    </Card> 
                </Col>
            </Row>
        </div>
        );
    
    }
}

export default PatientLogsView;