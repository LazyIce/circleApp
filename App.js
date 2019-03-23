import React, {Component} from 'react'
import { Dimensions } from 'react-native'
import { createDrawerNavigator, createAppContainer } from 'react-navigation'
import stackNav from './src/navigations/stackNav'
import SideMenu from './src/components/SideMenu'
import AccountScreen from './src/views/AccountScreen'
import AchievementScreen from './src/views/AchievementScreen'
import FriendScreen from './src/views/FriendScreen'
import TimelineScreen from './src/views/TimelineScreen'
import CharityScreen from './src/views/CharityScreen'
import CityScreen from './src/views/CityScreen'

import Amplify, { Auth } from 'aws-amplify'
import awsmobile from './aws-exports'
Amplify.configure(awsmobile)

export default class App extends Component {
	render() {
		return (
			<AppContainer />
		);
	}
}

let routeConfigs = {
	Home: {
		screen: stackNav
	},
	Account: {
		screen: AccountScreen
	},
	City: {
		screen: CityScreen
	},
	Achievement: {
		screen: AchievementScreen
	},
	Friend: {
		screen: FriendScreen
	},
	Timeline: {
		screen: TimelineScreen
	},
	Charity: {
		screen: CharityScreen
	}
}

let drawerNavigatorConfigs = {
	drawerWidth: Dimensions.get('window').width / 2,
	drawerPosition: 'left',
	drawerOpenRoute: 'DrawerOpen',
	drawerCloseRoute: 'DrawerClose',
	drawerToggleRoute: 'DrawerToggle',
	drawerBackgroundColor: 'orange',
	contentComponent: SideMenu,
	contentOptions: {
		activeTintColor: 'orange'
	}
}

const AppDrawerNavigator = createDrawerNavigator(routeConfigs, drawerNavigatorConfigs)

const AppContainer = createAppContainer(AppDrawerNavigator)
