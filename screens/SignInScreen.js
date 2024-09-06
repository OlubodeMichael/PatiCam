import { StyleSheet, View, Alert } from "react-native";
import { useState } from "react";
import SignInForm from "../components/ManageForm/SignInForm";
import { createUser } from "../Utils/auth";
import LoadingOverlay from "../components/UI/LoadingOverlay";

function SignInScreen() {
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const submitHandler = async ({ email, password }) => {
        setIsAuthenticating(true);
        try {
            await createUser(email, password);
        } catch (error) {
            Alert.alert("Authentication failed", "Could not create user, please try again later.");
            setIsAuthenticating(false);
            return;
        }
        setIsAuthenticating(false);
    };

    if (isAuthenticating) {
        return <LoadingOverlay message="Creating user..." />;
    }

    return (
        <View style={styles.container}>
            <SignInForm onAuthenticate={submitHandler} />
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
