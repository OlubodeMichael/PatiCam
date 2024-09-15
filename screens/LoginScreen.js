import { Alert } from "react-native";
import { useState, useContext } from "react"
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { login } from "../Utils/auth";
import LoginForm from "../components/ManageForm/LoginForm";
import { AuthContext } from "../store/auth-context";


function LoginScreen() {
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const AuthCtx = useContext(AuthContext)
    const submitHandler = async ({ email, password }) => {
        setIsAuthenticating(true);
        try {
            const token = await login(email, password);
            AuthCtx.authenticate(token)
        }catch (e) {
            Alert.alert(
                'Authentication failed',
                'Could not log you in. Please check your credentials and try again'
            )
            setIsAuthenticating(false);
        }
        
    };

    if (isAuthenticating) {
        return <LoadingOverlay message="Logging user..." />;
    }
    return (
        <LoginForm onAuthenticate={submitHandler}/>
    )
}

export default LoginScreen;
