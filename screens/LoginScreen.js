import { View, Text } from "react-native"
import Title from "../components/Title";
import Input from "../components/ManageForm/Input";

function LoginScreen() {
    return (
        <View>
            <Title title="Sign in to Pati Cam"/>
            <View>
            <Input 
                label="Email Address"
                textInputConfig={{
                    placeholder: "Your email"
                }}
            />
            <Input 
                label="Password"
                textInputConfig={{
                    placeholder: "Your password",
                    secureTextEntry: true
                }}
                />
            </View>
        </View>
    )
}

export default LoginScreen;