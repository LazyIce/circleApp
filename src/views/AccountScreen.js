import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import MyHeader from './../components/MyHeader'

const BASE_WIDTH = Dimensions.get('window').width
const BASE_HEIGHT = Dimensions.get('window').height

class AccountScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: 'Account'
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <MyHeader {...this.props} title={this.state.title} />
                <Text>Account</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: BASE_WIDTH,
        height: BASE_HEIGHT,
        backgroundColor: '#FFAC31'
    },
});

export default AccountScreen