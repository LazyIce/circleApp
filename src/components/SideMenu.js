import React, { Component } from 'react';
import {  NavigationActions } from 'react-navigation';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

class SideMenu extends Component {
  	navigateToScreen = (route) => () => {
    	const navigateAction = NavigationActions.navigate({
      		routeName: route
    	});
    	this.props.navigation.dispatch(navigateAction);
  	}

	render () {
		return (
			<View style={styles.sideMenu}>
				<TouchableOpacity style={ styles.menu } onPress={this.navigateToScreen('Account')}>
                    <Icon name='user-circle' color='#fff' size={24} />
                    <Text style={styles.menuText}>Account</Text>
                </TouchableOpacity>
                <TouchableOpacity style={ styles.menu } onPress={this.navigateToScreen('City')}>
                    <Icon name='globe' color='#fff' size={24} />
                    <Text style={styles.menuText}>City</Text>
                </TouchableOpacity>
                <TouchableOpacity style={ styles.menu } onPress={this.navigateToScreen('Timeline')}>
                    <Icon name='list-alt' color='#fff' size={24} />
                    <Text style={styles.menuText}>Timeline</Text>
                </TouchableOpacity>
                <TouchableOpacity style={ styles.menu } onPress={this.navigateToScreen('Achievement')}>
                    <Icon name='trophy' color='#fff' size={24} />
                    <Text style={styles.menuText}>Achievement</Text>
                </TouchableOpacity>
                <TouchableOpacity style={ styles.menu } onPress={this.navigateToScreen('Friend')}>
                    <Icon name='users' color='#fff' size={24} />
                    <Text style={styles.menuText}>Friend</Text>
                </TouchableOpacity>
				<TouchableOpacity style={ styles.menu } onPress={this.navigateToScreen('Charity')}>
                    <Icon name='heart' color='#fff' size={24} />
                    <Text style={styles.menuText}>Charity</Text>
                </TouchableOpacity>
            </View>
		);
	}
}

const styles = StyleSheet.create({
	sideMenu: {
		marginTop: Dimensions.get('window').height / 8,
		marginBottom: Dimensions.get('window').height / 8, 
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'start'
	},
    menu: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    menuText: {
		marginLeft: 20,
		color: '#fff',
		fontSize: 20
    },
    header: {
        marginTop: 20,
        marginBottom: 20
    }
});

export default SideMenu;