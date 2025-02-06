import { View, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useState, useContext } from "react";
import Title from "../UI/Title";
import Input from "./Input";
import Privacy from "../UI/Privacy";
import AuthLogin from "../UI/AuthLogin";
import LoadingOverlay from "../UI/LoadingOverlay";
import { AuthContext } from '../../store/auth-context';

function SignUpForm({ onAuthenticate }) {
    const authCtx = useContext(AuthContext);
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [agree, setAgree] = useState(false);
    
    const [firstName, setFirstName] = useState({ value: '', isInvalid: false });
    const [lastName, setLastName] = useState({ value: '', isInvalid: false });
    const [email, setEmail] = useState({ value: '', isInvalid: false });
    const [password, setPassword] = useState({ value: '', isInvalid: false });
    const [passwordConfirmation, setPasswordConfirmation] = useState({ value: '', isInvalid: false });

    const handlePrivacy = (isAgree) => {
        setAgree(isAgree);
    };

    const updateField = (setter, value) => {
        setter({
            value: value.trim(),
            isInvalid: false
        });
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const submit = async () => {
        if (isAuthenticating) return;

        // Trim all values
        const trimmedData = {
            firstName: firstName.value.trim(),
            lastName: lastName.value.trim(),
            email: email.value.trim(),
            password: password.value.trim(),
            passwordConfirmation: passwordConfirmation.value.trim()
        };

        // Basic validation
        const errors = {
            firstName: !trimmedData.firstName,
            lastName: !trimmedData.lastName,
            email: !validateEmail(trimmedData.email),
            password: trimmedData.password.length < 6,
            passwordConfirmation: trimmedData.password !== trimmedData.passwordConfirmation
        };

        // Update state for invalid fields
        setFirstName(prev => ({ ...prev, isInvalid: errors.firstName }));
        setLastName(prev => ({ ...prev, isInvalid: errors.lastName }));
        setEmail(prev => ({ ...prev, isInvalid: errors.email }));
        setPassword(prev => ({ ...prev, isInvalid: errors.password }));
        setPasswordConfirmation(prev => ({ ...prev, isInvalid: errors.passwordConfirmation }));

        if (Object.values(errors).some(Boolean)) {
            Alert.alert('Invalid Input', 'Please check the form and correct any errors.');
            return;
        }

        if (!agree) {
            Alert.alert('Agreement Required', 'You must agree to the privacy policy.');
            return;
        }

        setIsAuthenticating(true);
        try {
            const userData = {
                firstName: trimmedData.firstName,
                lastName: trimmedData.lastName,
                email: trimmedData.email,
            };

            // Create user in Firebase
            await authCtx.createUser(trimmedData.email, trimmedData.password, userData);

            await onAuthenticate({ 
                email: trimmedData.email, 
                password: trimmedData.password 
            });

            setIsAuthenticating(false); // Reset state after successful registration
        } catch (error) {
            console.error('Sign up error:', error);
            setIsAuthenticating(false);

            let errorMessage = 'Could not create account. Please try again later.';
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'This email is already registered. Please use a different email.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Please enter a valid email address.';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'Password is too weak. Use a stronger password.';
            }

            Alert.alert('Registration Failed', errorMessage);
        }
    };

    if (isAuthenticating) {
        return <LoadingOverlay message="Creating account..." />;
    }

    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={100}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Title title="Create an Account" />
                <View style={styles.form}>
                    <Input
                        label="First Name"
                        isInvalid={firstName.isInvalid}
                        textInputConfig={{
                            placeholder: "Eva",
                            autoCapitalize: "words",
                            onChangeText: (text) => updateField(setFirstName, text)
                        }}
                    />
                    <Input
                        label="Last Name"
                        isInvalid={lastName.isInvalid}
                        textInputConfig={{
                            placeholder: "Wilson",
                            autoCapitalize: "words",
                            onChangeText: (text) => updateField(setLastName, text)
                        }}
                    />
                    <Input
                        label="Email Address"
                        isInvalid={email.isInvalid}
                        textInputConfig={{
                            placeholder: "Your email address",
                            keyboardType: "email-address",
                            autoCapitalize: "none",
                            autoComplete: 'email',
                            autoCorrect: false,
                            onChangeText: (text) => updateField(setEmail, text)
                        }}
                    />
                    <Input
                        label="Password"
                        isInvalid={password.isInvalid}
                        textInputConfig={{
                            placeholder: "Your password",
                            secureTextEntry: true,
                            autoCapitalize: "none",
                            onChangeText: (text) => updateField(setPassword, text)
                        }}
                    />
                    <Input
                        label="Confirm Password"
                        isInvalid={passwordConfirmation.isInvalid}
                        textInputConfig={{
                            placeholder: "Confirm password",
                            secureTextEntry: true,
                            autoCapitalize: "none",
                            onChangeText: (text) => updateField(setPasswordConfirmation, text)
                        }}
                    />
                </View>
                <Privacy onAgree={handlePrivacy}/>
                <AuthLogin onPress={submit} style={styles.authLogin} title="Sign Up"/>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    form: {
        flex: 1,
    },
    authLogin: {
        marginBottom: 20,
    },
});

export default SignUpForm;
