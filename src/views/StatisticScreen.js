import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { ButtonGroup } from 'react-native-elements';
import { API } from 'aws-amplify'
import VisitedMap from './../components/VisitedMap'
import CharityGoalList from './../components/CharityGoalList'
import TimeChart from './../components/TimeChart'
import { colors } from './../Constants';
import MyHeader from './../components/MyHeader'
import { getStatistics } from '../APIs';

class StatisticScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: 'Statistics',
            selectedIndex: 1,
            chartDescription: {
                totalTime: ' ',
                subTitile: ' ',
            },
            map: {},
            chartData: {},
            charityGoals: {},
        }
        this.timePeriods = ['All Time', 'Today', 'This Week', 'This Month']
        this.inited = false
    }

    fetchData = async (selectedIndex) => {
        const paths = ['allTime', 'today', 'weekly', 'monthly']
        if(!this.inited || selectedIndex !== this.state.selectedIndex) {
            let response = await getStatistics(paths[selectedIndex]);
            this.inited = true
            response.selectedIndex = selectedIndex
            this.setState(response);
        }
    }

    updateTimePeriod = (selectedIndex) => {
        this.fetchData(selectedIndex)
    }

    componentDidMount = () => {
        this.fetchData(this.state.selectedIndex)
    }

    render() {
        const { selectedIndex } = this.state
        return (
            <View style={styles.container}>
                <MyHeader {...this.props} title={this.state.title} />
                <ButtonGroup
                    onPress={this.updateTimePeriod}
                    selectedIndex={selectedIndex}
                    buttons={this.timePeriods}
                    containerStyle={{height: 35}}
                    selectedButtonStyle={{backgroundColor: colors.purple}}
                    textStyle={[styles.overviewText, {fontSize: 14}]}
                />
                <ScrollView style={{flex: 1, marginBottom: 20}}>
                    <View style={[styles.container, styles.overviewSection, {height: 220, marginTop: 10}]}>
                        <Text style={[styles.overviewText, styles.overviewSectionTitle]}>
                            {'Places You\'ve Visited'}
                        </Text>
                        <View style={styles.container}>
                            <VisitedMap {...this.state.map}/>
                        </View>
                    </View>

                    <View style={[styles.container, styles.overviewSection]}>
                        <Text style={[styles.overviewText, styles.overviewSectionTitle]}>{'Time You\'ve Stayed Off Your Phone'}</Text>
                        <View style={{ height: 1, width: '100%', backgroundColor: colors.charityListBorder }} />
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 10, marginBottom: 6}}>
                            <Text style={[styles.overviewText, { fontSize: 17, marginRight: 12 }]}>{this.state.chartDescription.totalTime}</Text>
                            <Text style={[styles.overviewText, { fontSize: 12, color: colors.green }]}>{this.state.chartDescription.subTitile}</Text>
                        </View>
                        <View style={{ justifyContent: 'center' }}>
                            <TimeChart {...this.state.chartData}/>
                        </View>
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
        fontWeight: '500',
    },
    overviewSectionTitle: {
        fontSize: 15,
        color: colors.black,
        marginBottom: 7
    },
    overviewSection: {
        flex: 1,
        marginTop: 20,
        justifyContent: 'flex-start',
        flexDirection: 'column',
        width: '100%',
        paddingLeft: '3%',
        paddingRight: '3%',
    }
})

export default StatisticScreen