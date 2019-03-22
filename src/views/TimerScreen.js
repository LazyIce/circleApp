import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, StatusBar } from 'react-native'
import CircularSlider from './../components/CircularSlider'
import FAIcon from 'react-native-vector-icons/FontAwesome'

const STATUS_BAR = 25
const BASE_WIDTH = Dimensions.get('window').width
const BASE_HEIGHT = Dimensions.get('window').height

class TimerScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            city: 'Atlanta',
            cityCompleting: '232',
            cityCompleted: '30k',
            star: 200
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.navBar}>
                    <TouchableOpacity>
                        <FAIcon name='bars' size={30} color={'#FFF'} />
                    </TouchableOpacity>
                    <Text style={styles.starText}>
                        {this.state.star + ' '}
                        <FAIcon name='star' size={18} color={'#FFFF00'} />
                    </Text>
                    <Text>{'     '}</Text>
                </View>
                <View style={styles.cityContainer}>
                    <Text style={styles.cityText}>{this.state.city}</Text>
                    <Text style={styles.completeText}>{this.state.cityCompleting}/{this.state.cityCompleted} charity goal</Text>
                </View>
                <View style={styles.sliderContainer}>
                    <CircularSlider />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: BASE_WIDTH,
        height: BASE_HEIGHT,
        backgroundColor: '#FFAC31'
    },
    navBar: {
        marginTop: STATUS_BAR,
        height: BASE_HEIGHT / 10,
        paddingLeft: 25,
        paddingRight: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    starText: {
        color: '#FFF', 
        height: 25,
        fontSize: 18,
        backgroundColor: '#FFD700',
        paddingTop: 2,
        paddingLeft: 25,
        paddingRight: 25,
        borderRadius: 10,
        overflow: 'hidden'
    },
    cityContainer: {
        width: BASE_WIDTH,
        height: BASE_HEIGHT / 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cityText: {
        color: '#FFFFFF',
        fontSize: 40
    },
    completeText: {
        color: '#FFFFFF',
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
