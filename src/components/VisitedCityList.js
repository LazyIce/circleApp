import React, { Component } from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import { Card, Button } from 'react-native-elements';
import { colors } from './../Constants'

class VisitedCityList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // cities are an array of cities; the format of city: {name: , totalCharityGoal: , curCharityGoal: , pic: , subTitle: , description: , postcards: []}
            cities: props.cities || [],
        }
        this.locateCallback = props.locateCallback
    }
    onLocateClik = (e, city) => {
        this.locateCallback(e, city)
    }

    render() {
        return (
            <View style={{marginBottom: 20}}>
                {this.state.cities.map((city, index) => {
                    return (
                        <Card containerStyle={[styles.container, { borderRadius: '3px' }]}>
                            <View>
                                <Image
                                    style={{ width: '100%', height: 150, borderRadius: 10}}
                                    source={city.pic}
                                ></Image>
                            </View>
                            <View style={styles.container}>
                                <Text style={[styles.textStyle, { color: colors.black, fontSize: '24px', marginBottom: 5 }]}>{city.name}</Text>
                                <Text style={[styles.textStyle, { fontSize: '14px', color: colors.subTitle, marginBottom: 25 }]}>{city.subTitle}</Text>
                            </View>
                            {city.description &&
                                <View style={[styles.textStyle, {fontSize: '14px', color: colors.subTitle}]}>
                                    <Text>{city.description}</Text>
                                </View>
                            }

                            {city.postcards &&
                                <View>
                                    <Text style={[styles.textStyle, {fontSize: '16px', marginTop: 12}]}>{'Postcard(' + city.postcards.length + ')'}</Text>
                                </View>
                             }
                             {city.postcards &&
                                <View style={[styles.rowContainer, {flexWrap: 'wrap'}]}>
                                    {city.postcards.map((postcard) => (
                                        <Image
                                            style={{ width: '20%', aspectRatio: 1, borderRadius: 5, margin: '2%' }}
                                            source={postcard}
                                        ></Image>
                                    ))
                                    }
                                <View style={[styles.rowContainer]}>
                                    <Button onPress={(e) => this.onLocateClik(e, city)} titleStyle={[styles.textStyle, { fontSize: '14px', color: colors.cityButton, }]} title='LOCATE' type='clear'></Button>
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
        fontFamily: 'Roboto',
        fontWeight: '500',
    },
})

export default VisitedCityList