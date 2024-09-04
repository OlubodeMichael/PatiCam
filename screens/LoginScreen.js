import { View, Text } from "react-native"
import { useState } from "react"
import LoginAuthForm from "../components/ManageForm/LoginAuthForm";


function LoginScreen({credentialsInvalid}) {
    return (
        <LoginAuthForm />
    )
}

export default LoginScreen;
