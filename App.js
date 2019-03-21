import React, {Component} from 'react'
import { StyleSheet, View, Demensions} from 'react-native'
import TimerScreen from './src/screens/TimerScreen'

import Amplify, { Auth } from 'aws-amplify'
import awsmobile from './aws-exports'
Amplify.configure(awsmobile)

// const STATUS_BAR_HEIGHT = 20
// const BASE_WIDTH = Demensions.get('window').width
// const BASE_HIGHT = Demensions.get('window').height - STATUS_BAR_HEIGHT

class App extends Component {
  // constructor() {
  //   this.state = {
  //     width: BASE_WIDTH,
  //     height: BASE_HIGHT
  //   }
  // }
  render() {
    return (
      <View style={styles.container}>
        <TimerScreen />
      </View>
    );
  }
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
