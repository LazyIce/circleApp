import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

class AccountScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Account</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default AccountScreen