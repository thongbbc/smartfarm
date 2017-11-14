/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import MainScreen from './screen/mainscreen';
import ListHistoryScreen from './screen/listHistoryScreen'
import SetTimeScreen from './screen/setTimeScreen'
import ManageScreen from './screen/manageScreen'
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import {StackNavigator} from 'react-navigation'
import {
  Platform,Easing,Animated,
  StyleSheet,
  Text,
  View
} from 'react-native';
import thunk from 'redux-thunk';
var store = createStore(reducer);

class Home extends Component<{}> {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Provider store= {store}>
        <MainScreen navigation={this.props.navigation}/>
      </Provider>
    );
  }
}
class History extends Component<{}> {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <Provider store= {createStore(reducer)}>
        <ListHistoryScreen navigation={this.props.navigation}/>
      </Provider>
    )
  }
}
class Time extends Component<{}> {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <Provider store= {createStore(reducer)}>
        <SetTimeScreen navigation={this.props.navigation}/>
      </Provider>
    )
  }
}
class ManageDeviceScreen extends Component<{}> {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <Provider store= {store}>
        <ManageScreen navigation={this.props.navigation}/>
      </Provider>
    )
  }
}
const App = StackNavigator(
  {
    Home: { screen: Home },
    History: { screen: History },
    SetTime: { screen :Time},
    ManageDeviceScreen:{screen:ManageDeviceScreen}
  },
  {
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: true,
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;
 
        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        });
 
        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });
 
        return { opacity, transform: [{ translateY }] };
      },
    }),
  }
 );
 export default App;