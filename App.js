import React, {Component} from 'react'
import { Dimensions } from 'react-native'
import { createDrawerNavigator, createAppContainer } from 'react-navigation'
import stackNav from './src/navigations/stackNav'
import SideMenu from './src/components/SideMenu'
import AccountScreen from './src/views/AccountScreen'
import AchievementScreen from './src/views/AchievementScreen'
import FriendScreen from './src/views/FriendScreen'
import CharityScreen from './src/views/CharityScreen'
import JourneyScreen from './src/views/JourneyScreen'
import StatisticScreen from './src/views/StatisticScreen'

import Amplify, { API } from 'aws-amplify'
import awsmobile from './src/aws-exports'
import { withAuthenticator } from 'aws-amplify-react-native';
Amplify.configure(awsmobile)

class App extends Component {
	render() {
		return (
			<AppContainer />
		);
	}
}

export default withAuthenticator(App)

let routeConfigs = {
	Home: {
		screen: stackNav
	},
	Account: {
		screen: AccountScreen
	},
	Journey: {
		screen: JourneyScreen
	},
	Achievement: {
		screen: AchievementScreen
	},
	Friend: {
		screen: FriendScreen
	},
	Statistics: {
		screen: StatisticScreen
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
	drawerBackgroundColor: '#F5E2FD',
	contentComponent: SideMenu,
	contentOptions: {
		activeTintColor: '#000'
	}
}

const AppDrawerNavigator = createDrawerNavigator(routeConfigs, drawerNavigatorConfigs)

const AppContainer = createAppContainer(AppDrawerNavigator)
