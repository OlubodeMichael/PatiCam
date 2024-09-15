import { StatusBar } from 'expo-status-bar';
import {  TouchableOpacity, View, Text } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from 'react-native-vector-icons';
import { GlobalStyles } from './constants/styles';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useContext, useState, useEffect } from 'react'
import OnboardingOverView from './screens/Onboarding';
import AppLoading from 'expo-app-loading';
import MainScreen from './screens/MainScreen';
import LoadingOverlay from './components/UI/LoadingOverlay';
import LoginScreen from './screens/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignInScreen from './screens/SignInScreen';
import HomeScreen from './screens/HomeScreen';
import AlbumScreen from './screens/AlbumScreen';
import SettingScreen from './screens/Settings';
import AuthContextProvider, { AuthContext } from './store/auth-context';



const Stack = createNativeStackNavigator();
const BottomTabs = createMaterialBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();

function HomeOverview() {
  return (
    <BottomTabs.Navigator 
      barStyle={{ backgroundColor: GlobalStyles.colors.primary500 }}
      inactiveColor="white"
    >
      <BottomTabs.Screen 
        name="Album" 
        component={AlbumScreen} 
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name="albums" size={24} color={color}/>
          ),
          tabBarLabel: ''
        }}
      />
      <BottomTabs.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name="home" size={26} color={color}/>
          ),
          tabBarLabel: ''
        }}
      />
      <BottomTabs.Screen 
        name="Setting" 
        component={SettingScreen} 
        barStyle={{

        }}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name="settings" size={24} color={color}/>
          ),
          tabBarLabel: ''
        }}
      />
    </BottomTabs.Navigator>
  );
}


function AuthenticatedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={HomeOverview} options={{
        headerShown: false
      }}/>
    </Stack.Navigator>
  )
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

function AuthStack() {
  return (
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
  )
}

function Navigation() {
  const authCtx = useContext(AuthContext)
  return(
    <NavigationContainer>
        {!authCtx.isAuthenticated && <AuthStack />}
        {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  )
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchAuthData() {
      const storedToken = await AsyncStorage.getItem('token');
      const stayLoggedIn = await AsyncStorage.getItem('stayLoggedIn'); // Fetch stayLoggedIn preference

      // Parse the stayLoggedIn value from string to boolean
      const stayLoggedInBool = stayLoggedIn === 'true';

      if (storedToken && stayLoggedInBool) {
        // If a token exists and stayLoggedIn is true, authenticate the user
        authCtx.authenticate(storedToken);
      }

      setIsTryingLogin(false);
    }

    fetchAuthData();
  }, []);

  if (isTryingLogin) {
    return <LoadingOverlay message="Loading..." />;
  }

  return <Navigation />;
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
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}

