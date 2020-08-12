import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Button, ActivityIndicator } from 'react-native';
import  Board from './src/Board.js'
import  Home from './src/Home.js'
import Status from './src/Status.js'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons'
import store from './store'
import { Provider } from 'react-redux'

const Tab = createBottomTabNavigator();

export default function App() {
  const [ user, setUser ] = useState('')


    return (
    <Provider store={store}>
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'ios-home'
            } else if (route.name === 'Board') {
              iconName = 'logo-playstation'
            }
            else if (route.name === 'Status') {
              iconName = 'ios-trophy'
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >

          <Tab.Screen name="Home" component={Home} options={{title: 'Home'}}/>
          <Tab.Screen name="Board" component={Board} options={{title: 'Play'}}/>
          <Tab.Screen name="Status" component={Status} options={{title: 'Leaderboards'}}/>

      </Tab.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
