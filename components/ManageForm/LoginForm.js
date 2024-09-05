import { View, Alert, StyleSheet } from "react-native";
import { useState } from "react";
import Title from "../UI/Title";
import Input from "./Input";
import Button from "../UI/Button";
import AuthLogin from "../UI/AuthLogin";

function LoginForm() {
    const [enteredEmail, setEnteredEmail] = useState({
        value: '',
        isInvalid: false
    });
    const [enteredPassword, setEnteredPassword] = useState({
        value: '',
        isInvalid: false
    });

    const submit = () => {
        // Trim the values
        const trimmedEmail = enteredEmail.value.trim();
        const trimmedPassword = enteredPassword.value.trim();

        // Validate inputs
        const emailIsValid = trimmedEmail.includes('@');
        const passwordIsValid = trimmedPassword.length > 6;

        // Update the isInvalid flags based on validation
        setEnteredEmail((prev) => ({
            ...prev,
            isInvalid: !emailIsValid
        }));
        setEnteredPassword((prev) => ({
            ...prev,
            isInvalid: !passwordIsValid
        }));
        
        if (!emailIsValid || !passwordIsValid) {
            let message = 'Please check your entered';
        
            if (!emailIsValid && !passwordIsValid) {
                message += ' email address and password.';
            } else if (!emailIsValid) {
                message += ' email address.';
            } else if (!passwordIsValid) {
                message += ' password.';
            }
        
            Alert.alert('Invalid input', message);
            return;
        }
        
        // If everything is valid, proceed
        console.log(`Email: ${trimmedEmail}, Password: ${trimmedPassword}`);
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Title title="Sign in to Pati Cam" />
                <View style={styles.inputContainer}>
                    <Input 
                        label="Email Address"
                        isInvalid={enteredEmail.isInvalid}
                        textInputConfig={{
                            placeholder: "Your email",
                            value: enteredEmail.value,
                            onChangeText: (text) => {
                                setEnteredEmail({
                                    value: text,
                                    isInvalid: false 
                                });
                            }
                        }}
                    />
                    <Input 
                        label="Password"
                        isInvalid={enteredPassword.isInvalid}
                        textInputConfig={{
                            placeholder: "Your password",
                            secureTextEntry: true,
                            value: enteredPassword.value,
                            onChangeText: (text) => {
                                setEnteredPassword({
                                    value: text,
                                    isInvalid: false 
                                });
                            }
                        }}
                    />
                </View>
            </View>
            <AuthLogin onPress={submit} title="Sign In"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between', // Position children with space between them
    },
    form: {
        flex: 1, // Takes up available space
    },
    inputContainer: {
        marginBottom: 20, // Add some spacing between inputs and the button
    },
});

export default LoginForm;
