import { Alert } from "react-native";
import { useState, useContext } from "react"
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { login } from "../Utils/auth";
import LoginForm from "../components/ManageForm/LoginForm";
import { AuthContext } from "../store/auth-context";


function LoginScreen() {
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const authCtx = useContext(AuthContext)
    
    async function loginHandler({ email, password }) {
        setIsAuthenticating(true);
        try {
            const authData = await login(email, password);
            authCtx.authenticate(authData.token, email, password);
        } catch (error) {
            Alert.alert('Authentication failed!', 'Could not log you in. Please check your credentials!');
            setIsAuthenticating(false);
        }
    }

    if (isAuthenticating) {
        return <LoadingOverlay message="Logging user..." />;
    }
    return (
        <LoginForm onAuthenticate={loginHandler}/>
    )
}

export default LoginScreen;
