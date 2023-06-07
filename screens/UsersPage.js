import { View, Text } from 'react-native'
import React from 'react'
// import { firebase } from '../src/f/irebase/config'
import { firebase } from '../firebase'
import { useState, useEffect } from 'react'

export default function UsersPage({ route: { params: { userId } }}) {
    const [visitors, setVisitors] = useState([]);
    console.log('userId', userId);

    useEffect(() => {
        const db = firebase;
    }, [])
  return (
    <View>
      <Text>UsersPage</Text>
        <Text>{userId}</Text>
    </View>
  )
}