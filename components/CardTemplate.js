import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Colors from '../utils/colors';
import firebase from 'firebase/compat';

const CardTemplate = ({ visitor}) => {
    function getTimeElapsed(arrivedTime) {
        const now = new Date();
        const elapsedTime = now.getTime() - new Date(arrivedTime).getTime();
        if (elapsedTime < 60000) {
          return `${Math.floor(elapsedTime / 1000)}s ago`;
        } else if (elapsedTime < 3600000) {
          return `${Math.floor(elapsedTime / 60000)}min ago`;
        } else if (elapsedTime < 86400000) {
          return `${Math.floor(elapsedTime / 3600000)}h ago`;
        } else if (elapsedTime < 604800000){
          return `${Math.floor(elapsedTime / 86400000)}d ago`;
        } else if (elapsedTime < 2629800000){
          return `${Math.floor(elapsedTime / 604800000)}w ago`;
        } else if (elapsedTime < 31557600000){
          return `${Math.floor(elapsedTime / 2629800000)}mo ago`;
        }else {
          return `${Math.floor(elapsedTime / 31557600000)}y ago`;
        }
    }

    const visitorRef = firebase.database().ref('praadiga').child('visitorsList');

    const onAccept = () => {
        const visitorNumber = visitor.visitorId.match(/\d+/)[0] - 1;
        // console.log('visitorNumber', visitorNumber);
        visitorRef.child(visitorNumber).update({acknowledged: true, ackStatus: true});
    };
    const onReject = () => {
        const visitorNumber = visitor.visitorId.match(/\d+/)[0] - 1;
        visitorRef.child(visitorNumber).update({acknowledged: true, ackStatus: false});
    };
  return (
    <View style={styles.container}>
      <Image source={{uri:visitor.image}} style={styles.image} />
      <View style={styles.buttonsContainer}>
        {/* <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>{visitor.visitorId}</Text> */}
        { visitor.automated ? 
            (
                <TouchableOpacity style={styles.acceptedButton} disabled>
                    <Text style={styles.buttonText}>Automated</Text>
                </TouchableOpacity>
            ):
            visitor.status && !visitor.acknowledged ?
            (
                <>
                    <TouchableOpacity style={styles.acceptButton} onPress={onAccept} >
                        <Text style={styles.buttonText}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rejectButton} onPress={onReject} >
                        <Text style={styles.buttonText}>Reject</Text>
                    </TouchableOpacity>
                </>
            ):
            !visitor.status && !visitor.acknowledged ?
            (
                <TouchableOpacity style={styles.timedOut} disabled>
                    <Text style={styles.buttonText}>Timed Out</Text>
                </TouchableOpacity>
            ):
            visitor.acknowledged && visitor.ackStatus ?
            (
                <TouchableOpacity style={styles.acceptedButton} disabled>
                    <Text style={styles.buttonText}>Accepted</Text>
                </TouchableOpacity>
            ):
            visitor.acknowledged && !visitor.ackStatus ?
            (
                <TouchableOpacity style={styles.rejectedButton} disabled>
                    <Text style={styles.buttonText}>Rejected</Text>
                </TouchableOpacity>
            ):<></>
            }
        
      </View>
      <Text style={styles.time}>{getTimeElapsed(visitor.timeArrived)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    margin:10
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 50,
    marginLeft: 16,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'flex-end',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginRight: 8,
  },
  acceptedButton: {
        backgroundColor: '#4caf50c1',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
        marginLeft: 30,
    },

  rejectButton: {
        backgroundColor: '#F44336',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
    },
  rejectedButton: {
        backgroundColor: '#F44336ca',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
        marginLeft: 30,
    },
    timedOut: {
        backgroundColor: '#FF9800ca',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
        marginLeft: 30,
    },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  time: {
    color: '#aaa',
    // bottom right
    position: 'absolute',
    right: 16,
    bottom: 16,
    fontSize: 12,
    },
});

export default CardTemplate;
