import React, { Component } from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  Legend,
  Tooltip
} from "recharts";

class VerticalLineChart extends Component {
  constructor(props) {
    super();
    this.state = {
      data: props.data,
      height: props.height,
      width: props.width
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.data !== this.props.data &&
      this.props.data instanceof Array
    ) {
      this.setState({
        data: this.props.data,
        height: this.props.height,
        width: this.props.width
      });
    }
  }
  //TODO: make this more modular, allow params for color, dynamic length inputs, 'selections', configs...
  _buildLines(data) {
    return data.map((y, i) => (
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
    ));
  }

  render() {
    const s = this.state;
    const height = this.state.height;
    const width = this.state.width;

    return (
      <ResponsiveContainer height={height} width={width}>
        <LineChart
          data={s.data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
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
      </ResponsiveContainer>
    );
  }
}
export default VerticalLineChart;
