import React, { Component } from 'react';
import {
    Button,
    Tab,
    Tabs,
    Card,
    Text
} from '@blueprintjs/core';
import {LineChart, Line, XAxis, YAxis, CartesianGrid} from 'recharts';
import XLSX from 'xlsx';

class PatientReportsView extends Component {
    constructor(props) {
        super();
        this.state = {
            report: props.report
        }
        this.generatePatientReportsListView = this.generatePatientReportsListView.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({
            report: props.report,
            data: props.report && this.sheet2arr(props.report[2].Sheets[props.report[2].SheetNames[0]])
        })
    }

    generatePatientReportsListView() {
        return this.state.report && <Text>{this.state.report[0]}</Text>;
    }

    sheet2arr(sheet){
        var result = [];
        var row;
        var rowNum;
        var colNum;
        var range = XLSX.utils.decode_range(sheet['!ref']);
        for(rowNum = range.s.r; rowNum <= range.e.r; rowNum++){
           row = [];
            for(colNum=range.s.c; colNum<=range.e.c; colNum++){
               var nextCell = sheet[
                  XLSX.utils.encode_cell({r: rowNum, c: colNum})
               ];
               if( typeof nextCell === 'undefined' ){
                  row.push(void 0);
               } else row.push(nextCell.w);
            }
            result.push(row);
        }
        return result;
     };

    render() {
        var s = this.state;
        var p = s.patientData;
        return(
            <Card style={{height: '10000'}}>
                {this.generatePatientReportsListView()}
                {s.report && 
                    <LineChart width={800} height={800} data={this.state.data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Line type="monotone" dataKey="0" stroke="#6644d8" />
                        <Line type="monotone" dataKey="1" stroke="#6644e8" />
                        <Line type="monotone" dataKey="2" stroke="#6644f8" />
                        <Line type="monotone" dataKey="3" stroke="#4488d8" />
                        <Line type="monotone" dataKey="4" stroke="#448888" />
                        <Line type="monotone" dataKey="5" stroke="#448828" />
                    </LineChart>
                }
            </Card>
        );
    }
}

export default PatientReportsView;