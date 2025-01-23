import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import styles from './style';
import BackArrowIcon from '../../../components/backArrowIcon/BackArrowIcon';
import NavBar from '../../../components/navBar/NavBar';
import { Images, Metrix } from '../../../config';
import CustomButton from '../../../components/Button/Button';
import colors from '../../../config/Colors';
import fonts from '../../../config/Fonts';

const postedItemsData = [
    {
        id: 1,
        title: "7 seater sofa",
        description: "Comfortable 7-seater sofa set for sale!.  Sturdy wooden frame. High-density foam cushions",
        bids: "2950",
        highestBid: "2200",
    },
    {
        id: 2,
        title: "Dinner set",
        description: "Brand new in box, 8-piece dinner set in blue cobalt color",
        dollar: "100",
    },
];

const draftsData = [
    {
        id: 1,
        title: "Wooden Bed",
        description: "Give old clothes a new life! Repair, upcycle, or repurpose them to reduce waste, save money, and unleash your creativity!",
        bids: "550",
    }
]

const favouritesData = [
    {
        id: 1,
        title: "Headphones",
        description: "JBL wireless headphones optimal for gaming and music on the go. Fairly used, enjoy high bass sound.",
        bids: "900",
        highestBid: "800",
    }
]

export default function MySGItems() {
    const renderPostedItems = (item) => (
        <View key={item.id} style={styles.itemsContainer}>
            <View style={{ flexDirection: "row", gap: Metrix.HorizontalSize(10), paddingHorizontal: Metrix.HorizontalSize(10) }}>
                <Image source={Images.homePopularListing} style={styles.postedImg} />
                <View style={{ gap: Metrix.VerticalSize(15) }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={styles.title}>{item.title}</Text>
                        {item.bids ? (
                            <View style={styles.amount}>
                                <Image source={Images.homeBitLogo} />
                                <Text>{item.bids}</Text>
                            </View>
                        ) : (
                            <View style={styles.amount}>
                                <Image source={Images.homeDollarLogo} />
                                <Text>{item.dollar}</Text>
                            </View>
                        )}
                    </View>
                    <Text style={styles.description}>{item.description}</Text>
                </View>
            </View>
            {item.bids && (
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: Metrix.VerticalSize(15), paddingHorizontal: Metrix.HorizontalSize(10) }}>
                    <Text style={styles.highestBidText}>
                        Highest Bid: <Text style={[styles.highestBidText, { color: colors.buttonColor }]}>2200</Text>
                    </Text>
                    <CustomButton
                        title={"VIEW BIDS"}
                        width={Metrix.HorizontalSize(160)}
                        height={Metrix.VerticalSize(36)}
                        borderRadius={Metrix.VerticalSize(4)}
                        fontSize={Metrix.FontSmall}
                        fontFamily={fonts.InterBold}
                    />
                </View>
            )}
            <View style={styles.bottomContainer}>
                <View style={styles.bottomIcon}>
                    <Image source={Images.timeIcon} />
                    <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterBold }}>2 d</Text>
                </View>
                <View style={styles.bottomIcon}>
                    <Image source={Images.eyeIcon} />
                    <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterBold }}>1366 views</Text>
                </View>
                <View style={styles.bottomIcon}>
                    <Image source={Images.likeIcon} />
                    <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterBold }}>240 likes</Text>
                </View>
                <View style={styles.bottomIcon}>
                    <Image source={Images.shareIcon} />
                    <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterBold }}>23</Text>
                </View>
            </View>
        </View>
    );

    const renderDrafts = (item) => {
        return (
            <View style={styles.draftsContainer} key={item.id}>
                <View style={{ flexDirection: "row", gap: Metrix.HorizontalSize(10), }}>
                    <Image source={Images.homePopularListing} style={styles.postedImg} />
                    <View style={{ gap: Metrix.VerticalSize(15) }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={styles.title}>{item.title}</Text>
                            {item.bids ? (
                                <View style={styles.amount}>
                                    <Image source={Images.homeBitLogo} />
                                    <Text>{item.bids}</Text>
                                </View>
                            ) : (
                                <View style={styles.amount}>
                                    <Image source={Images.homeDollarLogo} />
                                    <Text>{item.dollar}</Text>
                                </View>
                            )}
                        </View>
                        <Text style={styles.description}>{item.description}</Text>
                    </View>
                </View>
                <View style={styles.draftButtonContainer}>
                    <CustomButton title={"PREVIEW"}
                        backgroundColor={"#C4C4C4"}
                        width={Metrix.HorizontalSize(100)}
                        height={Metrix.VerticalSize(36)}
                        borderRadius={Metrix.VerticalSize(4)}
                        fontSize={Metrix.FontSmall}
                        fontFamily={fonts.InterBold} />
                    <CustomButton title={"PUBLISH"}
                        backgroundColor={colors.buttonColor}
                        width={Metrix.HorizontalSize(100)}
                        height={Metrix.VerticalSize(36)}
                        borderRadius={Metrix.VerticalSize(4)}
                        fontSize={Metrix.FontSmall}
                        fontFamily={fonts.InterBold} />

                </View>
            </View>
        )
    }

    const renderFavourites = (item) => {
        return (
            <View style={styles.draftsContainer} key={item.id}>
                <View style={{ flexDirection: "row", gap: Metrix.HorizontalSize(10), }}>
                    <Image source={Images.homePopularListing} style={styles.postedImg} />
                    <View style={{ gap: Metrix.VerticalSize(15) }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={styles.title}>{item.title}</Text>
                            {item.bids ? (
                                <View style={styles.amount}>
                                    <Image source={Images.homeBitLogo} />
                                    <Text>{item.bids}</Text>
                                </View>
                            ) : (
                                <View style={styles.amount}>
                                    <Image source={Images.homeDollarLogo} />
                                    <Text>{item.dollar}</Text>
                                </View>
                            )}
                        </View>
                        <Text style={styles.description}>{item.description}</Text>
                    </View>
                </View>
                <View style={styles.favouritesButtonContainer}>
                  <Text style={{ fontSize: Metrix.FontRegular,
        fontFamily: fonts.InterSemiBold}}>Highest bid {item.highestBid}</Text>
                    <CustomButton title={"PLACE BIDS"}
                        backgroundColor={colors.buttonColor}
                        width={Metrix.HorizontalSize(100)}
                        height={Metrix.VerticalSize(36)}
                        borderRadius={Metrix.VerticalSize(4)}
                        fontSize={Metrix.FontSmall}
                        fontFamily={fonts.InterBold} />

                </View>
            </View>
        )
    }

    return (
        <View style={styles.mySGItemsContainer}>
            <View style={styles.topContainer}>
                <BackArrowIcon />
                <NavBar title={"My SG Items"} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: Metrix.VerticalSize(25),paddingBottom:Metrix.VerticalSize(20) }}>
                <View style={styles.Container}>
                    <Text style={styles.titleContainerText}>Posted SG Items</Text>
                    {postedItemsData.map(renderPostedItems)}
                </View>
                <View style={styles.Container}>
                    <Text style={styles.titleContainerText}>Drafts</Text>
                    {draftsData.map(renderDrafts)}
                </View>
                <View style={styles.Container}>
                    <Text style={styles.titleContainerText}>Favorites</Text>
                    {favouritesData.map(renderFavourites)}
                </View>
            </ScrollView>
        </View>
    );
}
