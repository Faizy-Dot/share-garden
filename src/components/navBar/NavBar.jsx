import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Images, Metrix } from "../../config"
import fonts from "../../config/Fonts"
import { useNavigation } from "@react-navigation/native"
import { useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from "react-native-toast-message";
import colors from "../../config/Colors";
import CheckBell from "../../assets/svg/CheckBell";



export default function NavBar({ 
    title,
    fontSize = Metrix.normalize(20),
    fontFamily= fonts.InterBold,
    color,
 }) {
    const { user } = useSelector((state) => state.login);

    const navigation = useNavigation()
    return (
        <View style={styles.userDetail}>
            <Text style={{ fontSize,fontFamily , color  }}>{title}</Text>

            <View style={{ flexDirection: "row", alignItems: "center", gap: Metrix.HorizontalSize(18) }}>
                <View style={{ flexDirection: "row", gap: Metrix.HorizontalSize(5), alignItems: "center" }}>
                    <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterSemiBold }}>{user?.points || 0}</Text>
                    <Image source={Images.homeGreenBit} style={styles.greenBit} />
                </View>
                <TouchableOpacity onPress={() => {
                    if (user) {
                        navigation.navigate("SgUserChat")
                    } else {
                        navigation.navigate("Login")
                        Toast.show({
                            type: 'error',
                            text1: 'Login or Signup',
                            text2: 'First Login plz',
                        });
                    }
                }} activeOpacity={0.8}>
                    <Image source={Images.homeMessageIcon} style={styles.messageIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    if (user) {
                        navigation.navigate("SgUserNotification")
                    } else {
                        navigation.navigate("Login")
                        Toast.show({
                            type: 'error',
                            text1: 'Login or Signup',
                            text2: 'First Login plz',
                        });
                    }
                }} activeOpacity={0.8}>
                    <Image source={Images.homeBellIcon} style={styles.bellIcon} />
                    <CheckBell />
                </TouchableOpacity>
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
                }} activeOpacity={0.8} style={styles.profileContainer}>
                    {
                        user?.profileImage ?
                            <Image source={{ uri: user?.profileImage }} style={styles.profileImage} />
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
    profileContainer: {
        width: Metrix.HorizontalSize(32),
        height: Metrix.HorizontalSize(32),
        borderRadius: Metrix.HorizontalSize(16),  // Half of width/height to make it a circle
        overflow: "hidden", // Ensures the image is clipped to the circular shape
        borderWidth: 1,
        borderColor: colors.borderColor,
        justifyContent: "center",
        alignItems: "center",
    },
    
    profileImage: {
        width: "100%",
        height: "100%",
        borderRadius:  Metrix.VerticalSize(16), // Ensures the image itself is also rounded
    },

})