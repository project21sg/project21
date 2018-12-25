import React, { Component } from 'react';
import {
    Row,
    Col,
    List,
} from 'antd';
import PatientsSummaryView from './view_patients_summary';

class CheckPatientsView extends Component {
    constructor(props) {
        super();
        this.state = {
            patients: []
        }

        this.handlePatientSelect = this.handlePatientSelect.bind(this);
        this.generatePatientsListView = this.generatePatientsListView.bind(this);
    }

    _retrievePatients() {
        fetch('http://localhost:9000/api/patients/all', {
            method: 'get',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => resp.json())
        .then((json) => {
            console.log(json);

            this.setState({
                patients: json.data,
                selectedPatientId: json.data[0].id,
                selectedPatientData: json.data[0]
            });
        });
    }

    componentDidMount() {
        this._retrievePatients();
    }

    handlePatientSelect(id) {
        this.setState({
            selectedPatientId: id,
            selectedPatientData: this.state.patients[id]
        })
    }

    /* TODO: slightly hacky, possible to create custom view logic component for this */
    generatePatientsListView() {
        return (
            <List
            itemLayout="horizontal"
            dataSource={this.state.patients}
            renderItem={p => (
                <List.Item 
                onClick={() => this.handlePatientSelect(p.id)}>
                    <List.Item.Meta
                    title={this.state.selectedPatientId == p.id? p.name : ''}
                    description={this.state.selectedPatientId != p.id? p.name : ''}
                    />
                </List.Item>
            )}
            />
        )
    }

    render() {
        var s = this.state;
        return(
            <div style={{margin: "5px 5px 5px 5px", padding: "0px 20px", height: "100vh", width:"100%", background: 'white'}}>
                <Row>
                    <Col span={3} style={{borderRight: "1px solid grey", paddingTop: "10px", height: "100vh"}}>
                        <span style={{fontWeight: 'bold', fontSize: 20}}>Patients</span>
                        { this.generatePatientsListView() }
                    </Col>
                    <Col span={21}>
                        <PatientsSummaryView patientData={s.selectedPatientData}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CheckPatientsView;