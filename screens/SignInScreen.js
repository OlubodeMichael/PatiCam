import { StyleSheet, View, Alert } from "react-native";
import { useState, useContext } from "react";
import SignInForm from "../components/ManageForm/SignInForm";
import { createUser } from "../Utils/auth";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { AuthContext } from "../store/auth-context";

function SignInScreen() {
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const AuthCtx = useContext(AuthContext)

    const submitHandler = async ({ email, password }) => {
        setIsAuthenticating(true);
        try {
            const token = await createUser(email, password);
            AuthCtx.authenticate(token)
        } catch (e) {
            Alert.alert(
                'Authentication failed',
                'Could not create user, please check your input and try again'
            )
            setIsAuthenticating(false);
        }
        
    };

    if (isAuthenticating) {
        return <LoadingOverlay message="Creating user..." />;
    }

    return (
        <View style={styles.container}>
            <SignInForm  onAuthenticate={submitHandler}/>
        </View>
    );
}

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center", // Center the content vertically
    },
});
