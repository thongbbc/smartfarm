/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import MainScreen from './screen/mainscreen';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import thunk from 'redux-thunk';


export default class App extends Component<{}> {
  render() {
    return (
      <Provider store= {createStore(reducer)}>
        <MainScreen/>
      </Provider>
    );
  }
}