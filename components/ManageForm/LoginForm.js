// LoginForm.js
import { View, Alert, StyleSheet } from 'react-native';
import { useState, useContext } from 'react';
import Title from '../UI/Title';
import Input from './Input';
import AuthLogin from '../UI/AuthLogin';
import StayLogin from '../UI/StayLogin';
import { AuthContext } from '../../store/auth-context';

function LoginForm({ onAuthenticate }) {
  const authCtx = useContext(AuthContext);
  
  const [enteredEmail, setEnteredEmail] = useState({
    value: '',
    isInvalid: false
  });
  const [enteredPassword, setEnteredPassword] = useState({
    value: '',
    isInvalid: false
  });

  const handleIsAgree = (isAgree) => {
    // Call the context function to update the stay logged in preference
    authCtx.setStayLoggedInPreference(isAgree);
  };

  const submit = () => {
    const trimmedEmail = enteredEmail.value.trim();
    const trimmedPassword = enteredPassword.value.trim();

    const emailIsValid = trimmedEmail.includes('@');
    const passwordIsValid = trimmedPassword.length > 6;

    setEnteredEmail((prev) => ({
      ...prev,
      isInvalid: !emailIsValid
    }));
    setEnteredPassword((prev) => ({
      ...prev,
      isInvalid: !passwordIsValid
    }));

    if (!emailIsValid || !passwordIsValid) {
      let message = 'Please check your entered';

      if (!emailIsValid && !passwordIsValid) {
        message += ' email address and password.';
      } else if (!emailIsValid) {
        message += ' email address.';
      } else if (!passwordIsValid) {
        message += ' password.';
      }

      Alert.alert('Invalid input', message);
      return;
    }

    onAuthenticate({ email: trimmedEmail, password: trimmedPassword });
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Title title="Sign in to Pati Cam" />
        <View style={styles.inputContainer}>
          <Input 
            label="Email Address"
            isInvalid={enteredEmail.isInvalid}
            textInputConfig={{
              placeholder: "Your email",
              value: enteredEmail.value,
              onChangeText: (text) => {
                setEnteredEmail({
                  value: text,
                  isInvalid: false 
                });
              }
            }}
          />
          <Input 
            label="Password"
            isInvalid={enteredPassword.isInvalid}
            textInputConfig={{
              placeholder: "Your password",
              secureTextEntry: true,
              showSoftInputOnFocus: true,
              value: enteredPassword.value,
              selectTextOnFocus: true,
              onChangeText: (text) => {
                setEnteredPassword({
                  value: text,
                  isInvalid: false 
                });
              }
            }}
          />
        </View>
      </View>
      <StayLogin onAgree={handleIsAgree} />
      <AuthLogin onPress={submit} title="Sign In" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', 
  },
  form: {
    flex: 1, 
  },
  inputContainer: {
    marginBottom: 20, 
  },
});

export default LoginForm;
