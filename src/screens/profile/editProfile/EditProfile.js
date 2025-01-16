import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, TextInput } from 'react-native';
import styles from './styles';
import { Colors, Images, Metrix } from '../../../config';
import BackArrowIcon from '../../../components/backArrowIcon/BackArrowIcon';
import colors from '../../../config/Colors';
import CustomButton from '../../../components/Button/Button';
import Toast from 'react-native-toast-message';
import { useSelector } from "react-redux";
import Axios from 'axios';
import fonts from '../../../config/Fonts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
var baseUrl = 'https://api.sharegarden.ca/api/';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-element-dropdown';

const TabBarButton = ({ iconSource, label, focused, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.tabButton} activeOpacity={1}>
        <Image
            source={iconSource}
            style={{
                width: Metrix.HorizontalSize(28),
                height: Metrix.VerticalSize(28),
                resizeMode: "contain",
                tintColor: focused ? colors.buttonColor : colors.black,
            }}
        />
        <Text style={[styles.tabLabel, { color: focused ? colors.buttonColor : colors.black }]}>{label}</Text>
    </TouchableOpacity>
);

export default function EditProfile({ navigation }) {
    const { user, token } = useSelector((state) => state.login);
    const [fname, setFname] = useState(user?.firstname);
    const [lname, setLname] = useState(user?.lastname);
    const [email, setEmail] = useState(user?.emailaddress);
    const [phone, setPhone] = useState(user?.phonenumber);
    const [gender , setGender] = useState("")

    const config = {
        header: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    }

    console.log("user from edit profile==>>>",user)

    const handleSubmit = async () => {
        try {
            const response = await Axios.post(
                `${baseUrl}User/UpdateProfile`,
                {
                    firstName: fname,
                    lastName: lname,
                    profilePicutreUrl: "",
                    about: user.about,
                    genderId: 0,
                    dob: "0001-01-01T00:00:00",
                    phoneNumber: user.phonenumber,
                    email: user.emailaddress,
                    userId: user.userid,
                },
                config
            );

            console.log(response);

            if (response.data.status === "success") {
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Profile updated successfully!',
                });
                navigation.navigate('Profile');
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Something went wrong!',
                });
            }
        } catch (error) {
            console.error(error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Error updating profile!',
            });
        }
    };

    const data = [
        { label: 'Male', value: '1' },
        { label: 'Female', value: '2' },
      
    ];

       const renderItem = item => {
            return (
                <View style={styles.item}>
                    <Text style={styles.textItem}>{item.label}</Text>
                </View>
            );
        };


    return (
        <View style={styles.container}>
            <View style={styles.content}>


                <View style={{ gap: Metrix.VerticalSize(11) }}>
                    <View style={{ marginTop: Metrix.VerticalSize(13), paddingHorizontal: Metrix.HorizontalSize(15), }}>
                        <BackArrowIcon />
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: Metrix.HorizontalSize(18), alignItems: "center" }}>
                        <Text style={styles.editProfileText}>Edit Profile</Text>
                        <CustomButton width={Metrix.HorizontalSize(81)}
                            height={Metrix.VerticalSize(36)}
                            title={"Save"}
                            borderRadius={Metrix.VerticalSize(4)} />
                    </View>

                    <View style={{
                        flexDirection: "row",
                        gap: Metrix.HorizontalSize(20), paddingHorizontal: Metrix.HorizontalSize(20)
                    }}>
                        <Image source={Images.homeProfile} style={{ width: Metrix.HorizontalSize(80), height: Metrix.HorizontalSize(80) }} />
                        <View style={styles.cameraPicker}>
                            <Image source={Images.cameraIcon} />
                        </View>
                        <View style={{ gap: 10, flex: 1 }}>
                            <Text style={styles.userName}>Enter your name</Text>
                            <TextInput style={[styles.inputs, {
                                fontSize: Metrix.normalize(16),
                                fontFamily: fonts.InterLight,
                            }]} />

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
                            <Text style={styles.userName}>Something about you</Text>
                            <TextInput style={styles.inputs} />
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
                            <Text style={styles.userName}>Date of birth</Text>
                            <TextInput style={styles.inputs} />
                        </View>
                    </View>

                    <View style={styles.borderLineContainer}>
                        <View style={styles.borderLine}></View>
                    </View>

                    <View style={styles.bottomInputContainer}>
                        <Text style={styles.contactInformationText}>Contact Information</Text>
                        <View style={{ gap: Metrix.VerticalSize(7) }}>
                            <Text style={styles.userName}>Phone Number</Text>
                            <TextInput style={styles.inputs} />
                            <Text style={{ fontSize: Metrix.FontSmall, fontFamily: fonts.InterRegular }}>This is the number of buyers, reminder, and other notification.</Text>
                        </View>
                        <View style={{ gap: Metrix.VerticalSize(7) }}>
                            <Text style={styles.userName}>Email</Text>
                            <TextInput style={styles.inputs} />
                            <Text style={{ fontSize: Metrix.FontSmall, fontFamily: fonts.InterRegular }}>This email will be useful to keep in touch. we dont share your private email address with other SG users</Text>
                        </View>

                    </View>

                    <View style={[styles.borderLineContainer, { marginTop: Metrix.VerticalSize(30) }]}>
                        <View style={styles.borderLine}></View>
                    </View>

                    <View style={styles.connectionContainer}>
                        <Text style={styles.contactInformationText}>Optional Information</Text>
                        <View style={styles.connectionBoxes}>
                            <View>
                                <CustomButton width={"100%"} height={Metrix.VerticalSize(40)} backgroundColor={colors.white} borderColor={colors.black} borderWidth={1} borderRadius={Metrix.VerticalSize(3)} icon={<FontAwesome name="facebook" color="#1B70D4" style={styles.socialButtonIcon} />}
                                    title={"Disconnect"}
                                    color={colors.black} fontSize={Metrix.FontSmall} fontFamily={fonts.InterBold} />
                                <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterRegular, marginTop: Metrix.VerticalSize(5), flex: 1 }}>Sign in with Facebook and discover your trusted connections to buyers</Text>
                            </View>
                            <View>
                                <CustomButton width={"100%"} height={Metrix.VerticalSize(40)} backgroundColor={colors.white} borderColor={colors.black} borderWidth={1} borderRadius={Metrix.VerticalSize(3)} icon={<FontAwesome name="google" color="#F8443E" style={styles.socialButtonIcon} />}
                                    title={"Connect"}
                                    color={colors.black} fontSize={Metrix.FontSmall} fontFamily={fonts.InterBold} />
                                <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterRegular, marginTop: Metrix.VerticalSize(5) }}>Sign in with Gmail and discover your trusted connections to buyers</Text>
                            </View>
                            <View>
                                <CustomButton width={"100%"} height={Metrix.VerticalSize(40)} backgroundColor={colors.white} borderColor={colors.black} borderWidth={1} borderRadius={Metrix.VerticalSize(3)} icon={<FontAwesome name="apple" color={colors.black} style={styles.socialButtonIcon} />}
                                    title={"Connect"}
                                    color={colors.black} fontSize={Metrix.FontSmall} fontFamily={fonts.InterBold} />
                                <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterRegular, marginTop: Metrix.VerticalSize(5) }}>Sign in with Apple and discover your trusted connections
                                    to buyers</Text>
                            </View>
                        </View>

                    </View>


                </KeyboardAwareScrollView>



            </View>

            <View style={styles.tabBarContainer}>
                <TabBarButton onPress={() => navigation.navigate("SgTabs", { screen: "Post" })} iconSource={Images.postBlackTab} label="Post" />
                <TabBarButton onPress={() => navigation.navigate("SgTabs", { screen: "Tips" })} iconSource={Images.tipsBlackTab} label="Tips" />
                <TabBarButton onPress={() => navigation.navigate("SgTabs", { screen: "Items" })} iconSource={Images.itemsBlackTab} label="Items" />
                <TabBarButton onPress={() => navigation.navigate("SgTabs", { screen: "Rewards" })} iconSource={Images.rewardsBlackTab} label="Rewards" />
                <TabBarButton onPress={() => navigation.navigate("SgTabs", { screen: "Ads" })} iconSource={Images.adsBlackTab} label="Ads" />
            </View>
        </View>
    );
}

