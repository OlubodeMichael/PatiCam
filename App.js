import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import OnboardingOverView from './screens/Onboarding';
import MainScreen from './screens/MainScreen';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function AppOverview() {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen name="Screen1" component={Screen1} />
      <BottomTabs.Screen name="Screen2" component={Screen2} />
      <BottomTabs.Screen name="Screen3" component={Screen3} />
    </BottomTabs.Navigator>
  );
}



export default function App() {
  useFonts({
    'new-york': require('./assets/fonts/NewYork.otf')
  })
  return (
    <>
        <StatusBar style="light" />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen 
              name="OnboardingScreen" 
              component={OnboardingOverView} 
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen name="MainScreen" component={MainScreen} options={{
              headerShown: false,
            }}/>
          </Stack.Navigator>
        </NavigationContainer>

    </>
  );
}

const styles = StyleSheet.create({
 
});
