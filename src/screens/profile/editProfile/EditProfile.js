import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, TextInput, PermissionsAndroid, Platform, Modal, ActivityIndicator, StyleSheet } from 'react-native';
import styles from './styles';
import { Colors, Images, Metrix } from '../../../config';
import BackArrowIcon from '../../../components/backArrowIcon/BackArrowIcon';
import colors from '../../../config/Colors';
import CustomButton from '../../../components/Button/Button';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from "react-redux";
import Axios from 'axios';
import fonts from '../../../config/Fonts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-element-dropdown';
import * as ImagePicker from 'react-native-image-picker';
import { Alert } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { updateUserProfile } from '../../../redux/Actions/authActions/loginAction';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CameraIcon } from '../../../assets/svg';
import axiosInstance from '../../../config/axios';
import { BASE_URL } from '../../../config/constants';


export default function EditProfile({ navigation }) {
    const { user } = useSelector((state) => state.login);
    const [fname, setFname] = useState(user?.firstName);
    const [lname, setLname] = useState(user?.lastName);
    const [about, setAbout] = useState(user?.about || '');
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);
    const [gender, setGender] = useState(user?.gender);
    const [imageUri, setImageUri] = useState(null);
    const [date, setDate] = useState(user?.dateOfBirth ? new Date(user.dateOfBirth) : new Date());
    const [formattedDate, setFormattedDate] = useState(user?.dateOfBirth ? user.dateOfBirth.split('T')[0] : '');
    const [open, setOpen] = useState(false); // Modal visibility
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const [imageLoading, setImageLoading] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [selectedProvince, setSelectedProvince] = useState(user?.province || '');
    const [selectedCity, setSelectedCity] = useState(user?.city || '');
    const [cities, setCities] = useState([]);
    const [address1, setAddress1] = useState(user?.address1 || '');

    const countries = [{
        label: "Canada"
    }]

    const provinces = [
        { label: "Alberta", value: "Alberta" },
        { label: "British Columbia", value: "British Columbia" },
        { label: "Manitoba", value: "Manitoba" },
        { label: "New Brunswick", value: "New Brunswick" },
        { label: "Newfoundland and Labrador", value: "Newfoundland and Labrador" },
        { label: "Nova Scotia", value: "Nova Scotia" },
        { label: "Ontario", value: "Ontario" },
        { label: "Prince Edward Island", value: "Prince Edward Island" },
        { label: "Quebec", value: "Quebec" },
        { label: "Saskatchewan", value: "Saskatchewan" }
    ];

    console.log("user from edit profile==>>>", user)

    // Add useEffect to initialize cities when component mounts
    useEffect(() => {
        if (user?.province) {
            const citiesForProvince = getCitiesForProvince(user.province);
            setCities(citiesForProvince);
            // Set the selected city if it exists in the user object
            if (user?.city && citiesForProvince.some(city => city.value === user.city)) {
                setSelectedCity(user.city);
            }
        }
    }, []);

    // Add useEffect to update cities when province changes
    useEffect(() => {
        if (selectedProvince) {
            const citiesForProvince = getCitiesForProvince(selectedProvince);
            setCities(citiesForProvince);
            // Reset city if it's not in the new province's cities
            if (!citiesForProvince.some(city => city.value === selectedCity)) {
                setSelectedCity('');
            }
        } else {
            setCities([]);
            setSelectedCity('');
        }
    }, [selectedProvince]);

    const handleSubmit = async () => {
        if (!fname || !lname || !phoneNumber) {
            Toast.show({
                type: 'error',
                text1: 'Validation Error',
                text2: 'Some fields are required!',
            });
            return;
        }
        setLoading(true)
        try {
            const response = await axiosInstance.put(
                '/api/auth/profile',
                {
                    firstName: fname,
                    lastName: lname,
                    profileImage: imageUri ? imageUri : user.profileImage,
                    about,
                    gender: gender,
                    dateOfBirth: formattedDate,
                    phoneNumber: phoneNumber,
                    province: selectedProvince,
                    city: selectedCity,
                    address1: address1
                }
            );

            if (response.status === 200) {
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: response.data.message,
                });
                const updatedUser = {
                    ...user,
                    firstName: fname,
                    lastName: lname,
                    profileImage: imageUri ? imageUri : user.profileImage,
                    about,
                    phoneNumber,
                    province: selectedProvince,
                    city: selectedCity,
                    address1: address1
                };
                dispatch(updateUserProfile(updatedUser));
                navigation.navigate('Profile');
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Something went wrong!',
                });
            }
        } catch (error) {
            console.error(error.response?.status, error.response?.data);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Error updating profile!',
            });
        } finally {
            setLoading(false)
        }
    };



    const data = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
        { label: 'Other', value: 'Other' },
    ];

    const renderItem = item => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
            </View>
        );
    };



    const handleConfirm = (selectedDate) => {
        setOpen(false);
        setDate(selectedDate);
        const formatted = selectedDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
        setFormattedDate(formatted);
    };


    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'This app needs access to your camera to take photos.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        }
        return true;
    };

    const handleImagePick = async () => {
        const options = {
            mediaType: 'photo',
            quality: 0.8,
            includeBase64: false,
        };

        Alert.alert(
            'Select Image',
            'Choose an option to select a profile picture.',
            [
                {
                    text: 'Take Photo',
                    onPress: async () => {
                        const hasPermission = await requestCameraPermission();
                        if (hasPermission) {
                            try {
                                const result = await ImagePicker.launchCamera(options);
                                if (!result.didCancel && result.assets) {
                                    handleImageUpload(result.assets[0]);
                                }
                            } catch (error) {
                                console.error('Camera error:', error);
                            }
                        }
                    },
                },
                {
                    text: 'Choose from Gallery',
                    onPress: async () => {
                        try {
                            const result = await ImagePicker.launchImageLibrary(options);
                            if (!result.didCancel && result.assets) {
                                handleImageUpload(result.assets[0]);
                            }
                        } catch (error) {
                            console.error('Gallery error:', error);
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

    const handleImageUpload = async (imageFile) => {
        setImageLoading(true);
        try {
            const formData = new FormData();
            formData.append('profileImage', {
                uri: imageFile.uri,
                type: imageFile.type || 'image/jpeg',
                name: imageFile.fileName || 'image.jpg',
            });

            // Get user token from Redux store
            const token = user?.token;
            if (!token) {
                throw new Error('No authentication token found');
            }

            // Use fetch instead of axios for FormData upload
            const response = await fetch(`${BASE_URL}/api/auth/upload-profile-image`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    // Don't set Content-Type - let React Native set it automatically with boundary
                },
                body: formData,
            });

            const responseData = await response.json();

            if (response.ok && response.status === 200) {
                console.log("response.data.imageUrl==>>>", responseData.imageUrl)
                setProfileImage(responseData.imageUrl);
                setImageUri(responseData.imageUrl);
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Profile image updated successfully',
                });
            } else {
                throw new Error(responseData.message || 'Failed to upload image');
            }
        } catch (error) {
            console.error('Image upload error:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.message || 'Failed to upload image',
            });
        } finally {
            setImageLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={{ gap: Metrix.VerticalSize(11) }}>
                    <View style={{ marginTop: Metrix.VerticalSize(13), paddingHorizontal: Metrix.HorizontalSize(15), flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: Metrix.HorizontalSize(15) }}>
                            <BackArrowIcon />
                            <Text style={styles.editProfileText}>Edit Profile</Text>
                        </View>
                        <CustomButton width={Metrix.HorizontalSize(81)}
                            height={Metrix.VerticalSize(36)}
                            title={loading ? "Save..." : "Save"}
                            borderRadius={Metrix.VerticalSize(4)}
                            onPress={handleSubmit} />
                    </View>

                    <View style={{
                        flexDirection: "row",
                        gap: Metrix.HorizontalSize(20), paddingHorizontal: Metrix.HorizontalSize(20),
                        alignItems: "center"
                    }}>
                        <TouchableOpacity
                            style={styles.imagePickerContainer}
                            onPress={handleImagePick}
                            disabled={imageLoading}
                        >
                            {profileImage || user.profileImage ? (
                                <View style={styles.profileContainer}>
                                    <Image
                                        source={{ uri: profileImage || user.profileImage }}
                                        style={styles.profileImage}
                                        resizeMode="cover"
                                    />
                                    <View style={styles.camerIconConatiner}>
                                        <CameraIcon />
                                    </View>
                                </View>
                            ) : (
                                <View style={styles.profileContainer}>
                                    {imageLoading ? (
                                        <ActivityIndicator color={Colors.primary} />
                                    ) : (
                                        <>
                                            <Icon name="camera" size={24} color={Colors.grey} />
                                            <Text style={styles.uploadText}>Upload Photo</Text>
                                        </>
                                    )}
                                </View>
                            )}
                        </TouchableOpacity>
                        <View style={{ gap: 10, flex: 1 }}>
                            <Text style={[styles.userName, { fontSize: Metrix.FontExtraLarge, }]}>{user?.firstName + " " + user?.lastName}</Text>
                        </View>
                    </View>

                    <View style={{
                        marginTop: Metrix.VerticalSize(7),
                        paddingHorizontal: Metrix.HorizontalSize(15)
                    }}>
                        <Text style={{
                            fontSize: Metrix.normalize(8),
                            fontFamily: fonts.InterLight,
                        }}>JPG, JPEG, PNG Min: 400px, Max: 1024px</Text>
                    </View>
                </View>

                <KeyboardAwareScrollView contentContainerStyle={{ paddingBottom: Metrix.VerticalSize(30) }}>

                    <View style={styles.topInputContainer}>
                        <View style={{ gap: Metrix.VerticalSize(7) }}>
                            <Text style={styles.userName}>First Name</Text>
                            <TextInput style={styles.inputs}
                                value={fname}
                                onChangeText={setFname} />
                        </View>
                        <View style={{ gap: Metrix.VerticalSize(7) }}>
                            <Text style={styles.userName}>Last Name</Text>
                            <TextInput style={styles.inputs}
                                onChangeText={setLname}
                                value={lname} />
                        </View>
                        <View style={{ gap: Metrix.VerticalSize(7) }}>
                            <Text style={styles.userName}>Something about you</Text>
                            <TextInput style={styles.inputs}
                                onChangeText={setAbout}
                                value={about} />
                        </View>
                        <View style={{ gap: Metrix.VerticalSize(7) }}>
                            <Text style={styles.userName}>Gender</Text>
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                data={data}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                renderItem={renderItem}
                                onChange={item => {
                                    setGender(item.value);
                                }}
                                value={gender}
                            />
                        </View>
                        <View style={{ gap: Metrix.VerticalSize(7) }}>
                            <Text style={styles.userName}>Country</Text>
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                data={countries}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                renderItem={renderItem}
                                onChange={item => {
                                    setGender(item.value);
                                }}
                                value={"Canada"}
                                placeholder='Canada'
                            />
                        </View>
                        <View style={{ gap: Metrix.VerticalSize(7) }}>
                            <Text style={styles.userName}>Address</Text>
                            <TextInput
                                style={styles.inputs}
                                value={address1}
                                onChangeText={setAddress1}
                                placeholder="Enter your address"
                            />
                        </View>
                        <View style={{ gap: Metrix.VerticalSize(7) }}>
                            <Text style={styles.userName}>Province</Text>
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                data={provinces}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                renderItem={renderItem}
                                onChange={item => {
                                    setSelectedProvince(item.value);
                                    setSelectedCity(''); // Reset city when province changes
                                    setCities(getCitiesForProvince(item.value));
                                }}
                                value={selectedProvince}
                                placeholder="Select Province"
                            />
                        </View>
                        <View style={{ gap: Metrix.VerticalSize(7) }}>
                            <Text style={styles.userName}>City</Text>
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                data={cities}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                renderItem={renderItem}
                                onChange={item => {
                                    setSelectedCity(item.value);
                                }}
                                value={selectedCity}
                                placeholder="Select City"
                                disabled={!selectedProvince}
                            />
                        </View>
                        <View style={{ gap: Metrix.VerticalSize(7) }}>
                            <Text style={styles.userName}>Date of birth</Text>
                            <TouchableOpacity onPress={() => setOpen(true)}>
                                <TextInput
                                    style={[styles.inputs]}
                                    placeholder="YYYY-MM-DD"
                                    value={formattedDate}
                                    editable={false} // Prevent manual input
                                />
                            </TouchableOpacity>

                            {/* Date Picker Modal */}
                            <Modal transparent={true} visible={open} animationType="slide">
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)' }}>
                                    <DatePicker
                                        date={date}
                                        mode="date"
                                        onDateChange={setDate}
                                        onConfirm={handleConfirm}
                                        onCancel={() => setOpen(false)}
                                        maximumDate={new Date()}
                                        textColor={colors.white}

                                    />
                                    <CustomButton title={"Set"}
                                        onPress={() => handleConfirm(date)} />
                                </View>
                            </Modal>
                        </View>
                    </View>

                    <View style={styles.borderLineContainer}>
                        <View style={styles.borderLine}></View>
                    </View>

                    <View style={styles.bottomInputContainer}>
                        <Text style={styles.contactInformationText}>Contact Information</Text>
                        <View style={{ gap: Metrix.VerticalSize(7) }}>
                            <Text style={styles.userName}>Phone Number</Text>
                            <TextInput style={styles.inputs}
                                keyboardType="numeric" // Opens a numeric keypad
                                onChangeText={(text) => {
                                    const numericValue = text.replace(/[^0-9]/g, '');
                                    setPhoneNumber("+" + numericValue);
                                }}
                                value={phoneNumber} />
                            <Text style={{ fontSize: Metrix.FontSmall, fontFamily: fonts.InterRegular }}>This is the number of buyers, reminder, and other notification.</Text>
                        </View>
                        <View style={{ gap: Metrix.VerticalSize(7) }}>
                            <Text style={styles.userName}>Email</Text>
                            <TextInput style={styles.inputs}
                                value={user?.email}
                                editable={false}
                                selectTextOnFocus={false}
                                disableFullscreenUI={true}
                            />
                            <Text style={{ fontSize: Metrix.FontSmall, fontFamily: fonts.InterRegular }}>This email will be useful to keep in touch. we dont share your private email address with other SG users</Text>
                        </View>

                    </View>

                    <View style={[styles.borderLineContainer, { marginTop: Metrix.VerticalSize(30) }]}>
                        <View style={styles.borderLine}></View>
                    </View>

                    <View style={styles.connectionContainer}>
                        <Text style={styles.contactInformationText}>Social Connections</Text>
                        <View style={styles.connectionBoxes}>
                            {/* <View>
                                <CustomButton width={"100%"} height={Metrix.VerticalSize(40)} backgroundColor={colors.white} borderColor={colors.black} borderWidth={1} borderRadius={Metrix.VerticalSize(3)} icon={<FontAwesome name="facebook" color="#1B70D4" style={styles.socialButtonIcon} />}
                                    title={"Disconnect"}
                                    color={colors.black} fontSize={Metrix.FontSmall} fontFamily={fonts.InterBold} />
                                <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterRegular, marginTop: Metrix.VerticalSize(5), flex: 1 }}>Sign in with Facebook and discover your trusted connections to buyers</Text>
                            </View> */}
                            <View>
                                <CustomButton width={"100%"} height={Metrix.VerticalSize(40)} backgroundColor={colors.white} borderColor={colors.black} borderWidth={1} borderRadius={Metrix.VerticalSize(3)} icon={<FontAwesome name="google" color="#F8443E" style={styles.socialButtonIcon} />}
                                    title={"disconnect"}
                                    color={colors.black} fontSize={Metrix.FontSmall} fontFamily={fonts.InterBold} />
                                <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterRegular, marginTop: Metrix.VerticalSize(5) }}>Sign in with Gmail and discover your trusted connections to buyers</Text>
                            </View>
                            {/* <View>
                                <CustomButton width={"100%"} height={Metrix.VerticalSize(40)} backgroundColor={colors.white} borderColor={colors.black} borderWidth={1} borderRadius={Metrix.VerticalSize(3)} icon={<FontAwesome name="apple" color={colors.black} style={styles.socialButtonIcon} />}
                                    title={"Connect"}
                                    color={colors.black} fontSize={Metrix.FontSmall} fontFamily={fonts.InterBold} />
                                <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterRegular, marginTop: Metrix.VerticalSize(5) }}>Sign in with Apple and discover your trusted connections
                                    to buyers</Text>
                            </View> */}
                        </View>

                    </View>


                </KeyboardAwareScrollView>



            </View>


        </View>
    );
}

