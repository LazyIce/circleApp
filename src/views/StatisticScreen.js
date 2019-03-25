import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { ButtonGroup, Header } from 'react-native-elements';
import { API } from 'aws-amplify'
import VisitedMap from './../components/VisitedMap'
import CharityGoalList from './../components/CharityGoalList'
import TimeChart from './../components/TimeChart'
import { colors } from './../Constants';
import MyHeader from './../components/MyHeader'

class StatisticScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: 'Statistics',
            selectedIndex: 1,
            totalTime: '3h 20m',
            subTitile: '1h above average',
        }
        this.updateTimePeriod = this.updateTimePeriod.bind(this)
    }

    updateTimePeriod(selectedIndex) {
        this.setState({selectedIndex})
    }

    componentDidMount() {
        let apiName = 'circleApp'
        let path = '/statistics/today'
        API.get(apiName, path).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        });
    }

    render() {
        const timePeriods = ['All Time', 'Today', 'This Week', 'This Month']
        const { selectedIndex } = this.state
        return (
            <View style={styles.container}>
                <MyHeader {...this.props} title={this.state.title} />
                <ButtonGroup
                    onPress={this.updateTimePeriod}
                    selectedIndex={selectedIndex}
                    buttons={timePeriods}
                    containerStyle={{height: 35}}
                    selectedButtonStyle={{backgroundColor: colors.purple}}
                    textStyle={[styles.overviewText, {fontSize: '14px'}]}/>
                <ScrollView style={{flex: 1, marginBottom: 20}}>
                    <View style={[styles.container, styles.overviewSection, {height: 220, marginTop: 10}]}>
                        <Text style={[styles.overviewText, styles.overviewSectionTitle]}>
                            {'Places You\'ve Visited'}
                        </Text>
                        <View style={styles.container}>
                            <VisitedMap markers={[{ latitude: 33.748997, longitude: -84.387985 }]} />
                        </View>
                    </View>

                    <View style={[styles.container, styles.overviewSection]}>
                        <Text style={[styles.overviewText, styles.overviewSectionTitle]}>{'Time You\'ve Stayed Off Your Phone'}</Text>
                        <View style={{ height: 1, width: '100%', backgroundColor: colors.charityListBorder }} />
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 10, marginBottom: 6}}>
                            <Text style={[styles.overviewText, { fontSize: '17px', marginRight: 12 }]}>{this.state.totalTime}</Text>
                            <Text style={[styles.overviewText, { fontSize: '12px', color: colors.green }]}>{this.state.subTitile}</Text>
                        </View>
                        <View style={{ justifyContent: 'center' }}>
                            <TimeChart />
                        </View>
                    </View>
                    <View style={[styles.container, styles.overviewSection]}>
                        <Text style={[styles.overviewText, styles.overviewSectionTitle]}>{'Charity Goals You\'ve Participated'}</Text>
                        <CharityGoalList
                            data={[{ id: 'a', title: 'Atlanta', goalState: 'Completed' },
                            { id: 'a', title: 'Atlanta', goalState: 'Completed' },
                            { id: 'a', title: 'Atlanta', goalState: 'In Progress' },
                            { id: 'a', title: 'Atlanta', goalState: 'In Progress' },
                            { id: 'a', title: 'Atlanta', goalState: 'In Progress' },
                            { id: 'a', title: 'Atlanta', goalState: 'In Progress' },
                            { id: 'a', title: 'Atlanta', goalState: 'In Progress' }]}
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
        width: '100%',
        flex: 1,
    },
    overviewText: {
        fontFamily: 'Roboto',
        fontWeight: '500',
    },
    overviewSectionTitle: {
        fontSize: '15px',
        color: colors.black,
        marginBottom: 7
    },
    overviewSection: {
        flex: 1,
        marginTop: 20,
        justifyContent: 'flex-start',
        flexDirection: 'clolum',
        width: '100%',
        paddingLeft: '3%',
        paddingRight: '3%',
    }
})

export default StatisticScreen