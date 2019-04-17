import React, { Component } from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

class FriendHeader extends Component {
    constructor(props) {
        super(props)
    }

    renderLeftComponenent() {
        return (
            <TouchableOpacity onPress={() => {
                this.props.navigation.goBack();
            }}>
                <Icon name='chevron-left' size={25} color={'#4E4E4E'} />
            </TouchableOpacity>
        );
    }

    renderCenterComponenet() {
        return (
            <Text style={styles.title}>{this.props.title}</Text>
        );
    }

    renderRightComponent() {
        return (
            <TouchableOpacity onPress={() => {
                this.props.popAddFriend(true);
            }}>
                <Icon name='user-plus' size={25} color={'#4E4E4E'} />
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <Header 
                leftComponent={ this.renderLeftComponenent() }
                centerComponent={ this.renderCenterComponenet() }
                rightComponent={ this.renderRightComponent() }
                containerStyle={styles.container}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        shadowColor: 'transparent',
        borderBottomWidth: 1
    },
    title: {
        color: '#000',
        fontSize: 25
    }
});

export default FriendHeader;