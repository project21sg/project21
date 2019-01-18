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
            domainPadding={{ y: 50 }}
            >
                <VictoryBar horizontal
                    barWidth={30}
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