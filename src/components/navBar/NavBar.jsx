import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Images, Metrix } from "../../config"
import fonts from "../../config/Fonts"
import { useNavigation } from "@react-navigation/native"



export default function NavBar({ title }) {

    const navigation = useNavigation()
    return (
        <View style={styles.userDetail}>
            <Text style={{ fontSize: Metrix.normalize(20), fontFamily: fonts.InterBold }}>{title}</Text>
            
            <View style={{flexDirection : "row", alignItems : "center" , gap : Metrix.HorizontalSize(18)}}>
                <View style={{ flexDirection: "row", gap: Metrix.HorizontalSize(5), alignItems: "center" }}>
                    <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterSemiBold }}>50200</Text>
                    <Image source={Images.homeGreenBit} style={styles.greenBit} />
                </View>
                <Image source={Images.homeMessageIcon} style={styles.messageIcon} />
                <Image source={Images.homeBellIcon} style={styles.bellIcon} />
                <TouchableOpacity onPress={()=>navigation.navigate("profile") } activeOpacity={0.8}>
                <Image  source={Images.homeProfile} style={styles.profile} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    userDetail: {
        flexDirection: "row",
        alignItems: "center",
        width : "100%",
        justifyContent : "space-between",
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