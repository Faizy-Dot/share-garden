import { Image, StyleSheet, View } from "react-native";
import { Images } from "../../config";
import CustomButton from "../../components/Button/Button";


export default function GetStartedScreen() {
    return (
        <View style={styles.container}>
            <View>
                <Image source={Images.descriptionLogo} />
            </View>
            <View style={styles.button}>
                <CustomButton title={"GET  STARTED"} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
          alignItems : "center"

    }
})