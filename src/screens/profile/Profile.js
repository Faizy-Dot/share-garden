import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { Metrix } from "../../config";
import { Images } from "../../config";
import colors from '../../config/Colors';
import styles from './styles';
import BackArrowIcon from '../../components/backArrowIcon/BackArrowIcon';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/Actions/authActions/loginAction';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome';





const profileData = [
    {
        id: 1,
        image: Images.earnCoinIcon,
        title: "How to earn SG Pts",
        description: "how it works to earn points",
        navigationPath: "EarnSGpts"
    },
    {
        id: 2,
        image: Images.sgItemsIcon,
        title: "My SG Items",
        description: "View my posted, draft & favorite items.",
        navigationPath: "MySGItems"
    },
    {
        id: 3,
        image: Images.bidsIcon,
        title: "My Bids",
        description: "view the status of bids offered by me",
        navigationPath: "MyBids"
    },
    {
        id: 4,
        image: Images.tipsBlackTab,
        title: "My SG Tips",
        description: "view my posted tips, draft & favorite tips.",
        navigationPath: "MySGTips"
    },
    {
        id: 6,
        image: Images.reviewsIcon,
        title: "Reviews",
        description: "Check SG ratings & reviews on your profile",
        navigationPath: "Reviews"
    },
    {
        id: 7,
        image: Images.settingsIcon,
        title: "Settings",
        description: "Privacy & manage account",
        navigationPath: "Settings"
    },
    {
        id: 8,
        image: Images.profileAppLogo,
        title: "Help & Support Share Garden",
        description: "Help centre and legal terms",
        borders: true,
        navigationPath: "HelpAndSupport"
    },
    {
        id: 9,
        image: Images.logoutIcon,
        title: "Logout",
        description: ""
    },
]

export default function Profile({ navigation }) {

    const { loading, error, user } = useSelector((state) => state.login);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        Toast.show({
            type: 'success',
            text1: "Logout Successfully",
        });
        navigation.navigate('Login');
    };

    const handleItemPress = (item) => {
        if (item.title === 'Logout') {
            handleLogout();
        } else {
            navigation.navigate(`${item.navigationPath}`)
        }
    };
    const renderProfileData = ({ item }) => {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => handleItemPress(item)}>
                <View style={[styles.profileDataContainer, item.borders && styles.helpBox]}>
                    <Image source={item.image} style={{ resizeMode: "contain", width: Metrix.HorizontalSize(30) }} />
                    <View style={{ gap: Metrix.VerticalSize(5), marginLeft: 20, flex: 1 }}>
                        <Text style={styles.title}>{item.title}</Text>
                        {
                            item.description &&
                            <Text style={styles.description}>{item.description}</Text>
                        }
                    </View>
                    <Image source={Images.rightArrowIcon} />
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={{ marginTop: Metrix.VerticalSize(13), paddingHorizontal: Metrix.HorizontalSize(15), }}>
                    <BackArrowIcon />
                </View>

                <View style={styles.navBar}>
                    <View style={styles.profileContainer}>

                        {
                            user?.profileImage ?
                                <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
                                :
                                <Icon name="user-circle" size={Metrix.HorizontalSize(64)} color="#ccc" />

                        }
                    </View>

                    <View style={{ flexDirection: "row", gap: Metrix.HorizontalSize(15), marginLeft: Metrix.HorizontalSize(15) }}>
                        <View style={{ gap: Metrix.VerticalSize(5) }}>
                            <Text style={styles.userName}>{user ? user.firstName + ' ' + user.lastName : "Ashley Simson"}</Text>
                            <Text onPress={() => navigation.navigate("EditProfile")} style={styles.editProfile}>Edit Profile</Text>
                        </View>
                        <View style={{ flexDirection: "row", gap: Metrix.HorizontalSize(5) }}>
                            <Text>{user?.points || 0}</Text>
                            <Image source={Images.homeGreenBit} style={styles.geenBitImg} />
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
                        </TouchableOpacity>
                    </View>

                </View>


                <View style={{ marginTop: Metrix.VerticalSize(15), flex: 1, }}>

                    <FlatList data={profileData}
                        renderItem={renderProfileData}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                    />
                </View>

            </View>


        </View>
    );
}

