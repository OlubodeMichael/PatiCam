import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Button from '../components/UI/Button';

const Stack = createNativeStackNavigator();

export function OnboardingScreen1({ navigation }) {
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Capture the Magic of Every Moment!</Text>
          <Text style={styles.text}>Turn your events into vibrant albums filled with photos and videos from all your guests.</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Continue" onPress={() => navigation.navigate('scene2')} />
        </View>
      </View>
    );
}

export function OnboardingScreen2({ navigation }) {
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
            <Text style={styles.title}>Share Effortlessly Instant Photo Uploads</Text>
            <Text style={styles.text}>Guests can easily contribute their favorite moments in real-time with a simple QR code scan.</Text>
        </View>
        <View style={styles.buttonContainer}>
            <Button title="Continue" onPress={() => navigation.navigate('MainScreen')} />
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#3269F0',
      padding: 20,
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: 100,
    },
    buttonContainer: {
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingBottom: 40,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#fff',
      width: 300,
      textAlign: 'center',
      marginBottom: 20,
    },
    text: {
      fontSize: 16,
      color: '#fff',
      textAlign: 'center',
      marginBottom: 40,
    },
});


function OnboardingOverView() {
    return (
      <Stack.Navigator initialRouteName="scene1">
        <Stack.Screen 
          name="scene1" 
          component={OnboardingScreen1} 
          options={{ 
            headerShown: false,
            headerStyle: {
                backgroundColor: '#3269F0', // Blue background color for the header
            },
            headerTintColor: '#3269F0',
        }}
        />
        <Stack.Screen 
          name="scene2" 
          component={OnboardingScreen2}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
}

export default OnboardingOverView;
