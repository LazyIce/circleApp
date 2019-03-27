import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { API } from 'aws-amplify'
import TimerHeader from './../components/TimerHeader'
import CircularSlider from './../components/CircularSlider'
import { DeviceEventEmitter } from 'react-native'

const BASE_WIDTH = Dimensions.get('window').width
const BASE_HEIGHT = Dimensions.get('window').height

class TimerScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stars: 0,
        }
    }

    _fetchData = () => {
        let apiName = 'circleApp'
        let path = '/info/object/:userId'
        API.get(apiName, path).then(response => {
            console.log(response)
            // response: {userId: , stars: , currentCity: }
            this.setState({
                stars: response.stars || 0,
                currentCity: response.currentCity || '',
                cityCompleting: '232',
                cityCompleted: '30k',
            })
        }).catch(error => {
            console.log(error)
        })
    }
    componentDidMount = () => {
        this._fetchData()
        DeviceEventEmitter.addListener('refreshTimerScreen', this._fetchData)
    }

    updateStarCount(count) {
        console.log(count)
        this.setState({stars: count})
    }

    timerSucceedCallback = (addedStar) => {
        let apiName = 'circleApp'
        let path = '/info'
        let newStar = this.state.stars || 0 + addedStar
        let currentCity = this.state.currentCity
        console.log('post data, newStar: ' + newStar)
        API.post(apiName, path, {
            body: {
                userId: '',
                stars: newStar,
                currentCity: currentCity
            }
        }).then(this.updateStarCount.bind(this, newStar)).catch(error => {
            console.log(error)
        })
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
                    <CircularSlider timerSucceedCallback={this.timerSucceedCallback}/>
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
