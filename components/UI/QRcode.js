import { View, Text} from "react-native"
import Button from "./Button";
// Qrcode import package

function QRcode({link, albumTitle}) {
    return (
        <View>
            <Text>{albumTitle}</Text>
            /*
                This will hold the qrcode component
             */
        </View>
    )   
}

export default QRcode;