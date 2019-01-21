import React, { Component } from 'react';
import {
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Line,
    Legend,
    Tooltip
} from 'recharts';

class VerticalLineChart extends Component {
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
    //TODO: make this more modular, allow params for color, dynamic length inputs, 'selections', configs...
    _buildLines(data) {
        return data.map((y, i) =>
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
        );
    }

    render() {
        var s = this.state;
        var data = [];
        s.data.forEach((e) => data.push({name: e[6], ax: e[0], ay: e[1], az: e[2], gx: e[3], gy: e[4], gz: e[5]}))
        return(         
            <LineChart width={750} height={350} data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis/>
                <Tooltip />
                <Legend />
                {/* {this._buildLines(data)} */}
                <Line type="monotone" dataKey="ax" stroke="lightpink" />
                <Line type="monotone" dataKey="ay" stroke="lightpink" />
                <Line type="monotone" dataKey="az" stroke="lightpink" />
                <Line type="monotone" dataKey="gx" stroke="lightblue" />
                <Line type="monotone" dataKey="gy" stroke="lightblue" />
                <Line type="monotone" dataKey="gz" stroke="lightblue" />


            </LineChart>
        );
    }
}
export default VerticalLineChart;