import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Image, FlatList, TouchableOpacity, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Fonts, Images, Metrix } from "../../../config";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import CustomButton from "../../../components/Button/Button";
import fonts from "../../../config/Fonts";
import colors from "../../../config/Colors";
import NavBar from "../../../components/navBar/NavBar";
import CustomInput from "../../../components/customInput/CustomInput";

const categories = [
    { id: "1", name: "Mobile", icon: Images.homeCategoryMobile },
    { id: "2", name: "Furniture", icon: Images.homeCategoryFurniture },
    { id: "3", name: "Electronics", icon: Images.homeCategoryElectronics },
    { id: "4", name: "Fashion", icon: Images.homeCategoryShoes },
    { id: "5", name: "Books", icon: Images.homeCategoryBooks },
    { id: "6", name: "Tools", icon: Images.homeTools },
    { id: "7", name: "Luxury", icon: Images.homeLuxury },
    { id: "8", name: "Services", icon: Images.homeServices },
    { id: "9", name: "Vehicles", icon: Images.homeVehicles },
    { id: "10", name: "Property", icon: Images.homeProperty },
    { id: "11", name: "Baby", icon: Images.homeBaby },
    { id: "12", name: "Toys", icon: Images.homeToys },
    { id: "13", name: "Pets", icon: Images.homePets },
    { id: "14", name: "Foods & Drinks", icon: Images.homeFoodDrinks },
    { id: "15", name: "Sports   Equipment", icon: Images.homeSports },
    { id: "16", name: "Staionary", icon: Images.homeStationary },
    { id: "17", name: "Music", icon: Images.homeMusic },
    { id: "18", name: "Art", icon: Images.homeArt },
    { id: "19", name: "Others", icon: Images.homeOthers },
];

const popularListings = [
    { id: "1", title: "Single Bed", location: "First Floor Maya Apartments", price: "8.5", image: Images.homePopularListing, bit: true, dollarLogo: false },
    { id: "2", title: "7 Seater Sofa Set", location: "7 seater sofa set 10/10", price: "$ 450", image: Images.homePopularListing, bit: false, dollarLogo: true },
    { id: "3", title: "Audi A6", location: "4th (C7) Generation 2016 1.8 TFSI for Sale", price: "$ 1850", image: Images.homePopularListing, bit: false, dollarLogo: false },
];

const myPosts = [
    {
        id: 1,
        post: "Single bed in Toronto"
    },
    {
        id: 2,
        post: "Audi A6 in Toronto"
    },
    {
        id: 3,
        post: "Sofa Set in Toronto"
    }
]

