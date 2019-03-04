import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import { SearchBar, Icon, Button} from 'react-native-elements';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { withAuthenticator } from 'aws-amplify-react-native';

import Amplify from '@aws-amplify/core'
import config from './aws-exports'
Amplify.configure(config)

class TravelScreen extends React.Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);
    this.state = {
      starCount: "200",
      cityName: "Atlanta",
      charityGoal: "232/30k charity goal",
      timerAcu: "60:00",
      buttonText: "Give Up",
      starGetText: "You will get 75 "
    };
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.homeScreen}>

        <View style={[styles.container, { height: 33 }]}>
          <View style={[styles.container, styles.starCountContainer, { flex: 1, flexDirection: 'row', justifyContent: "center" }]}>
            <Text style={styles.starCount}>
              {this.state.starCount}
            </Text>
            <Icon name="star" size={18} color="#D8D8D8" />
          </View>
        </View>

        <View style={styles.container}>
          <Text style={styles.cityName}>
            {this.state.cityName}
          </Text>
          <Text style={styles.charityGoal}>
            {this.state.charityGoal}
          </Text>
        </View>

        <View style={[styles.container, { marginTop: 10, marginBottom: 10 }]}>
          <Image style={styles.timer}
            source={require('./assets/timer.png')}
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.timerAcu}>
            {this.state.timerAcu}
          </Text>
          <View style={[styles.container, { height: 33, marginTop: 0, marginBottom: 0 }]}>
            <View style={[styles.container, { flex: 1, flexDirection: 'row', justifyContent: "center" }]}>
              <Text style={styles.starGetNotify}>
                {this.state.starGetText}
              </Text>
              <Icon name="star" size={18} color="#D8D8D8" />
            </View>
          </View>
        </View>

        <View style={styles.container}>
          <Button style={[styles.button, styles.shadow]}
            title="travel"
            onPress={() => navigate('Travelling')}
          />
        </View>

      </View>
    );
  }
}

class TravellingScreen extends React.Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);
    this.state = {
      starCount: "275",
      cityName: "Atlanta",
      charityGoal: "232/30k charity goal",
      congrats: "Congrats! You stayed focused for 70 min!",
      buttonText: "Share",
      starGetText: "You earned 75 ",
      timerAcu: "70:00",
      middleText: "Keep up!"
    };
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.homeScreen}>

        <View style={[styles.container, {height: 33}]}>
          <View style={[styles.container, styles.starCountContainer, {flex: 1, flexDirection: 'row', justifyContent: "center"}]}>
            <Text style={styles.starCount}>
              {this.state.starCount}
            </Text>
            <Icon name="star" size={18} color="#D8D8D8"/>
          </View>
        </View>

        <View style={styles.container}>
          <Text style={styles.cityName}>
            {this.state.cityName}
          </Text>
          <Text style={styles.charityGoal}>
            {this.state.charityGoal}
          </Text>
        </View>

        <View style={[styles.container, {marginTop: 10, marginBottom: 10}]}>
          <Image style={styles.timer}
            source={require('./assets/unset_timer.png')}
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.congratsText}>
            {this.state.congrats}
          </Text>
          <View style={[styles.container, {height: 33, marginTop: 0, marginBottom: 0}]}>
            <View style={[styles.container, { flex: 1, flexDirection: 'row', justifyContent: "center" }]}>
              <Text style={styles.starGetNotify}>
                {this.state.starGetText}
              </Text>
              <Icon name="star" size={18} color="#D8D8D8" />
            </View>
          </View>
        </View>

        <View style={styles.container}>
          <Button style= {[styles.button, styles.shadow]}
            icon={{
              name: "share",
              borderRadius: 10,
              backgroundColor: "#C4C4C4",
              color: "#717171"
            }}
            title="share"
            onPress={() => navigate('CityChoose')}
          />
        </View>

      </View>
    );
  }
}
class CityChooseScreen extends React.Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);
    this.state = {
      starCount: "200",
      cityName: "Pick a city?",
      searchBarPlaceHolder: "Type the city name",
      charityGoal: "Where your journey begins",
      buttonText: "Give Up"
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.homeScreen}>
        <View style={[styles.container, {height: 33}]}>
          <View style={[styles.container, styles.starCountContainer, {flex: 1, flexDirection: 'row', justifyContent: "center"}]}>
            <Text style={styles.starCount}>
              {this.state.starCount}
            </Text>
            <Icon name="star" size={18} color="#D8D8D8"/>
          </View>
        </View>

        <View style={styles.container}>
          <Text style={styles.cityName}>
            {this.state.cityName}
          </Text>
          <Text style={styles.charityGoal}>
            {this.state.charityGoal}
          </Text>
        </View>

        <View style={styles.container}>
          <SearchBar containerStyle={styles.searchBarContainer}
            inputStyle={styles.searchBarInput}
            placeholder={this.state.searchBarPlaceHolder}
            onChangeText={this.updateSearch}
            round="true"
          />
        </View>

        <View style={styles.container}>
          <Image style={styles.timer}
            source={require('./assets/unset_timer.png')}
          />
        </View>

        <View style={styles.container}>
          <Button style= {[styles.button, styles.shadow, {marginBottom: 5}]}
            icon={{
              name: "search",
              borderRadius: 10,
              backgroundColor: "#C4C4C4",
              color: "#717171"
            }}
            title="Select Atlanta"
            onPress={() => navigate('Travel')}
          />
          <Button style= {[styles.button, styles.shadow]}
            title="Surprise Me"
            onPress={() => navigate('Travel')}
          />
        </View>
        <Image style={styles.bottomLabel}
            source={require('./assets/bottom_label.png')}
        />
      </View>
      
    )
  }
}

// export default withAuthenticator(App, { includeGreetings: true })

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // home screen
  homeScreen: {
    width: 375,
    height: 812,
    paddingTop: 20,
    backgroundColor: "#717171"
  },
  // the timer 
  timer: {
  },
  cityName: {
    height: 38,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 32,
    color: '#E9E9E9'
  },
  charityGoal: {
    height: 19,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 16,
    color: '#E9E9E9'
  },
  starCountContainer: {
    width: 108,
    height: 23,
    borderRadius: 11.5,
    backgroundColor: "#5a5a5a",
  },
  middleTextContainer: {
    width: 108,
    height: 23,
    borderRadius: 11.5,
    backgroundColor: "#8A8A8A"
  },
  starCount: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "300",
    fontStyle: "normal",
    color: "#e9e9e9"
  },
  // display the passing time
  timerAcu: {
    fontFamily: "Roboto",
    fontSize: 80,
    fontWeight: "300",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#e9e9e9"
  },
  button: {
    margin: 3,
    width: 200,
    backgroundColor: "#D8D8D8"
  },
  searchBarContainer: {
    width: "60%",
    height: 42,
    backgroundColor:'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  searchBarInput: {
    backgroundColor: "#5A5A5A"
  },
  shadow: {
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 2,
    shadowOpacity: 1,
  },
  starGetNotify: {
    height: 21,
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "300",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#e9e9e9"
  },
  congratsText: {
    fontFamily: "Roboto",
    fontSize: 32,
    fontWeight: "300",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#e9e9e9",
    textAlign: "center"
  },
  bottomLabel: {
    zIndex: 20,
    position: "absolute",
    left: 30,
    bottom: 30
  }
});

// navigation
const MainNavigator = createStackNavigator({
  CityChoose: {screen: CityChooseScreen},
  Travel: {screen: TravelScreen},
  Travelling: {screen: TravellingScreen},
});

const App = createAppContainer(MainNavigator);

export default App;