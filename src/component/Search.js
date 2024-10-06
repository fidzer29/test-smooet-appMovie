import React from 'react';
import {View, StyleSheet} from 'react-native';
import {SearchBar} from '@rneui/themed';

const MySearchBar = () => {
  return (
    <View style={styles.container}>
      <SearchBar containerStyle={{borderRadius: 20}} placeholder="Search..." />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    width: 350,
    height: 20,
  },
});

export default MySearchBar;
