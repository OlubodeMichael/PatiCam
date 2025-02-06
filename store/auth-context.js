import { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, database } from '../Utils/firebase';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    EmailAuthProvider,
    reauthenticateWithCredential,
    deleteUser 
} from 'firebase/auth';
import { ref, set, get, remove } from 'firebase/database';

export const AuthContext = createContext({
    token: '',
    userId: '',
    userData: null,
    stayLoggedIn: false,
    isAuthenticated: false,
    authenticate: (token) => {},
    createUser: (email, password, userData) => {},
    setStayLoggedIn: () => {},
    logout: () => {},
    deleteAccount: (password) => {},
});

export function AuthContextProvider({ children }) {
    const [authToken, setAuthToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userData, setUserData] = useState(null);
    const [stayLoggedIn, setStayLoggedIn] = useState(false);

    const createUser = async (email, password, userData) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;
            
            // Store user data in Firebase Realtime Database
            const userRef = ref(database, `users/${uid}/profile`);
            await set(userRef, {
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: email,
                createdAt: new Date().toISOString(),
            });

            setUserId(uid);
            setUserData({
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: email,
            });

            return uid;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    };

    function authenticate(token) {
        if (!token) {
            console.error('Attempted to authenticate with null/undefined token');
            return;
        }
        setAuthToken(token);
        AsyncStorage.setItem('token', token);
    }

    const setStayLoggedInPreference = async (stayLoggedInOption) => {
        setStayLoggedIn(stayLoggedInOption);
        await AsyncStorage.setItem('stayLoggedIn', stayLoggedInOption.toString());
    };

    function logout() {
        setAuthToken(null);
        AsyncStorage.removeItem('token');
    }

    const deleteAccount = async (password) => {
        try {
            const user = auth.currentUser;
            if (!user) {
                throw new Error('No user is currently signed in');
            }

            // Re-authenticate user before deletion
            const credential = EmailAuthProvider.credential(
                user.email,
                password
            );
            await reauthenticateWithCredential(user, credential);

            try {
                // Delete user data from Realtime Database
                const userRef = ref(database, `users/${user.uid}`);
                await remove(userRef);
            } catch (dbError) {
                console.log('Error deleting user data:', dbError);
                // Continue with account deletion even if database deletion fails
            }

            try {
                // Delete user's albums if they exist
                const albumsRef = ref(database, `albums/${user.uid}`);
                await remove(albumsRef);
            } catch (albumError) {
                console.log('Error deleting albums:', albumError);
                // Continue with account deletion even if albums deletion fails
            }

            // Delete the user account
            await deleteUser(user);

            // Clear local storage and state
            await AsyncStorage.clear();
            setAuthToken(null);
            setUserId(null);
            setUserData(null);
            setStayLoggedIn(false);

        } catch (error) {
            console.error('Delete account error:', error);
            if (error.code === 'auth/wrong-password') {
                throw new Error('Incorrect password. Please try again.');
            } else if (error.code === 'auth/requires-recent-login') {
                throw new Error('Please log out and log in again before deleting your account.');
            } else if (error.message.includes('PERMISSION_DENIED')) {
                // If we get a permission error, still try to delete the auth account
                try {
                    await deleteUser(auth.currentUser);
                    await AsyncStorage.clear();
                    setAuthToken(null);
                    setUserId(null);
                    setUserData(null);
                    setStayLoggedIn(false);
                } catch (finalError) {
                    throw new Error('Failed to delete account. Please contact support.');
                }
            } else {
                throw new Error('Failed to delete account. Please try again later.');
            }
        }
    };

    const value = {
        token: authToken,
        userId: userId,
        userData: userData,
        isAuthenticated: !!authToken,
        stayLoggedIn: stayLoggedIn,
        authenticate: authenticate,
        createUser: createUser,
        setStayLoggedInPreference: setStayLoggedInPreference,
        logout: logout,
        deleteAccount: deleteAccount,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
