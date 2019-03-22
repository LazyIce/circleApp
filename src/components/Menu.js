import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Text, View} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

let SideMenuWidth = 300

export default class Menu extends Component {
    render() {
        return (
            <View style={[styles.sideMenu, this.props.style || {}]}>
                <View style={{ paddingHorizontal: 30 }}>
                    <TouchableOpacity style={[ styles.menu, { backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 5} ]}>
                        <Icon name='home' color='#fff' size={24} />
                        <Text style={styles.menuText}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={ styles.menu }>
                        <Icon name='user-o' color='#fff' size={24} />
                        <Text style={styles.menuText}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={ styles.menu }>
                        <Icon name='cog' color='#fff' size={24} />
                        <Text style={styles.menuText}>Settings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={ styles.menu }>
                        <Icon name='comment-o' color='#fff' size={24} />
                        <Text style={styles.menuText}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={ styles.menu }>
                        <Icon name='bell-o' color='#fff' size={24} />
                        <Text style={styles.menuText}>Notification</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    sideMenu: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: SideMenuWidth,
        backgroundColor: 'transparent'
    },
    sideMenuTitle: {
        marginLeft: 20,
        marginBottom: 30
    },
    menu: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    menuText: {
        marginLeft: 20
    },
    header: {
        marginTop: 20,
        marginBottom: 20
    },
    userInfosHolder: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})
