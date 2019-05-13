import React, { Component } from "react";
import {
  PolarAngleAxis,
  RadialBar,
  ResponsiveContainer,
  RadialBarChart
} from "recharts";

class CircularBar extends Component {
  constructor(props) {
    super();
    this.state = {
      value: props.value,
      maxValue: props.maxValue,
      suffix: props.suffix,
      thresholds: props.thresholds.sort((e, n) => e.level - n.level),
      height: props.height,
      width: props.width
    };
  }

  componentDidUpdate(prevProps) {
    console.log(
      `${prevProps.value !== this.props.value &&
        this.props.value instanceof Number} ok`
    );
    if (prevProps.value !== this.props.value) {
      this.setState({
        value: this.props.value,
        thresholds: this.props.thresholds.sort((e, n) => e.level - n.level)
      });
    }
  }

  render() {
    const s = this.state;
    const maxValue = s.maxValue;
    const value = s.value ? s.value : 0;
    const suffix = s.suffix;
    const threshold = s.thresholds.find(e => value < e.level);
    const labelText = threshold["label"];
    const cellColor = threshold["color"];

    const height = s.height;
    const width = s.width;

    const visData = [{ name: 1, value: value }];

    return (
      <ResponsiveContainer width={width} height={height}>
        <RadialBarChart
          cx={"50%"}
          cy={"50%"}
          innerRadius={"80%"}
          outerRadius={"90%"}
          barSize={8}
          data={visData}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, maxValue]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            background
            clockWise
            dataKey="value"
            cornerRadius={"50%"}
            fill={cellColor}
          />
          <text
            x={"50%"}
            y={"50%"}
            textAnchor="middle"
            dominantBaseline="middle"
            className="progress-label"
            fontSize={40}
          >
            {value + suffix}
          </text>
          <text
            x={"50%"}
            y={"70%"}
            textAnchor="middle"
            dominantBaseline="middle"
            className="progress-label"
          >
            {labelText}
          </text>
        </RadialBarChart>
      </ResponsiveContainer>
    );
  }
}
//newProps.y < 30 ? 'LOW' : newProps.y < 60 ? 'MEDIUM' : 'HIGH'
export default CircularBar;
