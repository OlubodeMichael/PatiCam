import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from 'react-native-vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import OnboardingOverView from './screens/Onboarding';
import MainScreen from './screens/MainScreen';
import LoginScreen from './screens/LoginScreen';
import SignInScreen from './screens/SignInScreen';


const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();

function AppOverview() {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen name="Screen1" component={Screen1} />
      <BottomTabs.Screen name="Screen2" component={Screen2} />
      <BottomTabs.Screen name="Screen3" component={Screen3} />
    </BottomTabs.Navigator>
  );
}

function AuthOverview() {
  return (
    <Tab.Navigator options={{
      headerShown: false
    }}>
      <Tab.Screen 
        name="SignInScreen" 
        component={SignInScreen}
        options={{
          tabBarLabel: 'Sign Up'
        }}
      />
      <Tab.Screen 
        name="LoginScreen" 
        component={LoginScreen} 
        options={{
          tabBarLabel: 'Sign In'
        }}
      />
      
    </Tab.Navigator>
  )
}



export default function App() {
  const [fontsLoaded] = useFonts({
    'new-york': require('./assets/fonts/NewYork.otf'),
  });

  if (!fontsLoaded) {
    return <View><Text>Loading...</Text></View>; // Or a splash screen component
  }

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="OnboardingScreen" 
            component={OnboardingOverView} 
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen 
            name="MainScreen" 
            component={MainScreen} 
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen 
            name="AuthOverview" 
            component={AuthOverview} 
            options={({ navigation }) => ({
              headerBackTitle: 'Back',
              headerTitle: '', 
              headerBackTitleVisible: false,
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name="arrow-back-outline" size={24} color="black" />
                </TouchableOpacity>
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
 
});
