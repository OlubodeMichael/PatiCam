import { initializeApp, getApps } from "firebase/app";
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import { getDatabase } from "firebase/database";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3VRTYNIjbONFc3B90ekwD8Dt-DetKiSA",
  authDomain: "paticam.firebaseapp.com",
  databaseURL: "https://paticam-default-rtdb.firebaseio.com",
  projectId: "paticam",
  storageBucket: "paticam.firebasestorage.app",
  messagingSenderId: "615940930388",
  appId: "1:615940930388:web:2c352bd0d27a87f2eae6c1"
};

// Initialize Firebase only if no apps exist
let app;
let auth;
let database;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
  database = getDatabase(app);
} else {
  app = getApps()[0];
  auth = getAuth(app);
  database = getDatabase(app);
}

export { auth, database };
export default app;
