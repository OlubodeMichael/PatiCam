import { View, Text, StyleSheet, Switch, ScrollView } from "react-native"
import { useState } from "react"
import { GlobalStyles } from "../constants/styles";
import SignInForm from "../components/ManageForm/SignInForm"
import Privacy from "../components/UI/Privary";
import AuthLogin from "../components/UI/AuthLogin";

function SignInScreen() {
    
    return (
        <SignInForm />         
    )
}

export default SignInScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "space-between"
    },
    signUpContainer: {
        
    }
})