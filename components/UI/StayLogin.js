import { View, Text, StyleSheet, Switch } from "react-native";
import { useState, useContext } from "react";
import { GlobalStyles } from "../../constants/styles";
import { AuthContext } from "../../store/auth-context";

function StayLogin({ onAgree }) {
    const authCtx = useContext(AuthContext)

    const handleSwitchChange = (value) => {
    onAgree(value);
    authCtx.setStayLoggedInPreference(value);
  };
    
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Keep me signed in</Text>
            <Switch
                value={authCtx.stayLoggedIn}
                onValueChange={handleSwitchChange}
                trackColor={{ false: 'white', true: GlobalStyles.colors.primary500 }}
            />
        </View>
    );
}

export default StayLogin;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', 
        padding: 10,
        borderTopWidth: 1,
        borderColor: 'grey',
        marginVertical: 10,
    },
    label: {
        fontSize: 16,
        color: '#333',
    }
});
