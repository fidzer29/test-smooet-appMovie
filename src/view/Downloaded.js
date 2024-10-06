import {Text, View} from 'react-native';
import React, {Component} from 'react';

export default class Downloaded extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#121212',
        }}>
        <Text style={{color: 'white'}}>Ini Halaman Downloaded</Text>
      </View>
    );
  }
}
