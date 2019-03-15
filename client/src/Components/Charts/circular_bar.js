import React, { Component } from 'react';
import {
    PieChart,
    Pie,
    Cell,
    Label,
} from 'recharts';

class CircularBar extends Component {
    constructor(props) {
        super();
        this.state = {
            value: props.value,
            maxValue: props.maxValue,
            suffix: props.suffix,
            thresholds: props.thresholds.sort((e, n) => e.level - n.level),
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.value !== this.props.value && this.props.value instanceof Number) {
            this.setState({
                value  : this.props.value,
                thresholds: this.props.thresholds.sort((e, n) => e.level - n.level),
            })
        }
    }

    render() {
        var s = this.state;
        var maxValue = s.maxValue;
        var value  = s.value ? s.value : 0;
        var suffix = s.suffix;
        var threshold = s.thresholds.find((e) => value  < e.level);
        var labelText = threshold['label'];
        var cellColor = threshold['color'];

        var visData = [
            {name: 1, value: value },
            {name: 0, value: maxValue - value }
        ];

        return(         
            <PieChart width={200} height={200} >
                <Pie
                dataKey={labelText}
                data={visData}
                cx={"40%"} 
                cy={"50%"} 
                innerRadius={"50%"}
                outerRadius={"65%"} 
                fill="#8884d8"
                paddingAngle={0}
                >
                    <Cell fill={cellColor}/>
                    <Cell fill={'transparent'}/>
                    <Label position='center'>{value+suffix+` ${labelText}`}</Label>
                    {/* <Label position='outsideCenter'>{labelText}</Label> */}
                </Pie>
            </PieChart>
        );
    }
}
//newProps.y < 30 ? 'LOW' : newProps.y < 60 ? 'MEDIUM' : 'HIGH'
export default CircularBar;