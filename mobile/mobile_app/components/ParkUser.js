import React, {useState, useEffect} from 'react';
import { Dimensions, StyleSheet, Alert, SafeAreaView, Button, TextInput, Text} from 'react-native';
import Firebase from '../config/firebase';
import ParkyHeader from './ParkyHeader';
import { useHistory } from "react-router-dom";


// page 2, 3

export default function ParkUser() {
    let history = useHistory();

    const [garageName, setGarage] = useState(null);
    const [spotNumber, setSpot] = useState(-1);
    const [isParked, setParkStatus] = useState(false);
    // change when deployed
    const baseurl = 'http://localhost:5000';

    const handleGarage = (garage) => {
        setGarage(garage);
    }

    const handleSpot = (spot) => {
        setSpot(spot);            
    }

    const parkUser = (garageName, spotNumber) => {
        // call parkSpot API 
        const url = baseurl + 'garages/parkSpot';
        /*fetch(url, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: {
                "garageName": garageName,
                "spotNumber": spotNumber
            }
        })
        .then(function(res) {
            if (res.success) {
                setParkStatus(true);
                // MIGHT have to call useEffect to refresh this once status is set
                console.log("User has been parked")
            }
            else {
                console.log("error, couldn't park the user") // ADD AN ERROR ALERT HERE
            }
        })
        .catch(err => {console.log(err)}); // ADD AN ERROR ALERT HERE 
        */
    
        setParkStatus(true);
    }

    const handlePress = () => {
        if (garageName === null) {
            Alert.alert(
                "Invalid garage name!",
                "Please enter a valid garage",
                [
                    {
                        text: "Dismiss",
                        style: "cancel"
                    }
                ]
            )
        }
        else if (spotNumber <= 0) {
            console.log("error, garagename and spotnumber are required!")
            Alert.alert(
                "Invalid spot number!",
                "Please enter a valid spot",
                [
                    {
                        text: "Dismiss",
                        style: "cancel"
                    }
                ]
            )
        }
        else {
            parkUser(garageName, spotNumber);
        }
    }

    const handleLeave = () => {
        const url = baseurl + '/leaveSpot';
        // call leave spot API 
        /*fetch(url, {
            method: 'post',
            body: {"garageName": garageName, "spotNumber": spotNumber}
        })
        .then(function (res) {
            if (res.success) {
                console.log("Left spot")
                // redirect to homepage
            }
            else {
                console.log('error')
            }
            
        })
        .catch(err => {console.log(err)});
        */
        setParkStatus(false);
        history.push('/');

    }
    
    let text2 = " Spot: " + spotNumber;

    return (
        <SafeAreaView style={styles.container}>
            <ParkyHeader/>
            <SafeAreaView style={styles.container}>
            {
                isParked 
                ?
                <SafeAreaView style={styles.container}>
                    <SafeAreaView style={styles.container}>
                        <Text style = {styles.text}>
                            {garageName}
                        </Text>
                        <Text style = {styles.text}>
                            {text2}
                        </Text>
                    </SafeAreaView>
                    <Button
                    title="Leave spot"
                    onPress={handleLeave}
                    />
                </SafeAreaView>
                :
                <SafeAreaView style={styles.container}>
                    <SafeAreaView style={styles.container}>
                        <TextInput
                            style={styles.input}
                            textAlign="center"
                            placeholder="Enter the garage name"
                            onChangeText={handleGarage}
                            secureTextEntry={false}
                            keyboardAppearance = "dark"
                        />
                        <TextInput
                            style={styles.input}
                            textAlign="center"
                            placeholder="Enter your spot number"
                            keyboardAppearance = "dark"
                            secureTextEntry={false}
                            onChangeText={handleSpot}
                        />
                        <Button
                            title="Park Me"
                            color = '#ebbd34'
                            onPress={handlePress}
                        />
                    </SafeAreaView>
                    <Button
                        title="Return to home"
                        color = '#ebbd34'
                        onPress={() => history.push('/')}
                    />
                </SafeAreaView>
            }
            </SafeAreaView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      width: 200,
      margin: 12,
      borderWidth: 1,
      backgroundColor: 'white',
    },
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
      },
    text: {
        color: "white",
        fontSize: 20
    }
  });