import { View, Text, StyleSheet, ScrollView, Switch} from "react-native";
import { useState } from "react"
import Title from "../components/Title";
import Input from "../components/ManageForm/Input";

function SignInScreen() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const [isAgreed, setIsAgreed] = useState(false);

    const toggleSwitch = () => setIsAgreed(previousState => !previousState);
    return (
        <ScrollView>
        <View styles={styles.container}>
            <Title title="Create an Account"/>
            <View>
                <Input 
                    label="First Name"
                    textInputConfig={{
                        placeholder: "Eva"
                    }}
                />
                <Input 
                    label="Last Name"
                    textInputConfig={{
                        placeholder: "wilson"
                    }}
                />
                <Input 
                    label="Email Adress"
                    textInputConfig={{
                        placeholder: "Your email address",
                        keyboardType: "email-address"
                    }}
                />
                <Input 
                    label="Password"
                    textInputConfig={{
                        placeholder: "Your password",
                        keyboardType: "email-address",
                        secureTextEntry: true
                    }}
                />
                <Input 
                    label="confirm Password"
                    textInputConfig={{
                        placeholder: "confirm password",
                        secureTextEntry: true
                    }}
                />
            </View>
            <View style={styles.privacyContainer}>
                <View style={styles.termsContainer}>
                    <Text style={styles.termsText}>
                        By registering, you agree to our{' '}
                        <Text style={styles.link}>Terms</Text>,{' '}
                        <Text style={styles.link}>Privacy Policy</Text>, and{' '}
                        <Text style={styles.link}>Cookie Policy</Text>.
                    </Text>
                    <Switch 
                        value={isAgreed} 
                        onValueChange={toggleSwitch} 
                    />
                </View>
            </View>
        </View>
        </ScrollView>
    )
}

export default SignInScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    privacyContainer: {
        paddingVertical: 16,
        marginTop: 20,
        padding: 10,
        borderColor: 'grey',
        borderWidth: 1
    },
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    termsText: {
        flex: 1,
        fontSize: 14,
    },
    link: {
        color: 'blue',
    },
})