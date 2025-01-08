import React, { useState } from "react";
import { Image, Switch, Text, TouchableOpacity, View } from "react-native";
import { Images, Metrix } from "../../../config";
import BackArrowIcon from "../../../components/backArrowIcon/BackArrowIcon";
import colors from "../../../config/Colors";
import NavBar from "../../../components/navBar/NavBar";
import styles from "./styles";
import fonts from "../../../config/Fonts";

export default function PostTabScreen() {
    const [activeButton, setActiveButton] = useState("SG Item");
    return (
        <View style={styles.postContainer}>

            <View>
                <BackArrowIcon />
            </View>

            <View style={{ marginTop: Metrix.VerticalSize(15) }}>
                <NavBar title={"Create a Post"} />
            </View>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[
                        styles.button,
                        {
                            backgroundColor: activeButton === "SG Item" ? colors.buttonColor : colors.white,
                            borderTopLeftRadius: Metrix.LightRadius,
                            borderBottomLeftRadius: Metrix.LightRadius,
                        },
                    ]}
                    onPress={() => setActiveButton("SG Item")}
                >
                    <Text style={[styles.buttonText, { color: activeButton === "SG Item" ? "white" : "black" }]}>
                        SG Item
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[
                        styles.button,
                        {
                            backgroundColor: activeButton === "SG Tip" ? colors.buttonColor : colors.white,
                            borderTopRightRadius: Metrix.LightRadius,
                            borderBottomRightRadius: Metrix.LightRadius,
                        },
                    ]}
                    onPress={() => setActiveButton("SG Tip")}
                >
                    <Text style={[styles.buttonText, { color: activeButton === "SG Tip" ? "white" : "black" }]}>
                        SG Tip
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.switchingCOntainer}>
                <View>
                    <Text style={{ fontSize: Metrix.FontRegular, fontFamily: fonts.InterBold }}>Trade in</Text>
                </View>

                <View style={{ flexDirection: "row", gap: Metrix.HorizontalSize(15) }}>
                    <View style={styles.Switch}>
                        <Image source={Images.homeGreenBit} style={styles.logos} />
                        <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterSemiBold }}>SG Points</Text>
                        <Switch />
                    </View>

                    <View style={styles.Switch}>
                        <Image source={Images.homeDollarLogo} style={styles.logos} />
                        <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterSemiBold }}>Cash</Text>
                        <Switch />
                    </View>

                </View>
            </View>

            <View style={styles.imageUploadContainer}>

                <View style={{alignItems : "center",gap : 10}}>
                    <Image source={Images.uploadImageIcon} />
                    <Text style={{textAlign : "center" , fontSize : Metrix.FontSmall , fontFamily : fonts.InterRegular}}>Upload items images {'\n'} up to 3 images</Text>
                </View>

                <View style = {{height : 61 , flexDirection : "row" , gap :  10 , paddingHorizontal : 10}}>
                    <View style={styles.image}></View>
                    <View style={styles.image}></View>
                    <View style={styles.image}></View>
                   
                    
                </View>
            </View>


        </View>
    )
}