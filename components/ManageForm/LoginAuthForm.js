import { View, Text } from "react-native"
import { useState } from "react"
import Title from "../UI/Title";
import Input from "./Input";

function LoginAuthForm() {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');

    
    return (
        <View>
            <Title title="Sign in to Pati Cam" />
            <View>
                <Input 
                    label="Email Address"
                    textInputConfig={{
                        placeholder: "Your email",
                        value: enteredEmail,
                        onChangeText: (text) => {
                            setEnteredEmail(text);
                        }
                    }}
                />
                <Input 
                    label="Password"
                    textInputConfig={{
                        placeholder: "Your password",
                        secureTextEntry: true,
                        value: enteredPassword,
                        onChangeText: (text) => {
                            setEnteredPassword(text);
                        }
                    }}
                />
            </View>
        </View>
    )
}

export default LoginAuthForm;