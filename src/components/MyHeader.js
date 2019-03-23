import React, { Component } from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

class MyHeader extends Component {
    constructor(props) {
        super(props)
    }

    renderLeftComponenent() {
        return (
            <TouchableOpacity onPress={() => {
                this.props.navigation.goBack();
            }}>
                <Icon name='chevron-left' size={25} color={'#FFF'} />
            </TouchableOpacity>
        );
    }

    renderCenterComponenet() {
        return (
            <Text style={styles.title}>{this.props.title}</Text>
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
    title: {
        color: '#FFF',
        fontSize: 25
    }
});

export default MyHeader;