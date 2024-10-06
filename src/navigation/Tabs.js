import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Home from '../view/Home';
import Favorites from '../view/Favorites';
import Downloaded from '../view/Downloaded';
import Account from '../view/Account';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const [count, setCount] = useState(0);
  const [likedMovies, setLikedMovies] = useState([]);

  useEffect(() => {
    console.log('Liked Movies:', likedMovies);
  }, [likedMovies]);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 80,
          paddingBottom: 10,
          backgroundColor: '#1f1f1f',
          borderTopWidth: 0,
        },
        headerStyle: {
          backgroundColor: '#121212',
        },
        headerTintColor: '#fff',
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Discover"
        children={() => (
          <Home
            count={count}
            setCount={setCount}
            likedMovies={likedMovies}
            setLikedMovies={setLikedMovies}
          />
        )}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../assets/icons/home.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#e32f45' : '#748c94',
                }}
              />
              <Text
                style={{
                  color: focused ? '#e32f45' : '#748c94',
                  fontSize: 13,
                }}>
                Home
              </Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity style={{marginRight: 15}}>
              <Image
                source={require('../assets/icons/search.png')}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: '#fff',
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        children={() => (
          <Favorites
            likedMovies={likedMovies}
            setLikedMovies={setLikedMovies}
          />
        )}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../assets/icons/heart.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#e32f45' : '#748c94',
                }}
              />
              <Text
                style={{
                  color: focused ? '#e32f45' : '#748c94',
                  fontSize: 13,
                }}>
                Favorites
              </Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity style={{marginRight: 15}}>
              <Image
                source={require('../assets/icons/search.png')}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: '#fff',
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Downloaded"
        component={Downloaded}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../assets/icons/down-arrow.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#e32f45' : '#748c94',
                }}
              />
              <Text
                style={{
                  color: focused ? '#e32f45' : '#748c94',
                  fontSize: 13,
                }}>
                Downloaded
              </Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity style={{marginRight: 15}}>
              <Image
                source={require('../assets/icons/search.png')}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: '#fff',
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../assets/icons/user.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#e32f45' : '#748c94',
                }}
              />
              <Text
                style={{
                  color: focused ? '#e32f45' : '#748c94',
                  fontSize: 13,
                }}>
                Account
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
