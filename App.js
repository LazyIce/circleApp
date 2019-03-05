import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';

import Amplify from '@aws-amplify/core'
import config from './aws-exports'
Amplify.configure(config)

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        Hello world.
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
