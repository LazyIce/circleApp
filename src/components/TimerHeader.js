import React, { Component } from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { DrawerActions } from 'react-navigation'

class TimerHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            star: 200
        }
    }

    renderLeftComponenent() {
        return (
            <TouchableOpacity onPress={() => {
                this.props.navigation.dispatch(DrawerActions.openDrawer());
            }}>
                <Icon name='bars' size={30} color={'#FFF'} />
            </TouchableOpacity>
        );
    }

    renderCenterComponenet() {
        return (
            <Text style={styles.starText}>
                {this.state.star + ' '}
                <Icon name='star' size={18} color={'#FFFF00'} />
            </Text>
        );
    }

    render() {
        return (
            <Header 
                leftComponent={ this.renderLeftComponenent() }
                centerComponent={ this.renderCenterComponenet() }
                containerStyle={styles.container}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFAC31',
        shadowColor: 'transparent',
        borderBottomWidth: 0
    },
    starText: {
        color: '#FFF', 
        height: 25,
        fontSize: 18,
        backgroundColor: '#FFD700',
        paddingTop: 2,
        paddingLeft: 25,
        paddingRight: 25,
        borderRadius: 10,
        overflow: 'hidden'
    }
});

export default TimerHeader;