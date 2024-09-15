import { View, StyleSheet, Alert, ScrollView } from "react-native";
import { useState } from "react";
import Title from "../UI/Title";
import Input from "./Input";
import Privacy from "../UI/Privary"; // Fixed typo: "Privary" to "Privacy"
import AuthLogin from "../UI/AuthLogin";
import LoadingOverlay from "../UI/LoadingOverlay";


function SignInForm({ onAuthenticate }) {
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    let agree;
    const [firstName, setFirstName] = useState({
        value: '',
        isInvalid: false
    });
    const [lastName, setLastName] = useState({
        value: '',
        isInvalid: false
    });
    const [email, setEmail] = useState({
        value: '',
        isInvalid: false
    });
    const [password, setPassword] = useState({
        value: '',
        isInvalid: false
    });
    const [passwordConfirmation, setPasswordConfirmation] = useState({
        value: '',
        isInvalid: false
    });

    const handlePrivacy = (isAgree) => {
        agree = isAgree
    }

    const submit = () => {
        // Trim the values
        const trimmedEmail = email.value.trim();
        const trimmedPassword = password.value.trim();
        const trimmedPasswordConfirmation = passwordConfirmation.value.trim();

        // Validate inputs
        const emailIsValid = trimmedEmail.includes('@');
        const passwordIsValid = trimmedPassword.length > 6;
        const passwordsAreEqual = trimmedPassword === trimmedPasswordConfirmation;
        const firstNameIsValid = firstName.value.trim().length > 0;
        const lastNameIsValid = lastName.value.trim().length > 0;

        // Update the isInvalid flags based on validation
        setFirstName((prev) => ({
            ...prev,
            isInvalid: !firstNameIsValid
        }));
        setLastName((prev) => ({
            ...prev,
            isInvalid: !lastNameIsValid
        }));
        setEmail((prev) => ({
            ...prev,
            isInvalid: !emailIsValid
        }));
        setPassword((prev) => ({
            ...prev,
            isInvalid: !passwordIsValid
        }));
        setPasswordConfirmation((prev) => ({
            ...prev,
            isInvalid: !passwordsAreEqual
        }));

        if (!emailIsValid || !passwordIsValid || !passwordsAreEqual || !firstNameIsValid || !lastNameIsValid || !agree) {
            Alert.alert('Invalid input', 'Please check your entered credentials.');
            return;
        }

        onAuthenticate({ email: trimmedEmail, password: trimmedPassword })
    };

    if (isAuthenticating) {
        return <LoadingOverlay message="Creating user..." />;
    }
    
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Title title="Create an Account" />
                <View style={styles.form}>
                    <Input
                        label="First Name"
                        isInvalid={firstName.isInvalid}
                        textInputConfig={{
                            placeholder: "Eva",
                            onChangeText: (text) => {
                                setFirstName({
                                    value: text,
                                    isInvalid: false // Reset invalid flag on text change
                                });
                            }
                        }}
                    />
                    <Input
                        label="Last Name"
                        isInvalid={lastName.isInvalid}
                        textInputConfig={{
                            placeholder: "Wilson",
                            onChangeText: (text) => {
                                setLastName({
                                    value: text,
                                    isInvalid: false // Reset invalid flag on text change
                                });
                            }
                        }}
                    />
                    <Input
                        label="Email Address"
                        isInvalid={email.isInvalid}
                        textInputConfig={{
                            placeholder: "Your email address",
                            keyboardType: "email-address",
                            autoComplete: 'off',
                            autoCorrect: false,
                            onChangeText: (text) => {
                                setEmail({
                                    value: text,
                                    isInvalid: false // Reset invalid flag on text change
                                });
                            }
                        }}
                    />
                    <Input
                        label="Password"
                        isInvalid={password.isInvalid}
                        textInputConfig={{
                            placeholder: "Your password",
                            secureTextEntry: true,
                            onChangeText: (text) => {
                                setPassword({
                                    value: text,
                                    isInvalid: false // Reset invalid flag on text change
                                });
                            }
                        }}
                    />
                    <Input
                        label="Confirm Password"
                        isInvalid={password.isInvalid}
                        textInputConfig={{
                            placeholder: "Confirm password",
                            secureTextEntry: true,
                            onChangeText: (text) => {
                                setPasswordConfirmation({
                                    value: text,
                                    isInvalid: false // Reset invalid flag on text change
                                });
                            }
                        }}
                    />
                </View>
                <Privacy onAgree={handlePrivacy}/>
                <AuthLogin onPress={submit} style={styles.authLogin} title="Sign Up"/>
            </ScrollView>
            
        </View>
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
        marginBottom: 20, // Add some spacing from the bottom
    },
});

export default SignInForm;
