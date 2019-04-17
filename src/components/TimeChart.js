import React, { Component } from 'react'
import { View } from 'react-native'
import { BarChart, Grid } from 'react-native-svg-charts'
import { Text, Line, G } from 'react-native-svg';
import { colors } from './../Constants'

class TimeChart extends Component {
    constructor(props) {
        super(props)

        this.Background = this.Background.bind(this)
    }

    Background({x, y, data, ticks, width, height}) {
        let dividers = this.props.verticalDividers  || [0, 6, 12, 18, 24]
        let titles = this.props.titles ||
            [{ x: 0, text: '12 AM' }, { x: 6, text: '6 AM' }, { x: 12, text: '12 PM' }, { x: 18, text: '6 PM' }]
        return (
            <G>
                {
                    titles &&
                    titles.map((title, index) => (
                        <Text
                        key={index}
                        fill={colors.chartTitle}
                        stroke={colors.chartTitle}
                        fontSize={12}
                        fontFamily='SFProText'
                        x={x(title.x)+10}
                        y={10}
                    >{title.text}</Text>
                    ))

                }
                { dividers &&
                    dividers.map((divider, index) => (
                        <Line
                        key={index}
                        x1={x(divider)}
                        y1='0'
                        x2={x(divider)}
                        y2={y(0)}
                        stroke={colors.chartDivider}
                        strokeWidth='1'
                        strokeDasharray='5'
                    />))
                }
                <Line
                    x1='0'
                    y1={y(0)}
                    x2={width}
                    y2={y(0)}
                    stroke={colors.black}
                    strokeWidth='2'
                />
            </G>
        )
    }

    render() {
        const data = this.props.data || Array(24).fill(0)
        const fill = colors.chartBar
        return (
            <View style={{width: '100%'}}>
                <BarChart
                    style={{ height: 200 }}
                    data={data}
                    svg={{ fill: fill, rx: 5, ry: 5 }}
                    contentInset={{ top: 30, bottom: 30 }}
                    yMin={0}
                    contentInset={{ top: 0, left: 0, right: 2, bottom: 0 }}
                >
                    <this.Background></this.Background>
                </BarChart>
            </View>

        )
    }

}

export default TimeChart