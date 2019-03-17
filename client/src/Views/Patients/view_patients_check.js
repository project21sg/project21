import React, { Component } from "react";
import { Row, Col, List, Button } from "antd";
import PatientsSummaryView from "./view_patients_summary";

class CheckPatientsView extends Component {
  constructor(props) {
    super();
    this.state = {
      patients: null
    };
    this.handlePatientSelect = this.handlePatientSelect.bind(this);
    this.generatePatientsListView = this.generatePatientsListView.bind(this);
  }

  /* TODO: should refactor data logic into a container component */
  _retrievePatients() {
    fetch(`http://${window.location.hostname}:9000/api/patient/all`, {
      method: "get",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          patients: json.data,
          selectedPatientData: json.data ? json.data[0] : null,
          selectedPatientId: json.data[0] ? json.data[0]._id : ""
        });
        console.log(json.data);
      })
      .catch(err => console.log(err));
  }

  _deletePatient(id) {
    console.log("deleting " + id);
    fetch(`http://${window.location.hostname}:9000/api/patient/${id}`, {
      method: "delete",
      mode: "cors"
    })
      .then(resp => resp.json())
      .then(json => console.log(json))
      .then(() => this._retrievePatients()) //refresh data
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this._retrievePatients();
  }

  handlePatientSelect(id) {
    this.setState({
      selectedPatientId: id,
      selectedPatientData: this.state.patients.find(p => p._id === id)
    });
  }

  /* TODO: slightly hacky, possible to create custom view logic component for this */
  generatePatientsListView(data) {
    return (
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={p => (
          <List.Item onClick={() => this.handlePatientSelect(p._id)}>
            <List.Item.Meta
              title={this.state.selectedPatientId === p._id ? p.name : ""}
              description={this.state.selectedPatientId !== p._id ? p.name : ""}
            />
            <Button
              type="danger"
              size="small"
              onClick={() => this._deletePatient(p._id)}
            >
              X
            </Button>
          </List.Item>
        )}
      />
    );
  }

  render() {
    var s = this.state;
    return (
      <div>
        <Row
          style={{
            margin: "5px 5px 5px 5px",
            padding: "0px 20px",
            height: "100%",
            width: "100%",
            background: "white"
          }}
        >
          <Col
            span={4}
            style={{
              paddingTop: "10px",
              height: "100vh"
            }}
          >
            <span style={{ fontWeight: "bold", fontSize: 20 }}>Patients</span>
            {s.patients && this.generatePatientsListView(s.patients)}
          </Col>
          <Col
            span={20}
            style={{ height: "100eh", borderLeft: "1px solid lightgrey" }}
          >
            {
              <PatientsSummaryView
                patientData={s.selectedPatientData}
                history={this.props.history}
              />
            }
          </Col>
        </Row>
      </div>
    );
  }
}

export default CheckPatientsView;
