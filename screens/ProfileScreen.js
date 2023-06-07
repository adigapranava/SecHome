import { View, Text, Button, Alert } from 'react-native'
import React from 'react'
import { firebase } from '../firebase'
import { useState, useEffect } from 'react'
import Colors from '../utils/colors'
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { StyleSheet } from 'react-native'
import OwnerImages from '../components/ProfileScreen/OwnerImages'
import * as DocumentPicker from 'expo-document-picker';
import * as FaceDetector from 'expo-face-detector';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen({ route: { params: { userId } }}) {
    const navigation = useNavigation();
    const imagesRef = firebase.storage().ref(userId);
    const storageRef = firebase.storage().ref();
    const [images, setImages] = useState([]);
    const [imagesLoading, setImagesLoading] = useState(true);

    const deleteImages = async (image) => {
        console.log('deleting images');
        setImagesLoading(true)
        try {
            await firebase.storage().refFromURL(image).delete();
            console.log('Image deleted successfully');
            setImages(images.filter((img) => img !== image));
        } catch (error) {
            console.log('Error while deleting images:', error);
        }
        setImagesLoading(false);
    };

    const pickDocument = async () => {
                Alert.alert(
                    'Upload Image',
                    'Choose and Crop the Face of the Owner',
                    [
                        {
                            text: 'OK',
                            onPress: async () => {
                                console.log('picking document');
                                try {
                                    const result = await ImagePicker.launchImageLibraryAsync({
                                        mediaTypes: ImagePicker.MediaTypeOptions.Images,
                                        allowsEditing: true,
                                        aspect: [4, 4],
                                        quality: 1,
                                    });
                
                                    const result2 = result;
                                
                                    if (result2.canceled === false) {
                                        setImagesLoading(true);
                                        console.log('Document picked successfully');
                                        // const { uri } = result.;
                                        const response = await fetch(result2.assets[0].uri);
                                        const blob = await response.blob();
                
                                        // upload cropped image
                                        const documentRef = storageRef.child(userId+'/Owner/owner'+String(Math.floor(Math.random() * 1000) + 1)+'.jpg');
                                        await documentRef.put(blob);
                                        const url = await documentRef.getDownloadURL();
                                        setImages((images) => [...images, url]);
                                        console.log('Image uploaded successfully');
                                        
                                        setImagesLoading(false);
                                    } else {
                                        console.log('Document picking canceled.');
                                    }
                                } catch (error) {
                                    console.log('Unknown Error: ', error);
                                    setImagesLoading(false);
                                }                
                            }
                        }
                    ],
                );
            };
      

    useEffect(() => {
        setImages([]);
        setImagesLoading(true);
        imagesRef.child('Owner').listAll().then(function(res) {
            res.items.forEach(function(itemRef) {
                // console.log(itemRef);
                itemRef.getDownloadURL().then(function(url) {
                    setImages((images) => [...images, url]);
                });
            });
            setImagesLoading(false);
        }
        ).catch(function(error) {
            console.log(error);
        }
        );
        // console.log(images);
    }, []);


    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Profile',
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
    <>
    <View>
        <Text style={styles.userIdExt}> User Id: <Text style={styles.userId}>{userId}  </Text></Text>
        {images.length  == 0 && ! imagesLoading ?    
            <View style={{
                // center horizontally
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
                marginTop: 10,
                color: "#33d9b2",
            }}>
                <Text>No Images Uploaded</Text>
            </View>
        :
        <OwnerImages userId={userId} images={images} deleteImages={deleteImages} imagesLoading={imagesLoading}/>
        }
        <View style={{marginHorizontal: 40}}>
            {
                images.length < 2 ?
                <Button
                    title="Upload Image"
                    onPress={pickDocument}
                /> : <Button
                    title="Max Images Uploaded"
                    disabled
                />
            }
        </View>        
    </View>
    <View style={styles.logout}>
        <Button
            title="Logout"
            onPress={async () => {
                await AsyncStorage.removeItem('userId');
                // close the application
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'GetUserID' }],
                });
            }}
        />
    </View>
    </>
  )
}

const styles = StyleSheet.create({
    userIdExt: {
        fontSize: 20,
        textAlign: 'center',
        color: Colors.bg1,
        width: '95%',
        margin: 10,
    },
    userId: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.bg1,
        width: '95%',
        margin: 10,
    },
    // bottom of screen centered
    logout: {
        margin: 10,
        marginHorizontal: 40,
        position: 'absolute',
        bottom: 0,
        width: '80%',
    },
});