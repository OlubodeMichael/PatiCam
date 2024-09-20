import { View, Text, StyleSheet} from "react-native";
import Form from "../components/ManageForm/Form";
import { GlobalStyles } from "../constants/styles";

function AddScreen() {
    return (
        <View style={styles.container}> 
            <Form />
        </View>
    )
}

export default AddScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: GlobalStyles.colors.primary200,
        flex: 1,
        paddingTop: 40
        //justifyContent: 'center',
        //alignItems: 'center',
    }
})