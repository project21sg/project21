import React, { Component } from "react";
import PatientLogsView from "./view";

class PatientLogsContainer extends Component {
  constructor(props) {
    super();
    console.log(props);
    const datasets = props.patientData || [];
    this.state = {
      datasets: datasets,
      patientData: datasets.length > 0 ? datasets[0] : [],
      gaitData: datasets.length > 0 ? datasets[0].gaitDataPoints : [],
      selectedDataIdx: 0
    };
    this._handleDataSelect = this._handleDataSelect.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.patientData !== this.props.patientData) {
      const datasets = this.props.patientData || [];
      this.setState({
        datasets: datasets,
        patientData: datasets.length > 0 ? datasets[0] : [],
        gaitData: datasets.length > 0 ? datasets[0].gaitDataPoints : [],
        selectedDataIdx: 0
      });
    }
  }

  _handleDataSelect(value) {
    this.setState(prevState => {
      console.log(prevState.datasets, value);
      return {
        selectedDataIdx: value,
        patientData: prevState.datasets[value],
        gaitData: prevState.datasets[value].gaitDataPoints
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
