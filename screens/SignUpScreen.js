import { StyleSheet, View, Alert } from "react-native";
import { useState, useContext } from "react";
import SignUpForm from "../components/ManageForm/SignUpForm";
import { createUser } from "../Utils/auth";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { AuthContext } from "../store/auth-context";

function SignUpScreen() {
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const AuthCtx = useContext(AuthContext);

    const submitHandler = async ({ email, password }) => {
        setIsAuthenticating(true);
        try {
            const { token, userData } = await createUser(email, password);
            
            if (!token) {
                throw new Error('Failed to get authentication token');
            }
            
            AuthCtx.authenticate(token);
        } catch (error) {
            setIsAuthenticating(false);
            
            let message = 'Could not create user, please check your input and try again';
            if (error.code === 'auth/email-already-in-use') {
                message = 'This email is already registered. Please use a different email or try signing in.';
            }
            
            Alert.alert('Authentication failed', message);
            console.error('SignUp Error:', error);
        }
    };

    if (isAuthenticating) {
        return <LoadingOverlay message="Creating user..." />;
    }

    return (
        <View style={styles.container}>
            <SignUpForm onAuthenticate={submitHandler}/>
        </View>
    );
}

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
});
