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
        fetch('http://localhost:9000/api/patient/all', {
            method: 'get',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => resp.json())
        .then((json) => {
            this.setState({
                patients: json.data,
                selectedPatientData: json.data ? json.data[0] : null,
                selectedPatientId: json.data ? json.data[0]._id : '',
            });
        });
    }

    componentDidMount() {
        this._retrievePatients();
    }

    handlePatientSelect(id) {
        this.setState({
            selectedPatientId: id,
            selectedPatientData: this.state.patients.find((p) => p._id === id)
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
                onClick={() => this.handlePatientSelect(p._id)}>
                    <List.Item.Meta
                    title={this.state.selectedPatientId === p._id? p.name : ''}
                    description={this.state.selectedPatientId !== p._id? p.name : ''}
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
                    <Col span={4} style={{borderRight: "1px solid grey", paddingTop: "10px", height: "100vh"}}>
                        <span style={{fontWeight: 'bold', fontSize: 20}}>Patients</span>
                        { this.generatePatientsListView() }
                    </Col>
                    <Col span={20}>
                        {
                            s.selectedPatientData 
                            ?  <PatientsSummaryView patientData={s.selectedPatientData}/>
                            :  <span style={{fontWeight: 'bold', fontSize: 10}}>No patient data to show.</span>
                            
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CheckPatientsView;