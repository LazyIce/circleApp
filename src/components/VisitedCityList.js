import React, { Component } from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import { Card, Button } from 'react-native-elements';
import { colors } from './../Constants'

class VisitedCityList extends Component {
    constructor(props) {
        super(props)
        this.locateCallback = props.locateCallback
        this.travelCallback = props.travelCallback
    }
    onLocateClik = (e, city) => {
        this.locateCallback(e, city)
    }

    onTravelClick = (e, city) => {
        this.travelCallback(e, city)
    }

    render() {
        // cities are an array of cities; the format of city: {name: , totalCharityGoal: , curCharityGoal: , pic: , subTitle: , description: , postcards: []}
        const cities = this.props.cities || []
        const achievements = this.props.achievements || [];
        console.log(achievements)

        // compute postcards for each city
        const postcards = {}
        for(const city of cities) {
            var cityCards = [];
            for(const achievement of achievements) {
                if(achievement.cityId === city.cityId) {
                    cityCards.push(achievement);
                }
            }
            postcards[city.cityId] = cityCards
        }
        return (
            <View style={{marginBottom: 20}}>
                {cities.map((city, index) => {
                    return (
                        <Card key={index} containerStyle={[styles.container, { borderRadius: 3 }]}>
                            <View>
                                <Image
                                    style={{ width: '100%', height: 150, borderRadius: 10}}
                                    source={{ uri: city.image}}
                                ></Image>
                            </View>
                            <View style={styles.container}>
                                <Text style={[styles.textStyle, { color: colors.black, fontSize: 24, marginBottom: 5 }]}>{city.name}</Text>
                                <Text style={[styles.textStyle, { fontSize: 14, color: colors.subTitle, marginBottom: 25 }]}>{city.subTitle}</Text>
                            </View>
                            {city.description &&
                                <View style={[styles.textStyle, {fontSize: 14, color: colors.subTitle}]}>
                                    <Text>{city.description}</Text>
                                </View>
                            }

                            {postcards[city.cityId] && postcards[city.cityId].length > 0 &&
                                <View>
                                    <Text style={[styles.textStyle, {fontSize: 16, marginTop: 12}]}>{'Postcard(' + postcards[city.cityId].length + ')'}</Text>
                                </View>
                             }
                             {postcards[city.cityId] &&
                                <View style={[styles.rowContainer, {flexWrap: 'wrap'}]}>
                                    {postcards[city.cityId].map((postcard, index) => (
                                        <Image
                                            key={index}
                                            style={{ width: '20%', aspectRatio: 1, borderRadius: 5, margin: '2%' }}
                                            source={{ uri: postcard.image}}
                                        ></Image>
                                    ))
                                    }
                                <View style={[styles.rowContainer]}>
                                    <Button onPress={(e) => this.onTravelClick(e, city)} titleStyle={[styles.textStyle, { fontSize: 14, color: colors.cityButton, }]} title='REVISIT' type='clear'></Button>
                                    <Button onPress={(e) => this.onLocateClik(e, city)} titleStyle={[styles.textStyle, { fontSize: 14, color: colors.cityButton, }]} title='LOCATE' type='clear'></Button>
                                </View>
                                </View>
                            }
                        </Card>
                    )
                })
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end'
    },
    textStyle: {
        fontWeight: '500',
    },
})

export default VisitedCityList