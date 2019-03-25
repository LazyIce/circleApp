import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { Header, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'
import { colors, defaultMapRegion } from './../Constants'
import JourneyMap from './../components/JourneyMap';
import { TabView, SceneMap } from 'react-native-tab-view';
import NewCityList from './../components/NewCityList'
import VisitedCityList from './../components/VisitedCityList'
import CharityList from './../components/CharityList'
import MyHeader from './../components/MyHeader'
import { rectBuilding } from './../img_path'

class JourneyScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: 'Journey',
            startCount: 240,
            newCityCount: props.newCityCount || 3,
            visitedCityCount: props.visitedCityCount || 5,
            charityCount: props.charityCount || 2,
            index: 0,
            routes: [
                { key: 'first', title: 'NEW CITY 3' },
                { key: 'second', title: 'CITY VISITED 5' },
                { key: 'third', title: 'CHARITY 2' },
            ],
        }

        this.props.locateCallback = this.locateCallback
        this.props.travelCallback = this.travelCallback
    }

    // city includes the longitude and latitude information
    locateCallback = (e, city) => {
        this.setState({
            mapRegion: defaultMapRegion
        })
        console.log('locateCallback')
    }

    travelCallback = (e, city) => {
        console.log('travelCallback')
    }

    NewCityRoute = () => {
        return (
            <View style={styles.scene} >
                <NewCityList {...this.props} cities={
                    [
                        {
                            name: 'Atlanta', totalCharityGoal: '20k', curCharityGoal: '229',
                            pic: rectBuilding,
                            subTitle: 'Charity Goal 229/30k',
                        },
                        {
                            name: 'Savannah', totalCharityGoal: '20k', curCharityGoal: '229',
                            pic: rectBuilding,
                            subTitle: 'Charity Goal 229/30k',
                        }, {
                            name: 'Atlanta', totalCharityGoal: '20k', curCharityGoal: '229',
                            pic: rectBuilding,
                            subTitle: 'Charity Goal 229/30k',
                        }]
                } />
            </View>
        )
    }
    VisitedCityRoute = () => {
        return (
            <View style={styles.scene}>
                <VisitedCityList {...this.props} cities={
                    [
                        {
                            name: 'Atlanta', totalCharityGoal: '20k', curCharityGoal: '229',
                            pic: rectBuilding,
                            subTitle: 'Charity Goal 229/30k',
                            description: 'Completed 7 hours 30 minutes away from phone, gained 450 stars. Helped local charity 6 times and achieved 1 charity goal during your last visit',
                            postcards: [rectBuilding, rectBuilding, rectBuilding, rectBuilding, rectBuilding, rectBuilding, rectBuilding]
                        },
                        {
                            name: 'Atlanta', totalCharityGoal: '20k', curCharityGoal: '229',
                            pic: rectBuilding,
                            subTitle: 'Charity Goal 229/30k',
                            description: 'Completed 7 hours 30 minutes away from phone, gained 450 stars. Helped local charity 6 times and achieved 1 charity goal during your last visit',
                            postcards: [rectBuilding]
                        }, {
                            name: 'Atlanta', totalCharityGoal: '20k', curCharityGoal: '229',
                            pic: rectBuilding,
                            subTitle: 'Charity Goal 229/30k',
                            description: 'Completed 7 hours 30 minutes away from phone, gained 450 stars. Helped local charity 6 times and achieved 1 charity goal during your last visit',
                            postcards: [rectBuilding]
                        }]} />
            </View>
        )
    }

    CharityRoute = () => {
        return (
            <View style={styles.scene}>
                <CharityList charities={
                    [
                        {
                            name: 'Atlanta',
                            subTitle: 'Charity Goal 229/30k',
                            state: 'COMPLETED',
                        },
                        {
                            name: 'Atlanta',
                            subTitle: 'Charity Goal 229/30k',
                            state: 'IN PROGRESS',
                        }
                    ]} />
            </View>
        )
    }


    render() {
        return (
            <View style={[styles.container, {backgroundColor: colors.white}]}>
                <MyHeader {...this.props} title={this.state.title} />
                <ScrollView style={{ flex: 1 }}>
                    <View style={[styles.container, { alignItems: 'center', height: 300 }]}>
                        <View style={[styles.startCountContainer, { zIndex: 1, position: 'absolute', top: 17 }]}>
                            <Text style={styles.starCount}>
                                {this.state.startCount}
                            </Text>
                            <Icon name="star" size={18} color={colors.starColor} />
                        </View>

                        <JourneyMap region={this.state.mapRegion} locations={[{woe_id: '2489314', state: 'CURRENT_CITY',name: 'Atlanta', starNeed: '220'}]} styles={{ zIndex: 0 }} />
                    </View>
                    <View style={styles.container}>
                        <TabView
                            navigationState={this.state}
                            renderScene={SceneMap({
                                first: this.NewCityRoute,
                                second: this.VisitedCityRoute,
                                third: this.CharityRoute,
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
    startCountContainer: {
        width: 108,
        height: 23,
        borderRadius: 11.5,
        backgroundColor: colors.starCountContainerBackground,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center'
    },
    journeyText: {
        fontFamily: 'Roboto',
    },
    starCount: {
        fontFamily: 'Roboto',
        fontSizes: 16,
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