import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { Metrix } from "../../config";
import fonts from "../../config/Fonts";
import { Images } from "../../config";
import colors from "../../config/Colors";
import styles from './styles';
import NavBar from '../../components/navBar/NavBar';
import BackArrowIcon from '../../components/backArrowIcon/BackArrowIcon';



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


const profileData = [
    {
        id: 1,
        image: Images.earnCoinIcon,
        title: "How to earn SG Pts",
        description: "how it works to earn points"
    },
    {
        id: 2,
        image: Images.sgItemsIcon,
        title: "My SG Items",
        description: "View my posted, draft & favorite items."
    },
    {
        id: 3,
        image: Images.bidsIcon,
        title: "My Bids",
        description: "view the status of bids offered by me"
    },
    {
        id: 4,
        image: Images.tipsBlackTab,
        title: "My SG Tips",
        description: "view my posted tips, draft & favorite tips."
    },
    {
        id: 6,
        image: Images.reviewsIcon,
        title: "Reviews",
        description: "Check SG ratings & reviews on your profile"
    },
    {
        id: 7,
        image: Images.settingsIcon,
        title: "Settings",
        description: "Privacy & manage account"
    },
    {
        id: 8,
        image: Images.profileAppLogo,
        title: "Help & Support Share Garden",
        description: "Help centre and legal terms",
        borders : true
    },
    {
        id: 9,
        image: Images.logoutIcon,
        title: "Logout",
        description: ""
    },
]

export default function Profile({ navigation }) {

    const renderProfileData = ({ item }) => {
        return (
            <View style={[styles.profileDataContainer , item.borders && styles.helpBox]}>
                <Image source={item.image} />
                <View style={{ gap: Metrix.VerticalSize(5),marginLeft :20,flex :1 }}>
                    <Text style={styles.title}>{item.title}</Text>
                    {
                        item.description &&
                        <Text style={styles.description}>{item.description}</Text>
                    }
                </View>
                <Image source={Images.rightArrowIcon} />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={{ marginTop: Metrix.VerticalSize(13) }}>
                    <BackArrowIcon />
                </View>

                <View style={styles.navBar}>
                    <Image source={Images.homeProfile} style={styles.profileImg} />
                    <View style={{ flexDirection: "row", gap: Metrix.HorizontalSize(15) }}>
                        <View style={{ gap: Metrix.VerticalSize(5) }}>
                            <Text style={styles.userName}>Ashley Simson</Text>
                            <Text style={styles.editProfile}>Edit Profile</Text>
                        </View>
                        <View style={{ flexDirection: "row", gap: Metrix.HorizontalSize(5) }}>
                            <Text>50200</Text>
                            <Image source={Images.homeGreenBit} style={styles.geenBitImg} />
                        </View>
                        <Image source={Images.homeMessageIcon} style={styles.messageIcon} />
                        <Image source={Images.homeBellIcon} style={styles.bellIcon} />
                    </View>

                </View>

                <View style={{ marginTop: Metrix.VerticalSize(15), flex: 1 }}>

                    <FlatList data={profileData}
                        renderItem={renderProfileData}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                    />
                </View>

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

