import { View, Text, StyleSheet, ScrollView, Switch} from "react-native";
import { useState } from "react"
import Title from "../UI/Title";
import Input from "./Input";


function SignInAuthForm() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    

    return (
        <ScrollView>
        <View styles={styles.container}>
            <Title title="Create an Account"/>
            <View>
                <Input 
                    label="First Name"
                    textInputConfig={{
                        placeholder: "Eva",

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

export default SignInAuthForm;
const styles = StyleSheet.create({
    
})