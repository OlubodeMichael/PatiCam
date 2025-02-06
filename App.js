import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, View, Text } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from 'react-native-vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useContext, useState, useEffect } from 'react'
import OnboardingOverView from './screens/Onboarding';
import MainScreen from './screens/MainScreen';
import LoadingOverlay from './components/UI/LoadingOverlay';
import LoginScreen from './screens/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import AlbumScreen from './screens/AlbumScreen';
import AddScreen from './screens/AddScreen';
import SettingScreen from './screens/Settings';
import { AuthContext, AuthContextProvider } from './store/auth-context';
import { AlbumContextProvider } from './store/album-context';
import { TabBar } from '@react-navigation/material-top-tabs';
import { auth, database } from './Utils/firebase';

const Stack = createNativeStackNavigator();
const BottomTabs = createMaterialBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();

function HomeOverview() {
  return (
    <BottomTabs.Navigator 
      initialRouteName="Home"
      activeColor="#3269F0"
      inactiveColor="#888888"
      shifting={false}
      barStyle={{
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      }}
    >
      <BottomTabs.Screen 
        name="Album" 
        component={AlbumScreen} 
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="albums" size={24} color={color}/>
          ),
          tabBarLabel: 'Albums',
        }}
      />
      <BottomTabs.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={26} color={color}/>
          ),
          tabBarLabel: 'Home',
        }}
      />
      <BottomTabs.Screen 
        name="Setting" 
        component={SettingScreen} 
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={24} color={color}/>
          ),
          tabBarLabel: 'Settings',
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
      <Stack.Screen 
            name="AddScreen"
            component={AddScreen}
            options={{
              presentation: 'modal',
              headerShown: false,

            }}
          />
    </Stack.Navigator>
  )
}



function AuthOverview() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="SignInScreen" 
        component={SignUpScreen}
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
  const authCtx = useContext(AuthContext);
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
    return <View><Text>Loading...</Text></View>;
  }

  return (
    <>
      <StatusBar style="auto" />
      <AuthContextProvider>
        <AlbumContextProvider>
          <Root />
        </AlbumContextProvider>
      </AuthContextProvider>
    </>
  );
}

