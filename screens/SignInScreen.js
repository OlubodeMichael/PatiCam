import { View, Text, StyleSheet, ScrollView} from "react-native";
import Title from "../components/Title";
import Input from "../components/ManageForm/Input";

function SignInScreen() {
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
        </View>
        </ScrollView>
    )
}

export default SignInScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})