import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Fonts, Images, Metrix } from "../../../config";
import styles from "./styles";
import CustomButton from "../../../components/Button/Button";
import colors from "../../../config/Colors";
import NavBar from "../../../components/navBar/NavBar";
import CustomInput from "../../../components/customInput/CustomInput";
import CategoryFlatList from "../../../components/categoryFlatList/CategoryFlatList";
import { useSelector } from "react-redux";

const popularListings = [
    { id: "1", title: "Single Bed", location: "First Floor Maya Apartments", price: "8.5", image: Images.homePopularListing, bit: true, dollarLogo: false },
    { id: "2", title: "7 Seater Sofa Set", location: "7 seater sofa set 10/10", price: "450", image: Images.homePopularListing, bit: false, dollarLogo: true },
    { id: "3", title: "Audi A6", location: "4th (C7) Generation 2016 1.8 TFSI for Sale", price: "1850", image: Images.homePopularListing, bit: false, dollarLogo: true },
];

const myPosts = [
    { id: 1, post: "Single bed in Toronto" },
    { id: 2, post: "Audi A6 in Toronto" },
    { id: 3, post: "Sofa Set in Toronto" }
];

const ItemsTabScreen = () => {
    const navigation = useNavigation();
    const { user } = useSelector((state) => state.login);
    console.log("user from sg tabs==>>",user)

    const renderPopularListing = ({ item }) => (
        <TouchableOpacity 
            activeOpacity={0.8} 
            style={styles.listingContainer}
            onPress={() => navigation.navigate('ProductDetail', { item })}
        >
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
        </TouchableOpacity>
    );

    const renderMyPosts = ({ item }) => (
        <TouchableOpacity activeOpacity={0.8} style={styles.postBox}>
            <Image source={Images.homePostVector} style={{ width: Metrix.VerticalSize(14), height: Metrix.VerticalSize(14) }} />
            <Text style={{ fontSize: Metrix.customFontSize(10), fontFamily: Fonts.InterLight }}>{item.post}</Text>
        </TouchableOpacity>
    );

    return (
        <KeyboardAwareScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.header}>
                <Image source={Images.homeLogo} style={styles.logo} />
            </View>

            {user ? (
                <View style={{ paddingHorizontal: Metrix.HorizontalSize(15) }}>
                    <NavBar title={"SG Marketplace"} />
                </View>
            ) : (
                <View style={styles.address}>
                    <Image source={Images.homeLocation} style={styles.locationLogo} />
                    <View>
                        <Text style={{ fontSize: Metrix.FontRegular, fontFamily: Fonts.InterBold }}>Maya Appartments</Text>
                        <Text style={{ fontSize: Metrix.FontExtraSmall }}>2132 Halsey Avenue, Toronto</Text>
                    </View>
                </View>
            )}

            <View style={{ marginTop: Metrix.VerticalSize(20) }}>
                <CustomInput 
                    justifyContent={'space-around'}
                    iconCondition={true}
                    placeholder={"Search items near you"} 
                />
            </View>

            <View style={styles.middle}>
                {!user && (
                    <View>
                        <Image source={Images.homeBackground} style={styles.homeBackgroundImg} />
                        <View style={styles.middleShown}>
                            <Image source={Images.homeLogo} style={styles.middleLogo} />
                            <View>
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
                                fontFamily={Fonts.InterLight}
                            />
                        </View>
                    </View>
                )}

                <View style={[styles.categoryContainer, user && { marginTop: Metrix.VerticalSize(0) }]}>
                    {!user && (
                        <View style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ color: colors.buttonColor, fontSize: Metrix.FontRegular, fontFamily: Fonts.InterBold }}>Categories</Text>
                            <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: Fonts.InterSemiBold }}>See All</Text>
                        </View>
                    )}
                    <View style={{ marginTop: Metrix.VerticalSize(15) }}>
                        <CategoryFlatList />
                    </View>
                </View>

                <View style={[styles.popularListingsContainer, user && { marginTop: Metrix.VerticalSize(20) }]}>
                    {!user && (
                        <View style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ color: colors.buttonColor, fontSize: Metrix.FontRegular, fontFamily: Fonts.InterBold }}>Popular Listings</Text>
                            <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: Fonts.InterSemiBold }}>See All</Text>
                        </View>
                    )}

                    <FlatList
                        data={popularListings}
                        renderItem={renderPopularListing}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoryList}
                    />
                </View>

                {!user && (
                    <>
                        <View style={styles.merchantShowcaseContainer}>
                            <View>
                                <Text style={{ color: colors.buttonColor, fontSize: Metrix.FontRegular, fontFamily: Fonts.InterBold }}>Merchants's Showcase</Text>
                            </View>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: Metrix.HorizontalSize(8) }}>
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
                                <Text style={{ color: colors.buttonColor, fontSize: Metrix.FontRegular, fontFamily: Fonts.InterBold }}>My Posts</Text>
                            </View>
                            <FlatList
                                data={myPosts}
                                renderItem={renderMyPosts}
                                keyExtractor={(item) => item.id.toString()}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.myPost}
                            />
                        </View>
                    </>
                )}

                <View style={styles.popularListingsContainer}>
                    {!user && (
                        <View style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ color: colors.buttonColor, fontSize: Metrix.FontRegular, fontFamily: Fonts.InterBold }}>Toys</Text>
                            <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: Fonts.InterSemiBold }}>See All</Text>
                        </View>
                    )}

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
                    {!user && (
                        <View style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ color: colors.buttonColor, fontSize: Metrix.FontRegular, fontFamily: Fonts.InterBold }}>Books</Text>
                            <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: Fonts.InterSemiBold }}>See All</Text>
                        </View>
                    )}

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