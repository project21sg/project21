import React, { Component } from "react";
import PatientLogsView from "./view";

const DUMMY_DATA = [
  {
    name: "dummy",
    dateUploaded: Date(),
    riskFactorData: {
      recentFalls: 1,
      medications: 1,
      psychological: 1,
      AMTS: 1,
      riskFactor: 8
    },
    tugDuration: 10,
    fallRiskPercent: 45, //these should be calculated
    stepRatio: 5,
    speed: 5,
    symmetry: 5
  }
];

const DUMMY_GAIT_DATA = [
  [0.98, -0.09, 0.07, -3.01, -0.83, -1.53, 0],
  [0.97, -0.1, 0.08, -1.34, -1.01, -1.76, 0.031051],
  [0.98, -0.11, 0.07, -0.62, -1.39, -1.53, 0.051635],
  [0.97, -0.1, 0.07, 0.85, -1.79, -1.5, 0.07219],
  [0.98, -0.08, 0.08, 1.09, -1.59, -1.26, 0.092733],
  [0.98, -0.08, 0.08, -0.56, -1.75, -1.13, 0.113255],
  [0.98, -0.09, 0.07, -3.01, -0.83, -1.53, 0],
  [0.97, -0.1, 0.08, -1.34, -1.01, -1.76, 0.031051],
  [0.98, -0.11, 0.07, -0.62, -1.39, -1.53, 0.051635],
  [0.97, -0.1, 0.07, 0.85, -1.79, -1.5, 0.07219],
  [0.98, -0.08, 0.08, 1.09, -1.59, -1.26, 0.092733],
  [0.98, -0.08, 0.08, -0.56, -1.75, -1.13, 0.113255],
  [0.98, -0.09, 0.07, -3.01, -0.83, -1.53, 0],
  [0.97, -0.1, 0.08, -1.34, -1.01, -1.76, 0.031051],
  [0.98, -0.11, 0.07, -0.62, -1.39, -1.53, 0.051635],
  [0.97, -0.1, 0.07, 0.85, -1.79, -1.5, 0.07219],
  [0.98, -0.08, 0.08, 1.09, -1.59, -1.26, 0.092733],
  [0.98, -0.08, 0.08, -0.56, -1.75, -1.13, 0.113255],
  [0.98, -0.09, 0.07, -3.01, -0.83, -1.53, 0],
  [0.97, -0.1, 0.08, -1.34, -1.01, -1.76, 0.031051],
  [0.98, -0.11, 0.07, -0.62, -1.39, -1.53, 0.051635],
  [0.97, -0.1, 0.07, 0.85, -1.79, -1.5, 0.07219],
  [0.98, -0.08, 0.08, 1.09, -1.59, -1.26, 0.092733],
  [0.98, -0.08, 0.08, -0.56, -1.75, -1.13, 0.113255],
  [0.98, -0.09, 0.07, -3.01, -0.83, -1.53, 0],
  [0.97, -0.1, 0.08, -1.34, -1.01, -1.76, 0.031051],
  [0.98, -0.11, 0.07, -0.62, -1.39, -1.53, 0.051635],
  [0.97, -0.1, 0.07, 0.85, -1.79, -1.5, 0.07219],
  [0.98, -0.08, 0.08, 1.09, -1.59, -1.26, 0.092733],
  [0.98, -0.08, 0.08, -0.56, -1.75, -1.13, 0.113255],
  [0.98, -0.09, 0.07, -3.01, -0.83, -1.53, 0],
  [0.97, -0.1, 0.08, -1.34, -1.01, -1.76, 0.031051],
  [0.98, -0.11, 0.07, -0.62, -1.39, -1.53, 0.051635],
  [0.97, -0.1, 0.07, 0.85, -1.79, -1.5, 0.07219],
  [0.98, -0.08, 0.08, 1.09, -1.59, -1.26, 0.092733],
  [0.98, -0.08, 0.08, -0.56, -1.75, -1.13, 0.113255]
];

class PatientLogsContainer extends Component {
  constructor(props) {
    super();
    this.state = {
      datasets: DUMMY_DATA,
      patientData: DUMMY_DATA[0],
      gaitData: DUMMY_GAIT_DATA,
      selectedDataIdx: 0
    };
    this._handleDataSelect = this._handleDataSelect.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.patientData !== this.props.patientData) {
      this.setState({
        datasets: DUMMY_DATA,
        patientData: DUMMY_DATA[0], // this.props.patientData
        gaitData: DUMMY_GAIT_DATA,
        selectedDataIdx: 0
      });
    }
  }

  _handleDataSelect(value) {
    this.setState(prevState => {
      return {
        selectedDataIdx: value,
        patientData: prevState.datasets[value]
      };
    });
  }

  render() {
    const patientData = this.state.patientData;
    const gaitData = this.state.gaitData;
    const datasets = this.state.datasets;
    return (
      <PatientLogsView
        patientData={patientData}
        gaitData={gaitData}
        datasets={datasets}
        handleDataSelect={this._handleDataSelect}
      />
    );
  }
}

export default PatientLogsContainer;
