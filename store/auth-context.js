import { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
    token: '',
    stayLoggedIn: false,
    isAuthenticated: false,
    authenticate: () => {},
    setStayLoggedIn: () => {},
    logout: () => {},
});

function AuthContextProvider({ children }) {
    const [authToken, setAuthToken] = useState(null);
    const [stayLoggedIn, setStayLoggedIn] = useState(false);

    const authenticate = async (token) => {
        setAuthToken(token);

        // Store the token in AsyncStorage
        await AsyncStorage.setItem('token', token);
    };

    const setStayLoggedInPreference = async (stayLoggedInOption) => {
        setStayLoggedIn(stayLoggedInOption);

        // Store the stayLoggedIn preference in AsyncStorage
        await AsyncStorage.setItem('stayLoggedIn', stayLoggedInOption.toString());
    };

    const logout = async () => {
        setAuthToken(null);
        setStayLoggedIn(false);

        // Remove token and stayLoggedIn preference from AsyncStorage
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('stayLoggedIn');
    };

    const value = {
        token: authToken,
        isAuthenticated: !!authToken,
        stayLoggedIn: stayLoggedIn,
        authenticate: authenticate,
        setStayLoggedInPreference: setStayLoggedInPreference,
        logout: logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
