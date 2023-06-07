import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { firebase } from './firebase';

import GetUserID from './screens/GetUserID';
import HomeScreen from './screens/HomeScreen';
import UsersPage from './screens/UsersPage';
import VisitorsScreen from './screens/VisitorsScreen';
import ProfileScreen from './screens/ProfileScreen';
import AboutUs from './screens/AboutUs';

const Stack = createNativeStackNavigator();

export default function App() {
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);
  const [firstScreen, setFirstScreen] = useState('');

  useEffect(() => {
    checkUserId();
  }, []);

  const checkUserId = async () => {
    try {
      const value = await AsyncStorage.getItem('userId');
      if (value !== null) {
        setUserId(value);
        setFirstScreen('Home');
      } else {
        setFirstScreen('GetUserID');
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <NavigationContainer>
        {loading ? (
            <View style={styles.container}>
              <Text>Loading...</Text>
            </View>
        ) : firstScreen && (
            <Stack.Navigator initialRouteName={firstScreen}>
              <Stack.Screen name="GetUserID" component={GetUserID}
              />
              <Stack.Screen 
                name="Home" 
                component={HomeScreen} 
                initialParams={{ userId: userId }}
                />
              <Stack.Screen name="Visitors" component={VisitorsScreen}
                initialParams={{ userId: userId}} />
              <Stack.Screen name="Profile" component={ProfileScreen}
                initialParams={{ userId: userId}} />
              <Stack.Screen name="AboutUs" component={AboutUs}/>
            </Stack.Navigator>
        )}
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
