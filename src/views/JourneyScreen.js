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
import { getCityStates, getCurrentUserInfo, getAchievementList, travelToCity, unlockCity} from '../APIs';

class JourneyScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: 'Journey',
            index: 0,
            routes: [
                { key: 'first', title: 'NEW CITY' },
                { key: 'second', title: 'VISITED CITY' }
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

    _fetchData = async () => {
        let cityStates = await getCityStates();
        let userInfo = await getCurrentUserInfo();
        let achievements = await getAchievementList();
        let newCities = [];
        let visitedCities = [];
        for (var i = 0; i < cityStates.length; i++) {
            var city = cityStates[i];
            city['subTitle'] = 'Charity Goal ' + city['curCharityGoal'] + '/' + city['totalChariyGoal']
            if (city.state === 'AFFORDABLE') {
                newCities.push(city);
            } else if (city.state === 'CURRENT_CITY' || city.state === 'VISITED') {
                visitedCities.push(city);
            }
        }

        this.setState({
            starCount: userInfo.curStar,
            routes: [
                {key: 'first', title: 'NEW CITY ' + newCities.length},
                {key: 'second', title: 'VISITED CITY ' + visitedCities.length}
            ],
            map: {
                locations: cityStates
            },
            newCities: {
                cities: newCities
            },
            visitedCities: {
                cities: visitedCities,
                achievements: achievements
            }
        })
    }

    componentDidMount = async () => {
        this._fetchData()
        this.willFocus = this.props.navigation.addListener(
            'didFocus',
            () => {
                this._fetchData();
            }
        )
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

    travelCallback = async (e, city) => {
        await travelToCity(city.cityId);
        const {navigate} = this.props.navigation
        navigate('Home')
        DeviceEventEmitter.emit('refreshTimerScreen', {})
    }

    unlockCallback = async(e, city) => {
        await unlockCity(city.cityId);
        await travelToCity(city.cityId);
        const {navigate} = this.props.navigation
        navigate('Home')
        DeviceEventEmitter.emit('refreshTimerScreen', {})
    }

    NewCityRoute = () => {
        return (
            <View style={styles.scene} >
                <NewCityList unlockCallback={this.unlockCallback} locateCallback={this.locateCallback}
                {...this.props} {...this.state.newCities}/>
            </View>
        )
    }

    VisitedCityRoute = () => {
        return (
            <View style={styles.scene}>
                <VisitedCityList travelCallback={this.travelCallback} locateCallback={this.locateCallback}
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