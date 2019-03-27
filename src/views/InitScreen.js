import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { Button, Input, Avatar } from 'react-native-elements'
import TimerHeader from './../components/TimerHeader'
import Icon from 'react-native-vector-icons/FontAwesome'
import { building } from './../img_path'

const BASE_WIDTH = Dimensions.get('window').width
const BASE_HEIGHT = Dimensions.get('window').height

class InitScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TimerHeader {...this.props} star={199} />
                <View style={styles.contentContainer}>
                    <Text style={styles.titleText}>Choose a city</Text>
                    <Text style={styles.contentText}>Let's decide where you journey begin</Text>
                    <Input  
                        placeholder='Type the city name'
                        rightIcon={{ type:'font-awesome', name: 'search', size: 18 }}
                        containerStyle={styles.inputConatiner}
                        inputContainerStyle={styles.input}
                    />
                </View>
                <View style={styles.imgContainer}>
                    <Avatar 
                        size={218}
                        rounded
                        source={building} 
                    />
                </View>
                <View style={styles.btnContainer}>
                    <Button 
                        buttonStyle={styles.button} 
                        titleStyle={styles.btnFont} 
                        title="CHOOSE ATLANTA" 
                        icon={
                            <Icon
                                name="map-marker"
                                size={15}
                                color="white"
                            />
                        }
                        iconRight 
                        onPress={() => this.props.navigation.navigate('Timer')}
                    />
                    <Button 
                        buttonStyle={styles.button} 
                        titleStyle={styles.btnFont} 
                        title="SURPRISE ME"  
                        onPress={() => this.props.navigation.navigate('Timer')}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF'
    },
    contentContainer: {
        width: BASE_WIDTH,
        height: BASE_HEIGHT / 4.5,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    titleText: {
        color: '#000',
        fontSize: 40
    },
    contentText: {
        color: '#000',
        fontSize: 20
    },
    inputConatiner: {
        borderColor: '#666',
        borderWidth: 1,
        borderRadius: 10,
        width: BASE_WIDTH * 0.8,
        marginTop: 10
    },
    input: {
        borderBottomWidth: 0,
        color: '#666'
    },
    imgContainer: {
        width: BASE_WIDTH,
        height: BASE_HEIGHT / 2.25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnContainer: {
        height: BASE_HEIGHT / 5,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    button: {
        width: BASE_WIDTH / 2,
        backgroundColor: '#A57AD4'
    },
    btnFont: {
        color: '#FFF'
    }
})

export default InitScreen
