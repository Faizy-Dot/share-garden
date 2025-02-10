import React, { useEffect, useState } from "react";
import { Image, Switch, Text, TextInput, TouchableOpacity, View, Alert, PermissionsAndroid, Platform } from "react-native";
import { Images, Metrix } from "../../../config";
import BackArrowIcon from "../../../components/backArrowIcon/BackArrowIcon";
import colors from "../../../config/Colors";
import NavBar from "../../../components/navBar/NavBar";
import styles from "./styles";
import fonts from "../../../config/Fonts";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DropDownInput from "../../../components/dropDown/DropDownInput.jsx";
import Icon from "react-native-vector-icons/MaterialIcons";
import CustomButton from "../../../components/Button/Button";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import Axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';


export default function PostTabScreen({ navigation }) {
    const [activeButton, setActiveButton] = useState("SG Item");
    const [sgPoints, setSGPoints] = useState(true);
    const [cash, setCash] = useState(false);
    const [images, setImages] = useState([null, null, null]);
    const [title, setTitle] = useState("");
    const [pointOrCashValue, setPointOrCashValue] = useState("");
    const [description, setDescription] = useState("");
    const [checked, setChecked] = useState("");
    const checkBoxNames = [
        { display: "Fairly Used", value: "FAIRLY_GOOD" },
        { display: "Good", value: "GOOD" },
        { display: "Excellent", value: "EXCELLENT" }
    ];
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedCategoryName, setSelectedCategoryName] = useState('');

    const { user } = useSelector((state) => state.login)



    const handleCheckboxChange = (key) => {
        setChecked(key);
    };

    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'App needs camera permission to take product photos',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    }
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        }
        return true;
    };

    const handleImagePicker = async () => {
        if (!images.includes(null)) {
            Toast.show({
                type: 'error',
                text1: 'Limit Reached',
                text2: 'Maximum 3 images allowed',
            });
            return;
        }

        Alert.alert(
            'Select Image',
            'Choose an option to add product image',
            [
                {
                    text: 'Take Photo',
                    onPress: async () => {
                        const hasPermission = await requestCameraPermission();
                        if (hasPermission) {
                            try {
                                const result = await launchCamera({
                                    mediaType: 'photo',
                                    quality: 0.8,
                                });

                                if (!result.didCancel && result.assets && result.assets.length > 0) {
                                    const newImageUri = result.assets[0].uri;
                                    handleNewImage(newImageUri);
                                }
                            } catch (error) {
                                console.error('Camera error:', error);
                                Toast.show({
                                    type: 'error',
                                    text1: 'Error',
                                    text2: 'Failed to take photo',
                                });
                            }
                        } else {
                            Toast.show({
                                type: 'error',
                                text1: 'Permission Denied',
                                text2: 'Camera permission is required',
                            });
                        }
                    },
                },
                {
                    text: 'Choose from Gallery',
                    onPress: async () => {
                        try {
                            const result = await launchImageLibrary({
                                mediaType: 'photo',
                                quality: 0.8,
                                selectionLimit: 1,
                            });

                            if (!result.didCancel && result.assets && result.assets.length > 0) {
                                const newImageUri = result.assets[0].uri;
                                handleNewImage(newImageUri);
                            }
                        } catch (error) {
                            console.error('Gallery error:', error);
                            Toast.show({
                                type: 'error',
                                text1: 'Error',
                                text2: 'Failed to pick image from gallery',
                            });
                        }
                    },
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ],
        );
    };

    const handleNewImage = (newImageUri) => {
        setImages((prevImages) => {
            const updatedImages = [...prevImages];
            const firstEmptyIndex = updatedImages.findIndex((img) => img === null);
            if (firstEmptyIndex !== -1) {
                updatedImages[firstEmptyIndex] = newImageUri;
            }
            return updatedImages;
        });
    };

    const fetchCategories = async () => {
        try {
            const response = await Axios.get(
                'https://api.sharegarden.ca/api/categories/getCategories',
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );
            
            console.log('Categories response:', response.data);
            
            // Transform categories for dropdown while preserving all data
            const formattedCategories = response.data.map(cat => ({
                label: cat.name,
                value: cat.id,
                icon: cat.icon,
                slug: cat.slug,
                _count: cat._count
            }));
            
            console.log('Formatted categories:', formattedCategories);
            setCategories(formattedCategories);
        } catch (error) {
            console.error('Error fetching categories:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to load categories',
            });
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            if (!user) {
                navigation.navigate("Login")
                Toast.show({
                    type: 'error',
                    text1: 'Login or Signup',
                    text2: 'First Login plz',
                });
                return;
            }
            fetchCategories();
        }, [user, navigation])
    );

    if (!user) {
        return null;
    }

    const resetForm = () => {
        setTitle("");
        setPointOrCashValue("");
        setDescription("");
        setChecked("");
        setImages([null, null, null]);
        setSelectedCategory(null);
        setSelectedCategoryName('');
        setSGPoints(true);
        setCash(false);
        setActiveButton("SG Item");
    };

    const handlePreview = () => {
        if (!title || !description || !selectedCategory || images.every(img => img === null) || !checked) {
            Toast.show({
                type: 'error',
                text1: 'Missing Fields',
                text2: 'Please fill all required fields, select condition and add at least one image',
            });
            return;
        }

        navigation.navigate("Preview", {
            title,
            description,
            images: images.filter(img => img !== null),
            categoryId: selectedCategory,
            categoryName: selectedCategoryName,
            isSGPoints: sgPoints,
            isCash: cash,
            condition: checked,
            pointOrCashValue: pointOrCashValue,
            onSuccess: resetForm
        });
    };

    return (
        <KeyboardAwareScrollView style={styles.postContainer} showsVerticalScrollIndicator={false}>
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
                        <Switch value={sgPoints} onValueChange={() => {
                            setSGPoints(true);
                            setCash(false);
                        }} />
                    </View>

                    <View style={styles.Switch}>
                        <Image source={Images.homeDollarLogo} style={styles.logos} />
                        <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterSemiBold }}>Cash</Text>
                        <Switch value={cash} onValueChange={() => {
                            setCash(true);
                            setSGPoints(false);
                        }} />
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
                    value={title}
                    onChangeText={setTitle}
                />
                <View style={styles.dropdownContainer}>
                    <Text style={styles.label}>Category*</Text>
                    <DropDownInput
                        data={categories}
                        value={selectedCategory}
                        onChange={item => {
                            setSelectedCategory(item.value);
                            setSelectedCategoryName(item.label);
                        }}
                        placeholder="Select category"
                    />
                </View>
                <View style={styles.conditionContainer}>
                    <Text style={styles.heading}>Item Condition</Text>
                    <View style={{ flexDirection: "row", gap: 10 }}>

                        {
                            checkBoxNames.map((item, index) => {
                                return (
                                    <TouchableOpacity 
                                        key={index} 
                                        activeOpacity={0.9} 
                                        onPress={() => handleCheckboxChange(item.value)} 
                                        style={[
                                            styles.checkboxContainer,
                                            checked === item.value && styles.activeCheckbox
                                        ]}
                                    >
                                        <View style={styles.checkBox}>
                                            {checked === item.value && (
                                                <Icon name="check" size={20} color="black" style={{ position: "absolute" }} />
                                            )}
                                        </View>
                                        <Text style={styles.checkboxText}>{item.display}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>
                <TextInput
                    placeholderTextColor={colors.black}
                    placeholder="Enter Point Value or Cash value"
                    style={styles.title}
                    value={pointOrCashValue}
                    onChangeText={setPointOrCashValue}
                />
                <TextInput
                    style={styles.description}
                    multiline={true}
                    numberOfLines={4}
                    placeholder="Description"
                    placeholderTextColor={colors.black}
                    textAlignVertical="top"
                    value={description}
                    onChangeText={setDescription}
                />

            </View>


            <View style={styles.bottomButtons}>

                <CustomButton
                    height={Metrix.VerticalSize(42)}
                    title={"PREVIEW"}
                    backgroundColor={colors.white}
                    color={colors.black}
                    borderWidth={1}
                    borderColor={colors.borderColor}
                    borderRadius={Metrix.VerticalSize(4)}
                    flex={1}
                    onPress={handlePreview}
                />

                <CustomButton
                    height={Metrix.VerticalSize(42)}
                    title={"PUBLISH"}
                    backgroundColor={colors.buttonColor}
                    borderRadius={Metrix.VerticalSize(4)}
                    flex={1} />
            </View>
        </KeyboardAwareScrollView>
    );
}
