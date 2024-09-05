import { View, Text } from "react-native"
import { useState } from "react"
import LoginForm from "../components/ManageForm/LoginForm";


function LoginScreen({credentialsInvalid}) {
    return (
        <LoginForm />
    )
}

export default LoginScreen;
