import React, { Component } from 'react'
import { View, Text, StyleSheet} from 'react-native'

class FriendScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Friend</Text>
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
})

export default FriendScreen