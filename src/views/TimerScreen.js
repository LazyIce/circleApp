import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import TimerHeader from './../components/TimerHeader'
import CircularSlider from './../components/CircularSlider'

const BASE_WIDTH = Dimensions.get('window').width
const BASE_HEIGHT = Dimensions.get('window').height

class TimerScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            city: 'Atlanta',
            cityCompleting: '232',
            cityCompleted: '30k'
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TimerHeader {...this.props} star={199} />
                <View style={styles.cityContainer}>
                    <Text style={styles.cityText}>{this.state.city}</Text>
                    <Text style={styles.completeText}>{this.state.cityCompleting}/{this.state.cityCompleted} charity goal</Text>
                </View>
                <View style={styles.sliderContainer}>
                    <CircularSlider />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: BASE_WIDTH,
        height: BASE_HEIGHT,
        backgroundColor: '#FFF'
    },
    cityContainer: {
        width: BASE_WIDTH,
        height: BASE_HEIGHT / 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cityText: {
        color: '#000',
        fontSize: 40
    },
    completeText: {
        color: '#000',
        fontSize: 20
    },
    sliderContainer: {
        width: BASE_WIDTH,
        height: BASE_HEIGHT - BASE_HEIGHT / 8 - BASE_HEIGHT / 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default TimerScreen
