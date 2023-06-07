import { View, Text } from 'react-native'
import React from 'react'
import colors from '../utils/colors'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';

export default function Users({userId}) {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text 
                style={styles.button}
                onPress={()=> {navigation.navigate('Users'), {userId: userId}}}
            >Users</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     width: '100%',
    // },
    button: {
        backgroundColor: colors.bg2,
        color: colors.text1,
        padding: 10,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        width: '95%',
        margin: 10,
    },
});