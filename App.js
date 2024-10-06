import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from './src/navigation/Tabs';
import Details from './src/view/Details';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tabs">
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
