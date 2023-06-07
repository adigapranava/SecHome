import { View, Text, Button } from 'react-native'
import React from 'react'
// import colors from '../utils/colors'
import { StyleSheet, ActivityIndicator } from 'react-native'
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import colors from '../../utils/colors';

export default function OwnerImages({userId, images, deleteImages, imagesLoading}) {
    // console.log('images', images);
    if (imagesLoading) {
        return (
            <View style={styles.imageContainer}>
                <ActivityIndicator size="large" color={colors.bg1} />
            </View>

        ) 
    }
    else {
        return (
            <View style={styles.imageContainer}>
                {images.map((image, index) => (
                    <View key={index} style={styles.cardContainer}>
                    <Image
                        source={{uri: image}}
                        style={styles.image}
                    />
                    <TouchableOpacity style={styles.deleteButton}
                        onPress={() => {
                            deleteImages(image);
                        }}
                    >
                        <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>

                    </View>
                ))}
            </View>
        )
            }
}

const styles = StyleSheet.create({
    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        margin: 10,
    },
    cardContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 220,
        margin: 10,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    image: {
        width: 140,
        height: 150,
        margin: 10,
        borderRadius: 10,
    },
    deleteButton: {
        backgroundColor: 'red',
        width: 100,
        height: 30,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteButtonText: {
        color: colors.text1
    },
});
