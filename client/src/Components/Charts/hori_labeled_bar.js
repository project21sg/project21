import React, { Component } from 'react';
import {
    VictoryChart,
    VictoryBar,
    VictoryLabel,
} from 'victory';

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
        return(         
            <VictoryChart
            height={200}
            padding={{ left: 100 }}
            domainPadding={{ y: 50 }}
            >
                <VictoryBar horizontal
                    height={200}
                    barWidth={20}
                    data={ s.data.map((x) => {return {x: x.label, y: x.value}})  }
                    labels={ (d) => d.y }
                    labelComponent={<VictoryLabel dx={-40}/>}
                    style={{
                        data: { fill: "green" },
                        labels: {fontSize: 20, fill: 'white'}
                    }}
                />
            </VictoryChart>
        );
    }
}
export default HoriLabeledBar;