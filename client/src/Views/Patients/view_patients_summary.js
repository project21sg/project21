import React, { Component } from "react";
import { Tabs } from "antd";
import PatientInformationView from "./view_patients_information";
import { PatientLogsContainer } from "./logs";
import PatientTestView from "./view_patients_test";

class PatientsSummaryView extends Component {
  constructor(props) {
    super();
    this.state = {
      patientId: props.patientId,
      patientInfo: props.patentInfo
    };

    this.handleTabChange = this.handleTabChange.bind(this);
  }

  _fetchMedicalRecords(patientId) {
    fetch(
      `http://${window.location.hostname}:9000/api/v1/medical-records/patient`,
      {
        method: "post",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ patientId })
      }
    )
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          patientData: json
        });
        console.log(json);
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    const patientId = this.state.patientId;
    if (patientId) {
      this._fetchMedicalRecords(this.state.patientId);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.patientId !== this.props.patientId) {
      this._fetchMedicalRecords(this.props.patientId);
      this.setState({
        patientId: this.props.patientId,
        patientInfo: this.props.patientInfo
      });
    }
  }

  handleTabChange(key) {
    this.setState({
      selectedTabId: key
    });
  }

  render() {
    var s = this.state;
    return (
      <div>
        <Tabs defaultActiveKey="1" onChange={this.handleTabChange}>
          <Tabs.TabPane tab="Patient Information" key="1">
            <PatientInformationView patientData={s.patientInfo} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Past Reports/Logs" key="2">
            <PatientLogsContainer patientData={s.patientData} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Conduct Test" key="3">
            <PatientTestView
              patientId={s.patientData && s.patientData.id}
              history={this.props.history}
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}

export default PatientsSummaryView;
