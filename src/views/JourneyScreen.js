import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, Dimensions, Modal } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Button } from 'react-native-elements'
import Amplify, { API } from 'aws-amplify'
import { colors, defaultMapRegion } from './../Constants'
import JourneyMap from './../components/JourneyMap';
import { TabView, SceneMap } from 'react-native-tab-view';
import NewCityList from './../components/NewCityList'
import VisitedCityList from './../components/VisitedCityList'
import MyHeader from './../components/MyHeader'
import { getScreenRegion } from './../Constants'
import { DeviceEventEmitter } from 'react-native'

BASE_WIDTH = Dimensions.get("window").width;
BASE_HEIGHT = Dimensions.get("window").height;

class JourneyScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: 'Journey',
            index: 0,
            routes: [
                { key: 'first', title: 'NEW CITY 0' },
                { key: 'second', title: 'VISITED CITY 0' }
            ],
            unlockModal: false,
            unlockCity: "",
            unlockCityStar: "",
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
        this.popUnlockModal(false);
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
                <NewCityList popUnlockModal={(unlockModal, unlockCity) => this.popUnlockModal(unlockModal, unlockCity)} locateCallback={this.locateCallback}
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

    popUnlockModal(unlockModal, city) {
        if (city !== undefined && city !== null)
            this.setState({
                unlockCity: city
            });
        this.setState({
            unlockModal: unlockModal
        });
    }

    render() {
        return (
            <View style={[styles.container, {backgroundColor: colors.white}]}>
                <MyHeader {...this.props} title={this.state.title} />
                <Modal  
                    animationType={'fade'}
                    transparent={true}
                    visible={this.state.unlockModal}
                    onRequestClose={()=>{}}
                >
                    <View style={styles.modal}>
                        <View style={styles.content}>
                            <View style={styles.title}>
                                <Text style={{fontSize: 20}}>Unlock and travel to</Text>
                            </View>
                            <View style={styles.title}>
                                <Text style={{fontSize: 25, fontWeight: '500'}}>{this.state.unlockCity}</Text>
                            </View>
                            <View style={styles.title}>
                                <Text style={{fontSize: 20}}>cost you</Text>
                            </View>
                            <View style={styles.title}>
                                <Text style={styles.starText}>
                                    {this.state.unlockCityStar + ' '}
                                    <Icon name='star' size={18} color={'#C5AFDD'} />
                                </Text>
                            </View>
                            <View style={styles.btnGroup}>
                                <Button title="Cancel" buttonStyle={styles.button} onPress={() => {this.popUnlockModal(false)}} />
                                <Button title="Unlock" buttonStyle={styles.button} onPress={()=> {
                                    this.travelCallback(e, this.state.unlockCity);
                                }} />
                            </View>
                        </View>
                    </View>
                </Modal>
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
    modal: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        width: BASE_WIDTH - 60,
        height: BASE_HEIGHT / 2.5,
        backgroundColor: '#FFF',
        borderRadius: 5,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    title: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    btnGroup: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: "center"
    },
    button: {
        width: BASE_WIDTH / 4,
        backgroundColor: '#A57AD4',
    },
    starText: {
        color: '#000', 
        height: 25,
        fontSize: 18,
        backgroundColor: '#F0F0F0',
        paddingTop: 2,
        paddingLeft: 25,
        paddingRight: 25,
        borderRadius: 10,
        overflow: 'hidden'
    }
})

export default JourneyScreen