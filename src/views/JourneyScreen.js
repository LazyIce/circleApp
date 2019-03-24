import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { Header, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'
import { colors } from './../Constants'
import JourneyMap from './../components/JourneyMap';
import { TabView, SceneMap } from 'react-native-tab-view';
import NewCityList from './../components/NewCityList'
import VisitedCityList from './../components/VisitedCityList'
import CharityList from './../components/CharityList'

class JourneyScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
    }

    render() {
        return (
            <View style={[styles.container, {backgroundColor: colors.white}]}>
                <Header
                    leftComponent={<Icon name='angle-left' size={30} stye={{color: colors.black}}></Icon>}
                    centerComponent={{ text: 'Journey',
                        style: [styles.journeyText, { color: colors.black, fontSize: '22px' }]
                    }}
                    containerStyle={{backgroundColor: colors.white}}
                ></Header>
                <ScrollView style={{flex: 1}}>
                    <View style={[styles.container, { alignItems: 'center', height: 300 }]}>
                        <View style={[styles.startCountContainer, { zIndex: 1, position: 'absolute', top: 17 }]}>
                            <Text style={styles.starCount}>
                                {this.state.startCount}
                            </Text>
                            <Icon name="star" size={18} color={colors.starColor} />
                        </View>

                        <JourneyMap styles={{ zIndex: 0 }} />
                    </View>
                    <View style={styles.container}>
                        <TabView
                            navigationState={this.state}
                            renderScene={SceneMap({
                                first: NewCityRoute,
                                second: VisitedCityRoute,
                                third: CharityRoute,
                            })}
                            onIndexChange={index => this.setState({ index })}
                        />
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const NewCityRoute = () => {
    return (
        <View style={styles.scene} >
            <NewCityList cities={
                [
                    {
                        name: 'Atlanta', totalCharityGoal: '20k', curCharityGoal: '229',
                        pic: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
                        subTitle: 'Charity Goal 229/30k'
                    },
                    {
                        name: 'Atlanta', totalCharityGoal: '20k', curCharityGoal: '229',
                        pic: 'https://facebook.github.io/react-native/docs/assets/favicon.png', subTitle: 'Charity Goal 229/30k'
                    }, {
                        name: 'Atlanta', totalCharityGoal: '20k', curCharityGoal: '229',
                        pic: 'https://facebook.github.io/react-native/docs/assets/favicon.png', subTitle: 'Charity Goal 229/30k'
                    }]
                } />
        </View>
    )
}
const VisitedCityRoute = () => {
    return (
        <View style={styles.scene}>
            <VisitedCityList cities={
                [
                    {
                        name: 'Atlanta', totalCharityGoal: '20k', curCharityGoal: '229',
                        pic: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
                        subTitle: 'Charity Goal 229/30k',
                        description: 'Completed 7 hours 30 minutes away from phone, gained 450 stars. Helped local charity 6 times and achieved 1 charity goal during your last visit',
                        postcards: ['https://facebook.github.io/react-native/docs/assets/favicon.png']
                    },
                    {
                        name: 'Atlanta', totalCharityGoal: '20k', curCharityGoal: '229',
                        pic: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
                        subTitle: 'Charity Goal 229/30k',
                        description: 'Completed 7 hours 30 minutes away from phone, gained 450 stars. Helped local charity 6 times and achieved 1 charity goal during your last visit',
                        postcards: ['https://facebook.github.io/react-native/docs/assets/favicon.png']
                    }, {
                        name: 'Atlanta', totalCharityGoal: '20k', curCharityGoal: '229',
                        pic: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
                        subTitle: 'Charity Goal 229/30k',
                        description: 'Completed 7 hours 30 minutes away from phone, gained 450 stars. Helped local charity 6 times and achieved 1 charity goal during your last visit',
                        postcards: ['https://facebook.github.io/react-native/docs/assets/favicon.png']
                    }]} />
        </View>
    )
}

const CharityRoute = () => {
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