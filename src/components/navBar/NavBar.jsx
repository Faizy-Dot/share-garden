import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Images, Metrix } from "../../config"
import fonts from "../../config/Fonts"
import { useNavigation } from "@react-navigation/native"
import { useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from "react-native-toast-message";



export default function NavBar({ title }) {
    const { user } = useSelector((state) => state.login);

    const navigation = useNavigation()
    return (
        <View style={styles.userDetail}>
            <Text style={{ fontSize: Metrix.normalize(20), fontFamily: fonts.InterBold }}>{title}</Text>

            <View style={{ flexDirection: "row", alignItems: "center", gap: Metrix.HorizontalSize(18) }}>
                <View style={{ flexDirection: "row", gap: Metrix.HorizontalSize(5), alignItems: "center" }}>
                    <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterSemiBold }}>50200</Text>
                    <Image source={Images.homeGreenBit} style={styles.greenBit} />
                </View>
                <Image source={Images.homeMessageIcon} style={styles.messageIcon} />
                <Image source={Images.homeBellIcon} style={styles.bellIcon} />
                <TouchableOpacity onPress={() => {
                    if (user) {
                        navigation.navigate("Profile")
                    } else {
                        navigation.navigate("Login")
                        Toast.show({
                            type: 'error',
                            text1: 'Login or Signup',
                            text2: 'First Login plz',
                        });
                    }
                }} activeOpacity={0.8}>
                    {
                        user?.profilePicutreUrl ?
                            <Image source={{ uri: user?.profilePicutreUrl }} style={{ width: Metrix.HorizontalSize(32), height: Metrix.HorizontalSize(32) }} />
                            :
                            <Icon name="user-circle" size={Metrix.HorizontalSize(32)} color="#ccc" />

                    }
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    userDetail: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
        marginBottom: Metrix.VerticalSize(9)
    },

    profile: {
        width: Metrix.HorizontalSize(32),
        height: Metrix.HorizontalSize(32),
    },
    bellIcon: {
        width: Metrix.HorizontalSize(18),
        height: Metrix.HorizontalSize(18),
    },
    messageIcon: {
        width: Metrix.HorizontalSize(18),
        height: Metrix.HorizontalSize(18),
    },
    greenBit: {
        width: Metrix.VerticalSize(24),
        height: Metrix.VerticalSize(24),
    },

})