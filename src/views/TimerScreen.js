import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { API } from 'aws-amplify'
import TimerHeader from './../components/TimerHeader'
import CircularSlider from './../components/CircularSlider'
import { DeviceEventEmitter } from 'react-native'
import { getCurrentUserInfo, getCity, addTravelTime } from './../APIs'

const BASE_WIDTH = Dimensions.get('window').width
const BASE_HEIGHT = Dimensions.get('window').height

class TimerScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stars: 0,
            currentCity: '***',
            cityCompleting: '0',
            cityCompleted: '0',
        }
    }

    _fetchData = async () => {
        let userInfo = await getCurrentUserInfo();
        let cityId = userInfo['curCityId'];
        let cityInfo = await getCity(cityId);
        console.log(cityInfo)

        this.setState({
            stars: userInfo.curStar || 0,
            currentCity: cityInfo.name || '***',
            cityCompleting: cityInfo.curCharityGoal || '0',
            cityCompleted: cityInfo.totalChariyGoal || '0',
            sliderImage: cityInfo.imageCircle
        })
    }

    componentDidMount = async () => {
        this._fetchData()
        DeviceEventEmitter.addListener('refreshTimerScreen', this._fetchData)
    }

    timerSucceedCallback = async (addedStar) => {
        await addTravelTime(addedStar);
        DeviceEventEmitter.emit('refreshTimerScreen', {})
    }

    render() {
        return (
            <View style={styles.container}>
                <TimerHeader {...this.props} star={this.state.stars} />
                <View style={styles.cityContainer}>
                    <Text style={styles.cityText}>{this.state.currentCity}</Text>
                    <Text style={styles.completeText}>{this.state.cityCompleted?
                        this.state.cityCompleting + '/' + this.state.cityCompleted + ' charity goal': ''}</Text>
                </View>
                <View style={styles.sliderContainer}>
                    <CircularSlider image={this.state.sliderImage} timerSucceedCallback={this.timerSucceedCallback}/>
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
