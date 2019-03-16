import React, { Component } from 'react';
import {
    ResponsiveContainer,
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
            data: props.data,
            height: props.height,
            width: props.width,
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.data !== this.props.data && this.props.data instanceof Array) {
            this.setState({
                data  : this.props.data,
                height: this.props.height,
                width: this.props.width,
            })
        }
    }

    render() {
        const s = this.state;
        const height = this.state.height;
        const width = this.state.width;
        const data = s.data.map((e) => {
            return {
                name: e.label, 
                value: e.value
            };
        })
        return(         
            <ResponsiveContainer height={height} width={width}>
                <BarChart layout='horizontal' data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <YAxis dataKey="value" />
                    <XAxis dataKey="name"/>
                    <Bar barSize={30} layout="horizontal" dataKey="value" fill="green">
                    <LabelList dataKey="value" position="top" /> 
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        );
    }
}
export default HoriLabeledBar;