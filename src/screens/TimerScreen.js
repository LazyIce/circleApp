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
            cityCompleted: '30k'
        }
    }

    onPressMenu() {
        this.props.navigation.navigate('DrawerOpen')
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.navBar}>
                    <TouchableOpacity onPress={ this.props.onMenuPress }>
                        <FAIcon name='bars' size={22} style={{ color: '#FFF' }} />
                    </TouchableOpacity>
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
        marginTop: STATUS_BAR
    },
    cityContainer: {
        marginTop: STATUS_BAR,
        width: BASE_WIDTH,
        height: BASE_HEIGHT / 5,
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
        height: BASE_HEIGHT / 5 * 4,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default TimerScreen