import { View, Text } from 'react-native'
import React from 'react'
import { firebase } from '../firebase'
import { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'
import CardTemplate from '../components/CardTemplate'
import Colors from '../utils/colors'
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';


export default function VisitorsScreen({ route: { params: { userId } }}) {
    const navigation = useNavigation();

    const [visitors, setVisitors] = useState([]);
    const visitorRef = firebase.database().ref(userId).child('visitorsList');

    useEffect(() => {
        visitorRef.on('value', (snapshot) => {
            const visitors = snapshot.val();
            const visitorsList = [];
            for (let id in visitors) {
                visitorsList.push(visitors[id]);
            }
            // reverse the array to show the latest visitor first
            visitorsList.reverse();
            setVisitors(visitorsList);
        });
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Visitors',
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
    <ScrollView>
      {/* loop through visitorsList */}
      {visitors.map((visitor) => (
        <CardTemplate
          key={visitor.visitorId}
          visitor={visitor}
          userId={userId}
        />
      ))}
    </ScrollView>
  )
}