const ItemsTabScreen = ({ route }) => {
    const [selectedId, setSelectedId] = useState(null)
    const { user } = route.params
    console.log("user login=>", user)

    const renderCategory = ({ item }) => {

        const isSelect = selectedId == item.id
        return (
            <TouchableOpacity onPress={() => setSelectedId(item.id)} activeOpacity={0.8} style={{ width: Metrix.HorizontalSize(73), height: Metrix.VerticalSize(130) }}>
                <View style={[styles.category, isSelect && { backgroundColor: "#5B5B5B" }]}>
                    <Image source={item.icon} />
                </View>
                <Text style={styles.categoryText}>{item.name}</Text>
            </TouchableOpacity>

        )
    }


    const renderPopularListing = ({ item }) => (
        <TouchableOpacity activeOpacity={0.8} style={styles.listingContainer}>
            <Image source={item.image} style={styles.listingImage} />
            <Text style={styles.listingTitle}>{item.title}</Text>
            <Text style={styles.listingLocation}>{item.location}</Text>
            <View style={styles.priceContainer}>
                {item.bit ? (
                    <Image source={Images.homeBitLogo} />
                ) : item.dollarLogo ? (
                    <Image source={Images.homeDollarLogo} />
                ) : null}

                <Text style={styles.listingPrice}>{item.price}</Text>
            </View>
        </TouchableOpacity >
    )

    const renderMyPosts = ({ item }) => (
        <TouchableOpacity activeOpacity={0.8} style={styles.postBox}>
            <Image source={Images.homePostVector} style={{ width: Metrix.VerticalSize(14), height: Metrix.VerticalSize(14) }} />
            <Text style={{ fontSize: Metrix.customFontSize(10), fontFamily: fonts.InterLight }}>{item.post}</Text>
        </TouchableOpacity >
    );


    return (
        <KeyboardAwareScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

            <View style={styles.header}>
                <Image source={Images.homeLogo} style={styles.logo} />
            </View>



            {
                user ?
                    <View style={{ paddingHorizontal: Metrix.HorizontalSize(15) }}>
                        <NavBar
                            title={"SG Marketplace"} />
                    </View>
                    :
                    <View style={styles.address}>
                        <Image source={Images.homeLocation} style={styles.locationLogo} />
                        <View>
                            <Text style={{ fontSize: Metrix.FontRegular, fontFamily: Fonts.InterBold }}>Maya Appartments</Text>
                            <Text style={{ fontSize: Metrix.FontExtraSmall }}>2132 Halsey Avenue, Toronto</Text>
                        </View>
                    </View>

            }
            <View style={{ marginTop: Metrix.VerticalSize(20) }}>
                <CustomInput justifyContent={'space-around'}
                    iconCondition={true}
                    placeholder={"Search items near you"} />
            </View>

            <View style={styles.middle}>
                {
                    !user &&

                    <View>
                        <Image source={Images.homeBackground} style={styles.homeBackgroundImg} />
                        <View style={styles.middleShown}>
                            <Image source={Images.homeLogo} style={styles.middleLogo} />
                            <View >
                                <Text style={{ fontSize: Metrix.normalize(19), fontFamily: Fonts.InterBold, textAlign: "center" }}>Empowering</Text>
                                <Text style={{ fontSize: Metrix.normalize(19), fontFamily: Fonts.InterRegular, textAlign: "center", position: "relative", bottom: Metrix.VerticalSize(7) }}>Sustainable Exchanges</Text>
                            </View>
                            <CustomButton
                                title={"GET STARTED"}
                                width={Metrix.HorizontalSize(138)}
                                height={Metrix.VerticalSize(42)}
                                backgroundColor="#E35498"
                                borderRadius={Metrix.HorizontalSize(4)}
                                fontSize={Metrix.FontExtraSmall}
                                fontFamily={fonts.InterLight}
                            />
                        </View>
                    </View>
                }

                <View style={[styles.categoryContainer, user && { marginTop: Metrix.VerticalSize(0) }]}>
                    {
                        !user &&

                        <View style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ color: colors.buttonColor, fontSize: Metrix.FontRegular, fontFamily: fonts.InterBold }}>Categories</Text>
                            <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterSemiBold }}>See All</Text>
                        </View>
                    }

                    <FlatList
                        data={categories}
                        renderItem={renderCategory}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoryList}
                    />

                </View>

                <View style={[styles.popularListingsContainer, user && { marginTop: Metrix.VerticalSize(20) }]}>
                    {
                        !user &&

                        <View style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ color: colors.buttonColor, fontSize: Metrix.FontRegular, fontFamily: fonts.InterBold }}>Popular Listings</Text>
                            <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterSemiBold }}>See All</Text>
                        </View>
                    }

                    <FlatList
                        data={popularListings}
                        renderItem={renderPopularListing}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoryList}
                    />

                </View>
                {
                    !user &&

                    <View>
                        <View style={styles.merchantShowcaseContainer}>
                            <View>
                                <Text style={{ color: colors.buttonColor, fontSize: Metrix.FontRegular, fontFamily: fonts.InterBold }}>Merchants's Showcase</Text>
                            </View>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={
                                { gap: Metrix.HorizontalSize(8) }
                            }>
                                <TouchableOpacity activeOpacity={0.8}>
                                    <Image source={Images.homeMerchantShowcasetion} style={styles.merchantImg} />
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.8}>
                                    <Image source={Images.homeMerchantShowcasetion} style={styles.merchantImg} />
                                </TouchableOpacity>
                            </ScrollView>
                        </View>

                        <View style={styles.postContainer}>
                            <View>
                                <Text style={{ color: colors.buttonColor, fontSize: Metrix.FontRegular, fontFamily: fonts.InterBold }}>My Posts</Text>
                            </View>
                            <FlatList
                                data={myPosts}
                                renderItem={renderMyPosts}
                                keyExtractor={(item) => item.id}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.myPost}
                            />

                        </View>

                    </View>
                }

                <View style={styles.popularListingsContainer}>
                    {
                        !user &&

                        <View style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ color: colors.buttonColor, fontSize: Metrix.FontRegular, fontFamily: fonts.InterBold }}>Toys</Text>
                            <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterSemiBold }}>See All</Text>
                        </View>
                    }

                    <FlatList
                        data={popularListings}
                        renderItem={renderPopularListing}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoryList}
                    />

                </View>

                <View style={styles.popularListingsContainer}>
                    {
                        !user &&

                        <View style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ color: colors.buttonColor, fontSize: Metrix.FontRegular, fontFamily: fonts.InterBold }}>Books</Text>
                            <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterSemiBold }}>See All</Text>
                        </View>
                    }

                    <FlatList
                        data={popularListings}
                        renderItem={renderPopularListing}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoryList}
                    />

                </View>

            </View>


        </KeyboardAwareScrollView>
    );
};



export default ItemsTabScreen;
