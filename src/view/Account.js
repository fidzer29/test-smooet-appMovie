import {Text, View} from 'react-native';
import React, {Component} from 'react';

export default class Account extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#121212',
        }}>
        <Text style={{color: 'white'}}>Ini Halaman Account</Text>
      </View>
    );
  }
}
