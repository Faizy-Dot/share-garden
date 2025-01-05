import React from "react";
import { View, Text, StyleSheet, TextInput, Image, FlatList, TouchableOpacity, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Fonts, Images, Metrix } from "../../../config";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import CustomButton from "../../../components/Button/Button";
import fonts from "../../../config/Fonts";
import colors from "../../../config/Colors";

const categories = [
    { id: "1", name: "Mobile", icon: Images.homeCategoryMobile },
    { id: "2", name: "Furniture", icon: Images.homeCategoryFurniture },
    { id: "3", name: "Electronics", icon: Images.homeCategoryElectronics },
    { id: "4", name: "Fashion", icon: Images.homeCategoryShoes },
    { id: "5", name: "Books", icon: Images.homeCategoryBooks },
];

const popularListings = [
    { id: "1", title: "Single Bed", location: "First Floor Maya Apartments", price: "$8.5", image: Images.logo },
    { id: "2", title: "7 Seater Sofa Set", location: "7 seater sofa set 10/10", price: "$450", image: Images.logo },
    { id: "3", title: "Audi A6", location: "4th (C7) Generation 2016 1.8 TFSI for Sale", price: "$1850", image: Images.logo },
];

const ItemsTabScreen = () => {

    const renderCategory = ({ item }) => (
        <TouchableOpacity activeOpacity={0.8}>
            <View style={styles.category}>
            <Image source={item.icon} style={styles.categoryIcon} />
            </View>
            <Text style={styles.categoryText}>{item.name}</Text>
        </TouchableOpacity>
    );

    const renderPopularListing = ({ item }) => (
        <View style={styles.listingContainer}>
            <Image source={item.image} style={styles.listingImage} />
            <Text style={styles.listingTitle}>{item.title}</Text>
            <Text style={styles.listingLocation}>{item.location}</Text>
            <Text style={styles.listingPrice}>{item.price}</Text>
        </View>
    );

    return (
        <KeyboardAwareScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

            <View style={styles.header}>
                <Image source={Images.homeLogo} style={styles.logo} />
            </View>

            <View style={styles.address}>
                <Image source={Images.homeLocation} style={styles.locationLogo} />
                <View>
                    <Text style={{ fontSize: Metrix.FontRegular, fontFamily: Fonts.InterBold }}>Maya Appartments</Text>
                    <Text style={{ fontSize: Metrix.FontExtraSmall }}>2132 Halsey Avenue, Toronto</Text>
                </View>
            </View>

            <View style={styles.inputContainer}>
                <Image source={Images.homeSearch} style={styles.searchIcon} />
                <TextInput style={styles.input} placeholder="Search items near you" placeholderTextColor="#999" />
                <Image source={Images.homeFilter} style={styles.filterLogo} />
            </View>

            <View style={styles.middle}>
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

                <View style={styles.categoryContainer}>
                    <View style={{justifyContent : "space-between" ,flexDirection :"row",alignItems :"center"}}>
                        <Text style={{ color: colors.buttonColor, fontSize: Metrix.FontRegular, fontFamily: fonts.InterBold }}>Categories</Text>
                        <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterSemiBold }}>See All</Text>
                    </View>

                    <FlatList
                        data={categories}
                        renderItem={renderCategory}
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
