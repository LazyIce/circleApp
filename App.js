import React, {Component} from 'react'
import { StyleSheet, View, Dimensions} from 'react-native'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './src/redux/reducers';
import { setNavigator, setActiveRoute } from './src/redux/actions/routes.action';
import DrawerContent from './src/navigation/DrawerContent';
import Toolbar from './src/navigation/Toolbar';
import AppNavigation from './src/navigation/AppNavigation';

import Amplify, { Auth } from 'aws-amplify'
import awsmobile from './aws-exports'
Amplify.configure(awsmobile)

let store = createStore(reducer);

export default class App extends Component {
    constructor() {
    super();

    this.drawer = React.createRef();
    this.navigator = React.createRef();
  	}

	componentDidMount() {
	  	store.dispatch(setNavigator(this.navigator.current));
  	}

	openDrawer = () => {
		this.drawer.current.openDrawer();
	};

	closeDrawer = () => {
		this.drawer.current.closeDrawer();
	};

	getActiveRouteName = navigationState => {
		if (!navigationState) {
			return null;
		}

		const route = navigationState.routes[navigationState.index];
		if (route.routes) {
			return getActiveRouteName(route);
		}
		return route.routeName;
	};

	render() {
		return (
		<Provider store={store}>
			<DrawerContent closeDrawer={this.closeDrawer} ref={this.drawer} />
			<View style={styles.container}>
				<Toolbar showMenu={this.openDrawer} />
				<AppNavigation
					onNavigationStateChange={(prevState, currentState) => {
						const currentScreen = this.getActiveRouteName(currentState);
						store.dispatch(setActiveRoute(currentScreen));
					}}
					ref={this.navigator}
				/>
			</View>
		</Provider>
		);
	}
	}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
});
