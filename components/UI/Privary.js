import { View, Text, StyleSheet, Switch} from "react-native";
import { useState } from "react"
import { GlobalStyles } from "../../constants/styles";

function Privacy() {
    const [isAgreed, setIsAgreed] = useState(false);
    const toggleSwitch = () => setIsAgreed(previousState => !previousState);

    return (
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
    )
}

export default Privacy;

const styles = StyleSheet.create({
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
        color: GlobalStyles.colors.primary400,
    },
})