import React, { Component } from 'react';
import {
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Bar,
    LabelList
} from 'recharts';

class HoriLabeledBar extends Component {
    constructor(props) {
        super();
        this.state = {
            data: props.data
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.data !== this.props.data && this.props.data instanceof Array) {
            this.setState({
                data  : this.props.data,
            })
        }
    }

    render() {
        var s = this.state;
        var data = s.data.map((e) => {
            return {
                name: e.label, 
                value: e.value
            };
        })
        return(         
            <BarChart layout='horizontal' width={350} height={200} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis dataKey="value" />
                <XAxis dataKey="name"/>
                <Bar barSize={30} layout="horizontal" dataKey="value" fill="green">
                <LabelList dataKey="value" position="top" /> 
                </Bar>
            </BarChart>
        );
    }
}
export default HoriLabeledBar;