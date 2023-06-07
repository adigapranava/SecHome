import React, { useState , useLayoutEffect} from 'react';
import { View, TextInput, Button, StyleSheet, Text} from 'react-native';
import Colors from '../utils/colors';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// props = {setUserId: setUserId}
const GetUserID = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Home',
            headerStyle: {
                backgroundColor: Colors.bg1,
            },
            headerTintColor: Colors.text1,
            headerTitleStyle: {
                fontWeight: 'bold',
                fontFamily: 'sans-serif',
            },
        });
    }, [navigation]);
    const [userIdTemp, setUserIdTemp] = useState('');

    const handleUserIdSubmit = async () => {
        // remove all spaces from userIdTemp
        await AsyncStorage.setItem('userId', userIdTemp.replace(/\s/g, ''));
        navigation.navigate('Home', {userId: userIdTemp.replace(/\s/g, '')});
    };

    return (
        <View className="flex-1 bg-bg1 justify-center items-center" style={styles.container}>
            <Text className="text-text1 text-2xl mb-4">Enter User ID</Text>
            <TextInput
                className="w-64 h-10 bg-bg2 text-text1 p-2 mb-4 rounded"
                style={styles.input}
                placeholder="Enter User ID"
                placeholderTextColor={Colors.text1}
                value={userIdTemp}
                onChangeText={setUserIdTemp}
            />
            <Button
                title="Submit"
                onPress={handleUserIdSubmit}
                className="py-2 px-4 rounded"
                style={styles.button}
            />
        </View>

    );
};

const styles = {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      // other container styles
    },
    input: {
      width: '80%',
      height: 40,
      borderWidth: 1,
      borderColor: 'gray',
      marginBottom: 10,
      // other input styles
    },
    button: {
      backgroundColor: 'blue',
      color: 'white',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 5,
      // other button styles
    },
  };
  

export default GetUserID;
