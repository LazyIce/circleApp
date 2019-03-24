
import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements';
import CityList from './NewCityList'
import { colors } from './../Constants'

class JourneyButtons extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newCityCount: 1,
            cityVisitedCount: 5,
            postCardCount: 2,
            charityGoalCount: 1,
            displayNewCity: true,
            displayVisitedCity: false,
            displayPostcard: false,
            displayCharityGoal: false,
        }
    }

    refresh(props) {
        this.setState(props)
    }

    render() {
        return (
            <View style={{width: '100%'}}>
                <Button buttonStyle={styles.button}
                    title={'New Cities (' + this.state.newCityCount + ')'}
                    titleStyle={styles.buttonTitle}
                    icon={{
                        name: 'down',
                    }}
                    iconRight
                    onPress={(e) => this.refresh({displayNewCity: !this.state.displayNewCity})}
                ></Button>
                {this.state.displayNewCity &&
                    <CityList cities={[{ name: 'Savannah', totalCharityGoal: '50k', curCharityGoal: '431', pic: '', subTitle: '431/50k charity goal' }]} />
                }
                <Button buttonStyle={styles.button}
                    title={'Cities Visited (' + this.state.cityVisitedCount + ')'}
                    titleStyle={styles.buttonTitle}
                    icon={{
                        name: 'down',
                    }}
                    iconRight
                    onPress={(e) => this.refresh({displayVisitedCity: !this.state.displayVisitedCity})}
                ></Button>
                {this.state.displayVisitedCity &&
                    <CityList cities={[{ name: 'Savannah', totalCharityGoal: '50k', curCharityGoal: '431', pic: '', subTitle: '431/50k charity goal' }]} />
                }
                <Button buttonStyle={styles.button}
                    containerStyle={{ widht: '100%' }}
                    title={'Postcards (' + this.state.postCardCount + ')'}
                    titleStyle={styles.buttonTitle}
                    icon={{
                        name: 'down',
                    }}
                    iconRight
                    onPress={(e) => this.refresh({displayPostcard: !this.state.displayPostcard})}
                ></Button>
                {this.state.displayPostcard &&
                    <CityList cities={[{ name: 'Savannah', totalCharityGoal: '50k', curCharityGoal: '431', pic: '', subTitle: '431/50k charity goal' }]} />
                }
                <Button buttonStyle={styles.button}
                    title={'Charity Goals (' + this.state.charityGoalCount + ')'}
                    titleStyle={styles.buttonTitle}
                    icon={{
                        name: 'down',
                    }}
                    iconRight
                    onPress={(e) => this.refresh({displayCharityGoal: !this.state.displayCharityGoal})}
                ></Button>
                {this.state.displayCharityGoal &&
                    <CityList cities={[{ name: 'Savannah', totalCharityGoal: '50k', curCharityGoal: '431', pic: '', subTitle: '431/50k charity goal' }]} />
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.journeyButtonBackground,
        width: '100%',
        marginTop: 5,
        marginLeft: 8,
        marginRight: 8,
        justifyContent: 'center',
        borderRadius: '3px',
        shadowColor: "rgba(0, 0, 0, 0.5)",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 2,
    },
    buttonTitle: {
        color: colors.journeyHeader,
        fontSize: '16px',
        fontWeight: 'normal',
        fontFamily: 'Roboto',
    },
})

export default JourneyButtons