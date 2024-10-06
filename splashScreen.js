import {View, Text, ImageBackground, StyleSheet, Image} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation, CommonActions} from '@react-navigation/native';
import SplashImage from './src/assets/img/splash-screen.png';

export default function SplashScreen() {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Tabs'}],
        }),
      );
    }, 2000);
  });
  return (
    <Image
      source={require('./src/assets/img/splash-screen.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    />
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});
