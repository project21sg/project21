import React, { Component } from 'react';
import {
    VictoryChart,
    VictoryLine,
    VictoryLegend,
} from 'victory';

class LineChart extends Component {
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
        var lineData = [];
        for(var i= 0; i<6; i++) {
            lineData.push(data.map((e) => {
                return {
                    x: e[6], y: e[i] 
                };
            }));
        };
        return lineData.map((y, i) =>
            <VictoryLine
            interpolation="natural"
            data={y}
            style={{
                data: {
                    stroke: i >= 3 ? 'lightblue' : 'pink'
                }
            }}
            />
        );
    }

    render() {
        var s = this.state;
        return(         
            <VictoryChart
            minDomain={{y: -5.0}}
            maxDomain={{y: 5.0}}
            >
                { this._buildLines(s.data) }
                <VictoryLegend 
                title="Legend"
                x={300} y={10}
                data={[
                    { name: "Gyroscope", symbol: { fill: "lightpink" } },
                    { name: "Accelerometer", symbol: { fill: "lightblue" } },
                  ]}
                />
            </VictoryChart>
        );
    }
}
export default LineChart;