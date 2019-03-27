import React, { Component } from 'react';
import {  NavigationActions } from 'react-navigation';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

const ICON_COLOR = '#666'

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
                    <Icon name='user-circle' color={ICON_COLOR} size={24} />
                    <Text style={styles.menuText}>Account</Text>
                </TouchableOpacity>
                <TouchableOpacity style={ styles.menu } onPress={this.navigateToScreen('Journey')}>
                    <Icon name='globe' color={ICON_COLOR} size={24} />
                    <Text style={styles.menuText}>My journey</Text>
                </TouchableOpacity>
                <TouchableOpacity style={ styles.menu } onPress={this.navigateToScreen('Statistics')}>
                    <Icon name='list-alt' color={ICON_COLOR} size={24} />
                    <Text style={styles.menuText}>Statistics</Text>
                </TouchableOpacity>
                <TouchableOpacity style={ styles.menu } onPress={this.navigateToScreen('Achievement')}>
                    <Icon name='trophy' color={ICON_COLOR} size={24} />
                    <Text style={styles.menuText}>Achievement</Text>
                </TouchableOpacity>
                <TouchableOpacity style={ styles.menu } onPress={this.navigateToScreen('Friend')}>
                    <Icon name='users' color={ICON_COLOR} size={24} />
                    <Text style={styles.menuText}>Friend</Text>
                </TouchableOpacity>
				<TouchableOpacity style={ styles.menu } onPress={this.navigateToScreen('Charity')}>
                    <Icon name='heart' color={ICON_COLOR} size={24} />
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
		color: '#666',
		fontSize: 20
    },
    header: {
        marginTop: 20,
        marginBottom: 20
    }
});

export default SideMenu;