import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Amplify, { API } from 'aws-amplify'
import { colors, defaultMapRegion } from './../Constants'
import JourneyMap from './../components/JourneyMap';
import { TabView, SceneMap } from 'react-native-tab-view';
import NewCityList from './../components/NewCityList'
import VisitedCityList from './../components/VisitedCityList'
import MyHeader from './../components/MyHeader'
import { getScreenRegion } from './../Constants'
import { DeviceEventEmitter } from 'react-native'

class JourneyScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: 'Journey',
            index: 0,
            routes: [
                { key: 'first', title: 'NEW CITY 3' },
                { key: 'second', title: 'VISITED CITY 5' }
            ],
            startCount: 0,
            // the states for the display of tab titles
            tabTitles: {
                newCityCount: 0,
                visitedCityCount: 0,
            },
            // the states for the display of map
            map: {},
            // the states for the display of new cities
            newCities: {},
            // the states for the display of visited cities
            visitedCities: {}
        }
    }

    componentDidMount = () => {
        let apiName = 'circleApp'
        let path = '/journey'
        API.get(apiName, path).then(response => {
            let newCityCount = response.tabTitles.newCityCount
            let visitedCityCount = response.tabTitles.visitedCityCount
            response.routes = [
                {key: 'first', title: 'NEW CITY ' + newCityCount},
                {key: 'second', title: 'VISITED CITY ' + visitedCityCount},
            ]
            this.setState(response)
        }).catch(error => {
            console.log(error)
        })
    }

    // city includes the longitude and latitude information
    locateCallback = (e, city) => {
        this.setState((state, props) => ({
            map: {
                locations: state.map.locations,
                region: getScreenRegion([city]),
            }
        }))
    }

    travelCallback = (e, city) => {
        console.log(city)
        let apiName = 'circleApp'
        let path = '/info'
        let newStar = this.state.starCount - city.starNeed
        console.log('newStar: ' + newStar)
        let currentCity = city.name
        API.post(apiName, path, {
            body: {
                userId: '',
                stars: newStar,
                currentCity: currentCity
            }
        }).then(() => {
            const {navigate} = this.props.navigation
            navigate('Home')
            DeviceEventEmitter.emit('refreshTimerScreen',  {})
        }).catch(error => {
            console.log(error)
        })
    }

    NewCityRoute = () => {
        return (
            <View style={styles.scene} >
                <NewCityList travelCallback={this.travelCallback} locateCallback={this.locateCallback}
                {...this.props} {...this.state.newCities}/>
            </View>
        )
    }
    VisitedCityRoute = () => {
        return (
            <View style={styles.scene}>
                <VisitedCityList locateCallback={this.locateCallback}
                {...this.props} {...this.state.visitedCities}/>
            </View>
        )
    }

    render() {
        return (
            <View style={[styles.container, {backgroundColor: colors.white}]}>
                <MyHeader {...this.props} title={this.state.title} />
                <ScrollView style={{ flex: 1 }}>
                    <View style={[styles.container, { alignItems: 'center', height: 300 }]}>
                        <View style={[styles.starCountContainer, { zIndex: 1, position: 'absolute', top: 17 }]}>
                            <Text style={styles.starCount}>
                                {this.state.starCount}
                            </Text>
                            <Icon name="star" size={18} color={colors.starColor} />
                        </View>
                        <JourneyMap {...this.state.map} styles={{ zIndex: 0 }} />
                    </View>
                    <View style={styles.container}>
                        <TabView
                            navigationState={this.state}
                            renderScene={SceneMap({
                                first: this.NewCityRoute,
                                second: this.VisitedCityRoute
                            })}
                            onIndexChange={index => this.setState({ index })}
                        />
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        flexDirection: 'column',
        flex: 1,
        width: '100%',
    },
    starCountContainer: {
        width: 108,
        height: 23,
        borderRadius: 11.5,
        backgroundColor: colors.starCountContainerBackground,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center'
    },
    journeyText: {
    },
    starCount: {
        fontSize: 16,
        fontWeight: '300',
        fontStyle: 'normal',
        color: colors.starTextColor,
    },
    scene: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
})

export default JourneyScreen