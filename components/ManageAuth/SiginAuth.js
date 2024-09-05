import { View } from "react-native"
import { useState } from 'react';

function SigninAuth({ isLogin, onAuthenticate }) {
    const [credentialsInvalid, setCredentialsInvalid] = useState({
        firstName: false,
        lastName: false,
        email: false,
        password: false,
    });

    const switchAuthModeHandler = () => {
        // Todo
    }

    const handleSubmit = (credentials) => {
        const { firstName, lastName, email, password} = credentials;
        email = email.trim();
        password = password.trim();

        const emailIsValid = email.includes('@');
        const passwordIsValid = password.length > 6;
    }

    return (
        <View>

        </View>
    )
}

export default SigninAuth