import React, { Component } from 'react';
import {
    VictoryPie,
    VictoryAnimation,
    VictoryLabel
} from 'victory';

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
        var labelText = s.thresholds.find((e) => value  < e.level)['label'];

        var visData = [
            {x: 1, y: value },
            {x: 0, y: maxValue - value }
        ];

        return(         
            <svg viewBox="0 0 400 400">
                <VictoryPie
                standalone={false}
                width={400}
                height={400}
                innerRadius={125}
                cornerRadius={25}
                labels={() => null}
                data={visData}
                style={{
                    data: {
                        fill: (d) => {
                            var threshold = s.thresholds.find((e) => d.y < e.level);
                            const color = threshold ? threshold['color'] : "transparent";
                            return d.x === 1 ? color : "transparent";
                        }
                    }
                }}
                />
                <VictoryAnimation
                data={value}
                >
                {(value) => {
                    return(
                        <VictoryLabel
                        textAnchor='middle'
                        x="50%" y="45%"
                        verticalAnchor='middle'
                        text={`${value}`+suffix}
                        style={{fontSize: '100'}}
                        />  
                    )
                }}
                </VictoryAnimation>
                <VictoryLabel
                textAnchor='middle'
                x="50%" y="65%"
                verticalAnchor='middle'
                text={labelText}
                style={{fontSize: '50'}}
                />  
            </svg>
        );
    }
}
//newProps.y < 30 ? 'LOW' : newProps.y < 60 ? 'MEDIUM' : 'HIGH'
export default CircularBar;