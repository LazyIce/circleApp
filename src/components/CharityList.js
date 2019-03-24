import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ListItem, Card} from 'react-native-elements';
import { colors } from './../Constants'

class CharityList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // charities: [{name: , subTitle: , state: ,}, ]
            charities: props.charities || [],
        }
    }

    render() {
        return (
            <View style={[styles.container,
                { paddingLeft: '3%'}]}>
                {this.state.charities &&
                    this.state.charities.map((charity, index) => (
                        <ListItem
                            key={index}
                            leftElement={
                                <View style={styles.container}>
                                    <Text style={[styles.textStyle, { color: colors.black, fontSize: '12px', marginBottom: 5 }]}>{charity.state}</Text>
                                    <Text style={[styles.textStyle, { fontSize: '16px', color: colors.subTitle, marginBottom: 10 }]}>{charity.name}</Text>
                                    <Text style={[styles.textStyle, { fontSize: '14px', color: colors.subTitle }]}>{charity.subTitle}</Text>
                                </View>
                            }
                            bottomDivider={true}
                        />
                    ))
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

export default CharityList