// Helper function to get cities for a province
const getCitiesForProvince = (province) => {
    const citiesByProvince = {
        "Alberta": [
            { label: "Calgary", value: "Calgary" },
            { label: "Edmonton", value: "Edmonton" },
            { label: "Red Deer", value: "Red Deer" },
            { label: "Lethbridge", value: "Lethbridge" },
            { label: "St. Albert", value: "St. Albert" },
            { label: "Medicine Hat", value: "Medicine Hat" },
            { label: "Grande Prairie", value: "Grande Prairie" },
            { label: "Airdrie", value: "Airdrie" },
            { label: "Spruce Grove", value: "Spruce Grove" },
            { label: "Leduc", value: "Leduc" }
        ],
        "British Columbia": [
            { label: "Vancouver", value: "Vancouver" },
            { label: "Victoria", value: "Victoria" },
            { label: "Surrey", value: "Surrey" },
            { label: "Burnaby", value: "Burnaby" },
            { label: "Richmond", value: "Richmond" },
            { label: "Kelowna", value: "Kelowna" },
            { label: "Abbotsford", value: "Abbotsford" },
            { label: "Coquitlam", value: "Coquitlam" },
            { label: "Saanich", value: "Saanich" },
            { label: "Langley", value: "Langley" }
        ],
        "Manitoba": [
            { label: "Winnipeg", value: "Winnipeg" },
            { label: "Brandon", value: "Brandon" },
            { label: "Steinbach", value: "Steinbach" },
            { label: "Thompson", value: "Thompson" },
            { label: "Portage la Prairie", value: "Portage la Prairie" },
            { label: "Winkler", value: "Winkler" },
            { label: "Selkirk", value: "Selkirk" },
            { label: "Morden", value: "Morden" },
            { label: "Dauphin", value: "Dauphin" },
            { label: "The Pas", value: "The Pas" }
        ],
        "New Brunswick": [
            { label: "Saint John", value: "Saint John" },
            { label: "Moncton", value: "Moncton" },
            { label: "Fredericton", value: "Fredericton" },
            { label: "Dieppe", value: "Dieppe" },
            { label: "Miramichi", value: "Miramichi" },
            { label: "Edmundston", value: "Edmundston" },
            { label: "Bathurst", value: "Bathurst" },
            { label: "Campbellton", value: "Campbellton" },
            { label: "Oromocto", value: "Oromocto" },
            { label: "Quispamsis", value: "Quispamsis" }
        ],
        "Newfoundland and Labrador": [
            { label: "St. John's", value: "St. John's" },
            { label: "Conception Bay South", value: "Conception Bay South" },
            { label: "Mount Pearl", value: "Mount Pearl" },
            { label: "Paradise", value: "Paradise" },
            { label: "Corner Brook", value: "Corner Brook" },
            { label: "Grand Falls-Windsor", value: "Grand Falls-Windsor" },
            { label: "Gander", value: "Gander" },
            { label: "Happy Valley-Goose Bay", value: "Happy Valley-Goose Bay" },
            { label: "Labrador City", value: "Labrador City" },
            { label: "Stephenville", value: "Stephenville" }
        ],
        "Nova Scotia": [
            { label: "Halifax", value: "Halifax" },
            { label: "Cape Breton", value: "Cape Breton" },
            { label: "Dartmouth", value: "Dartmouth" },
            { label: "Sydney", value: "Sydney" },
            { label: "Truro", value: "Truro" },
            { label: "New Glasgow", value: "New Glasgow" },
            { label: "Glace Bay", value: "Glace Bay" },
            { label: "Kentville", value: "Kentville" },
            { label: "Bridgewater", value: "Bridgewater" },
            { label: "Yarmouth", value: "Yarmouth" }
        ],
        "Ontario": [
            { label: "Toronto", value: "Toronto" },
            { label: "Ottawa", value: "Ottawa" },
            { label: "Mississauga", value: "Mississauga" },
            { label: "Brampton", value: "Brampton" },
            { label: "Hamilton", value: "Hamilton" },
            { label: "London", value: "London" },
            { label: "Markham", value: "Markham" },
            { label: "Vaughan", value: "Vaughan" },
            { label: "Kitchener", value: "Kitchener" },
            { label: "Windsor", value: "Windsor" }
        ],
        "Prince Edward Island": [
            { label: "Charlottetown", value: "Charlottetown" },
            { label: "Summerside", value: "Summerside" },
            { label: "Stratford", value: "Stratford" },
            { label: "Cornwall", value: "Cornwall" },
            { label: "Montague", value: "Montague" },
            { label: "Kensington", value: "Kensington" },
            { label: "Souris", value: "Souris" },
            { label: "Alberton", value: "Alberton" },
            { label: "Tignish", value: "Tignish" },
            { label: "Georgetown", value: "Georgetown" }
        ],
        "Quebec": [
            { label: "Montreal", value: "Montreal" },
            { label: "Quebec City", value: "Quebec City" },
            { label: "Laval", value: "Laval" },
            { label: "Gatineau", value: "Gatineau" },
            { label: "Longueuil", value: "Longueuil" },
            { label: "Sherbrooke", value: "Sherbrooke" },
            { label: "Saguenay", value: "Saguenay" },
            { label: "Lévis", value: "Lévis" },
            { label: "Trois-Rivières", value: "Trois-Rivières" },
            { label: "Terrebonne", value: "Terrebonne" }
        ],
        "Saskatchewan": [
            { label: "Saskatoon", value: "Saskatoon" },
            { label: "Regina", value: "Regina" },
            { label: "Prince Albert", value: "Prince Albert" },
            { label: "Moose Jaw", value: "Moose Jaw" },
            { label: "Swift Current", value: "Swift Current" },
            { label: "Yorkton", value: "Yorkton" },
            { label: "North Battleford", value: "North Battleford" },
            { label: "Estevan", value: "Estevan" },
            { label: "Weyburn", value: "Weyburn" },
            { label: "Lloydminster", value: "Lloydminster" }
        ]
    };
    return citiesByProvince[province] || [];
};

