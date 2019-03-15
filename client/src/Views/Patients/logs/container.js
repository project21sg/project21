import React, { Component } from 'react';
import PatientLogsView from './view'

const DUMMY_DATA = [
    {
        fallRiskPercent: 4,
        speed: 39,
        symmetry: 43,
        stepRatio: 39,
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

class PatientLogsContainer extends Component {
    constructor(props) {
        super();
        this.state = {
            patientData: DUMMY_DATA, //props.patientData.datasets,
            gaitData: DUMMY_GAIT_DATA,
            dataset: DUMMY_DATA[0],
            selectedDataIdx: 0
        }
        this._handleDataSelect = this._handleDataSelect.bind(this);
    }

    componentDidUpdate(prevProps) {
        if(prevProps.patientData !== this.props.patientData) {
            this.setState({
                patientData: DUMMY_DATA,// this.props.patientData
                gaitData: DUMMY_GAIT_DATA,
                dataset: DUMMY_DATA[0],
                selectedDataIdx: 0
            })
        }
    }

    _handleDataSelect(value) {
        this.setState({
            selectedDataIdx: value
        })
    }

    render() {
        const patientData = this.state.patientData;
        const gaitData = this.state.gaitData;
        const dataset = this.state.dataset[this.state.selectedDataIdx];
        return( 
            <PatientLogsView 
                patientData={patientData}
                gaitData={gaitData}
                dataset={dataset}
                handleDataSelect={this._handleDataSelect}
            />
        );
    }
}

export default PatientLogsContainer;