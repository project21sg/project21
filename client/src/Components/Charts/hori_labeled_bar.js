import React, { Component } from 'react';
import {
    VictoryChart,
    VictoryBar,
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
            domainPadding={{ y: 20 }}
            >
                <VictoryBar horizontal
                    barWidth={30}
                    style={{
                        data: { fill: "green" },
                    }}
                    data={ s.data.map((x) => {return {x: x.label, y: x.value}})  }
                />
            </VictoryChart>
        );
    }
}
export default HoriLabeledBar;