import { View, Text, StyleSheet, Switch } from "react-native"
import { useState } from "react"
import SignInAuthForm from "../components/ManageForm/SignInAuthForm"

function SignInScreen() {
    const [isAgreed, setIsAgreed] = useState(false);

    const toggleSwitch = () => setIsAgreed(previousState => !previousState);
    return (
        <>
        <SignInAuthForm />
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
        </>
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