import React, { Component } from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { DrawerActions } from 'react-navigation'
import { API } from 'aws-amplify'

class TimerHeader extends Component {
    constructor(props) {
        super(props)
    }

    renderLeftComponenent() {
        return (
            <TouchableOpacity onPress={() => {
                this.props.navigation.dispatch(DrawerActions.openDrawer());
            }}>
                <Icon name='bars' size={30} color={'#4E4E4E'} />
            </TouchableOpacity>
        );
    }

    renderCenterComponenet() {
        const star = this.props.star || 0
        return (
            <Text style={styles.starText}>
                {this.props.star + ' '}
                <Icon name='star' size={18} color={'#C5AFDD'} />
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
        backgroundColor: '#FFF',
        shadowColor: 'transparent',
        borderBottomWidth: 0
    },
    starText: {
        color: '#000', 
        height: 25,
        fontSize: 18,
        backgroundColor: '#F0F0F0',
        paddingTop: 2,
        paddingLeft: 25,
        paddingRight: 25,
        borderRadius: 10,
        overflow: 'hidden'
    }
});

export default TimerHeader;
