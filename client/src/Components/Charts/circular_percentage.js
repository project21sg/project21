import React, { Component } from 'react';
import {
    VictoryPie,
    VictoryAnimation,
    VictoryLabel
} from 'victory';

class CircularPercentage extends Component {
    constructor(props) {
        super();
        this.state = {
            data: props.percent
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.data !== this.props.percent && this.props.percent instanceof Number) {
            this.setState({
                data : this.props.percent
            })
        }
    }

    render() {
        var s = this.state;
        var percentage = s.data ? s.data : 0;
        var visData = [
            {x: 1, y: percentage},
            {x: 0, y:100 - percentage}
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
                            const color = d.y < 30 ? "green" : "red";
                            return d.x === 1 ? color : "transparent";
                        }
                    }
                }}
                />
                <VictoryAnimation
                data={visData[0]}
                >
                {(newProps) => {
                    return(
                        <VictoryLabel
                        textAnchor='middle'
                        x='50%' y='45%'
                        verticalAnchor='middle'
                        text={`${newProps.y}%`}
                        style={{fontSize: '100'}}
                        />  
                    )
                }}
                </VictoryAnimation>
                <VictoryAnimation
                data={visData[0]}
                >
                {(newProps) => {
                    return(
                        <VictoryLabel
                        textAnchor='middle'
                        x='50%' y='65%'
                        verticalAnchor='middle'
                        text={newProps.y < 30 ? 'LOW' : newProps.y < 60 ? 'MEDIUM' : 'HIGH'}
                        style={{fontSize: '40'}}
                        />
                    )
                }}
                </VictoryAnimation>
            </svg>
        );
    }
}

export default CircularPercentage;