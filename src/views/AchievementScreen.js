import React, { Component } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { createAppContainer, createStackNavigator } from 'react-navigation';
import MyHeader from './../components/MyHeader'
import ListView from './../components/ListView'
import MyGallery from './../components/MyGallery'


const BASE_WIDTH = Dimensions.get('window').width
const BASE_HEIGHT = Dimensions.get('window').height

const stackNav2 = createStackNavigator(
    {
        List: {
            screen: ListView
        },
        Gallery: {
            screen: MyGallery
        }
    }, {
        headerMode: "none"
    }
);

const AppContainer = createAppContainer(stackNav2)

class AchievementScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: 'Achievement'
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <MyHeader {...this.props} title={this.state.title} />
                <ListView />
            </View>
        ) 
    }
}

const styles = StyleSheet.create({
    container: {
        
    },
});

export default AchievementScreen