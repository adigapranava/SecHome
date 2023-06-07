import React from 'react'
import Colors from '../utils/colors'
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';

// load ttf file
import * as Font from 'expo-font';

export default function ProfileScreen() {
    const navigation = useNavigation();
    const [fontLoaded, setFontLoaded] = React.useState(false);

    Font.loadAsync({
        'cinzel-regular': require('../assets/font.ttf'),
    }).then(() => {
        console.log('Fonts loaded');
        // update font family
        setFontLoaded(true);
    });


    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'About Us',
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
    fontLoaded ?
    (
        <View style={styles.container}>
            <Image
            source={require('../assets/banner.jpeg')}
            style={styles.bannerImage}
            />
            <Image
            source={require('../assets/logo.png')}
            style={styles.profilePicture}
            />
            <View style={styles.content}>
            <Text style={styles.teamName}>Team Pcube</Text>

            <View style={styles.developersContainer}>
            <View style={styles.developer}>
                <Image
                source={require('../assets/pranava.jpeg')}
                style={styles.developerImage}
                />
                <Text style={styles.developerName}>Pranava </Text>
                <Text style={styles.developerInsta}>@adiga_pranava</Text>
            </View>
            <View style={styles.developer}>
                <Image
                source={require('../assets/praneetha2.jpeg')}
                style={styles.developerImage}
                />
                <Text style={styles.developerName}>Praneetha</Text>
                <Text style={styles.developerInsta}>@praneetha.acharya</Text>
            </View>
            <View style={styles.developer}>
                <Image
                source={ require('../assets/prathviraj.jpeg')}
                style={styles.developerImage}
                />
                <Text style={styles.developerName}>Prathvi</Text>
                <Text style={styles.developerInsta}>@its.prathvi</Text>
            </View>
            </View>
            </View>
        </View>
    ) : (
        <ActivityIndicator size="large" color={Colors.bg1} />
    )
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
    position: 'absolute',
    backgroundColor: Colors.bg1,
    padding: 50,
    top: 160,
    left: '50%',
    marginLeft: -60,
  },
  content: {
    padding: 20,
    marginTop: 65,
  },
    teamName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: Colors.bg1,
        // load the imported font
        fontFamily: 'cinzel-regular',
    },
    developersContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
      },
      developer: {
        alignItems: 'center',
      },
      developerImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
      },
      developerName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
      },
      developerInsta: {
        fontSize: 14,
        color: '#666',
        marginTop: 3,
      },
});