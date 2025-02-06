import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';

function Privacy({ onAgree }) {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        onAgree(isChecked);
    }, [isChecked]);

    return (
        <View style={styles.container}>
            <Checkbox
                value={isChecked}
                onValueChange={setIsChecked}
                color={isChecked ? '#4630EB' : undefined}
            />
            <Text style={styles.text}>
                I agree to the Privacy Policy and Terms of Service
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        paddingHorizontal: 20,
    },
    text: {
        marginLeft: 8,
    }
});

export default Privacy;