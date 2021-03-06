import React, { Component } from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import { ListItem, Card, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'
import { colors } from '../Constants'
import { rectBuilding } from '../img_path';

class NewCityList extends Component {
    constructor(props) {
        super(props)

        console.log(props)
        this.unlockCallback = props.unlockCallback
        this.locateCallback = props.locateCallback
    }

    onTravelClick = (e, city) => {
        this.unlockCallback(e, city)
    }

    onLocateClik = (e, city) => {
        this.locateCallback(e, city)
    }

    render() {
        // cities are an array of cities; the format of city: {name: , totalCharityGoal: , curCharityGoal: , pic: , subTitle: }
        const cities = this.props.cities || []
        return (
            <View style={{marginBottom: 20}}>
                {cities.map((city, index) => {
                    return (
                        <Card key={index} containerStyle={[styles.container, styles.shadow, { borderRadius: 3 }]}>
                            <ListItem containerStyle={[styles.shadow, { borderRadius: 20, padding: 0 }]}
                                key={index}
                                leftElement={
                                    <View style={styles.container}>
                                        <Text style={[styles.textStyle, { color: colors.black, fontSize: 24, marginBottom: 5 }]}>{city.name}</Text>
                                        <Text style={[styles.textStyle, { fontSize: 14, color: colors.subTitle, marginBottom: 25 }]}>{city.subTitle}</Text>
                                        <View style={[styles.rowContainer]}>
                                            <Button onPress={(e) => this.onTravelClick(e, city)} titleStyle={[styles.textStyle, { fontSize: 14, color: colors.cityButton, }]} title='TRAVEL' type='clear'></Button>
                                            <Button onPress={(e) => this.onLocateClik(e, city)} titleStyle={[styles.textStyle, { fontSize: 14, color: colors.cityButton, }]} title='LOCATE' type='clear'></Button>
                                        </View>
                                    </View>
                                }
                                rightElement={<Image
                                    style={{ alignSelf:'flex-start', width: 80, height: 80, borderRadius: 5 }}
                                    source={{ uri: city.image}}
                                />}
                            />
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
    },
    textStyle: {
        fontWeight: '500',
    },
    shadow: {
        shadowColor: "rgba(0, 0, 0, 0.5)",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowRadius: 1,
    }
})

export default NewCityList