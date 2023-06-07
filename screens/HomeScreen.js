import { View, Text, ScrollView, Button } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import Colors from '../utils/colors'
import {firebase} from '../firebase';
import { useState, useEffect } from 'react';
import { StyleSheet,TouchableOpacity, ActivityIndicator } from 'react-native'
import CardTemplate from '../components/CardTemplate';


export default function HomeScreen({ route: { params: { userId } }}) {
    const navigation = useNavigation();

    const [visitors, setVisitors] = useState([]);
    const [loading, setLoading] = useState(true);
    const visitorRef = firebase.database().ref(userId).child('visitorsList');


    useEffect(() => {
        visitorRef.on('value', (snapshot) => {
            const visitors = snapshot.val();
            const visitorsList = [];
            for (let id in visitors) {
                visitorsList.push({visitorId: id, ...visitors[id]});
            }
            // reverse the array to show the latest visitor first
            visitorsList.reverse();
            // add only 5 visitors
            setVisitors(visitorsList.slice(0, 5));
            setLoading(false);
        });
    }, []);

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
    
  return (
    < >
        {/* show about our app */}
        <View style={styles.top}>
            <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>Hello!</Text>
            <Text style={styles.paragraph}>
               &nbsp;&nbsp;&nbsp; Welcome to our Smart Door Lock System app! Experience the future of home security. Seamlessly connect with our state-of-the-art smart door lock.
                Control and monitor your door lock from anywhere.
            </Text>
            {/* know more about us */}
            <TouchableOpacity
                style={styles.aboutUs}
                onPress={() => navigation.navigate('AboutUs')}
                >
                    <Text style={{color: Colors.bg1, fontWeight: 'bold'}}> About Us</Text>
                </TouchableOpacity>
        </View>
        {/* show some visitors */}
            <Text style={{fontSize: 20, marginBottom: 10, marginLeft: 10}}>Recent Visitors</Text>
        <ScrollView style={{marginBottom: 50}}>
            {/* show loading indicator */}
            {
            loading ? 
                <ActivityIndicator size="large" color={Colors.bg1} /> : 
            (
                visitors.map((visitor) => (
                        <CardTemplate key={visitor.visitorId} visitor={visitor} />
                    ))
            )}
        </ScrollView>
        {/* bottom nav */}
        <View style={styles.BottomView}>
        {/* button to go to visitos screen */}
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Visitors', {userId: userId})}
        >
            <Text style={styles.text}>Visitors</Text>
        </TouchableOpacity>
        {/* button to go to Profile screen */}
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Profile', {userId: userId})}
        >
            <Text style={styles.text}>Profile</Text>
        </TouchableOpacity>
        </View>
    </>
  )
}

const styles = StyleSheet.create({
    top: {
        backgroundColor: "#fff",
        padding: 20,
        margin: 10,
        borderRadius: 10,
    },
    paragraph: {
        fontSize: 16,
        fontWeight: '300',
        color: Colors.bg2,
        textAlign: 'justify',
    },
    aboutUs: {
        marginTop: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: Colors.text1,
        width: 100,
        alignItems: 'center',
        // right align
        alignSelf: 'flex-end',
    },
    BottomView: {
        width: '100%',
        height: 60,
        backgroundColor: Colors.bg2,
        // diesplay buttons horizontally
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
    },
    // button takes all the space available
    button: {
        flex: 1,
        backgroundColor: Colors.bg1,
        padding: 10,
        margin: 5,
        borderRadius: 10,
        alignContent: 'center',
        justifyContent: 'center',
    },
    text: {
        color: Colors.text1,
        textAlign: 'center',
        fontSize: 18,
        // not bold
        fontWeight: '200',
    },
});