import React, { useState } from "react";
import { Image, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Images, Metrix } from "../../../config";
import BackArrowIcon from "../../../components/backArrowIcon/BackArrowIcon";
import colors from "../../../config/Colors";
import NavBar from "../../../components/navBar/NavBar";
import styles from "./styles";
import fonts from "../../../config/Fonts";
import { launchImageLibrary } from "react-native-image-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DropdownComponent from "../../../components/dropDown/DropDownInput";
import { CheckBox } from "react-native-elements";

export default function PostTabScreen() {
    const [activeButton, setActiveButton] = useState("SG Item");
    const [sgPoints, setSGPoints] = useState(false);
    const [cash, setCash] = useState(false);
    const [images, setImages] = useState([null, null, null]); // State to store up to 3 images
    const [checked, setChecked] = useState({
        fairlyUsed: false,
        good: false,
        excellent: false,
    });

    const handleCheckboxChange = (key) => {
        setChecked({
            fairlyUsed: key === "fairlyUsed",
            good: key === "good",
            excellent: key === "excellent",
        });
    };

    const handleImagePicker = async () => {
        const result = await launchImageLibrary({
            mediaType: "photo",
            selectionLimit: 1,
        });

        if (!result.didCancel && result.assets && result.assets.length > 0) {
            const newImageUri = result.assets[0].uri;

            // Add the selected image to the first empty slot
            setImages((prevImages) => {
                const updatedImages = [...prevImages];
                const firstEmptyIndex = updatedImages.findIndex((img) => img === null);
                if (firstEmptyIndex !== -1) {
                    updatedImages[firstEmptyIndex] = newImageUri;
                }
                return updatedImages;
            });
        }
    };

    return (
        <KeyboardAwareScrollView style={styles.postContainer} >
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
                        <Switch value={sgPoints} onValueChange={() => setSGPoints(!sgPoints)} />
                    </View>

                    <View style={styles.Switch}>
                        <Image source={Images.homeDollarLogo} style={styles.logos} />
                        <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterSemiBold }}>Cash</Text>
                        <Switch value={cash} onValueChange={() => setCash(!cash)} />
                    </View>
                </View>
            </View>

            <View style={styles.imageUploadContainer}>
                <TouchableOpacity onPress={handleImagePicker} activeOpacity={0.8} style={{ alignItems: "center", gap: 10 }}>
                    <Image source={Images.uploadImageIcon} />
                    <Text style={{ textAlign: "center", fontSize: Metrix.FontSmall, fontFamily: fonts.InterRegular }}>
                        Upload items images {"\n"} up to 3 images
                    </Text>
                </TouchableOpacity>

                <View style={styles.imagesContainer}>
                    {images.map((image, index) => (
                        <View key={index} style={styles.image}>
                            {image && <Image source={{ uri: image }} style={styles.image} />}
                        </View>
                    ))}
                </View>
            </View>

            <View style={styles.inputsContainer}>
                <TextInput
                    placeholderTextColor={colors.black}
                    placeholder="Add title"
                    style={styles.title}
                />
                <DropdownComponent />
                <View style={styles.conditionContainer}>
                    <Text style={styles.heading}>Item Condition</Text>
                    <View style={{ flexDirection: "row", }}>
                        <CheckBox
                            title="Fairly Used"
                            checked={checked.fairlyUsed}
                            onPress={() => handleCheckboxChange("fairlyUsed")}
                            containerStyle={styles.checkboxContainer}
                            textStyle={styles.checkboxText}
                            activeOpacity={0.8}
                        />

                        <CheckBox
                            title="Good"
                            checked={checked.good}
                            onPress={() => handleCheckboxChange("good")}
                            containerStyle={styles.checkboxContainer}
                            textStyle={styles.checkboxText}
                            activeOpacity={0.8}
                        />

                        <CheckBox
                            title="Excellent"
                            checked={checked.excellent}
                            onPress={() => handleCheckboxChange("excellent")}
                            containerStyle={styles.checkboxContainer}
                            textStyle={styles.checkboxText}
                            activeOpacity={0.8}
                        />
                    </View>
                </View>
                <TextInput
                    placeholderTextColor={colors.black}
                    placeholder="Enter Point Value or Cash value"
                    style={styles.title}
                />
                <TextInput
                    placeholderTextColor={colors.black}
                    placeholder="Enter Point Value or Cash value"
                    style={styles.title}
                />
                <TextInput
                    placeholderTextColor={colors.black}
                    placeholder="Description"
                    style={styles.description}
                />
                
            </View>
        </KeyboardAwareScrollView>
    );
}
