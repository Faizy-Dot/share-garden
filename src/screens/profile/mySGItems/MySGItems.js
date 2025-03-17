import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import styles from './style';
import BackArrowIcon from '../../../components/backArrowIcon/BackArrowIcon';
import NavBar from '../../../components/navBar/NavBar';
import { Images, Metrix } from '../../../config';
import CustomButton from '../../../components/Button/Button';
import colors from '../../../config/Colors';
import fonts from '../../../config/Fonts';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../config/axios';

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

const NoItemsMessage = ({ text }) => (
    <View style={{ padding: 20, alignItems: 'center' }}>
        <Text style={{ 
            fontFamily: fonts.InterRegular, 
            fontSize: Metrix.FontSmall,
            color: colors.grey 
        }}>
            {text}
        </Text>
    </View>
);

export default function MySGItems({ navigation }) {
    const [publishedItems, setPublishedItems] = useState([]);
    const [draftItems, setDraftItems] = useState([]);
    const { user } = useSelector((state) => state.login);

    useEffect(() => {
        const fetchUserProducts = async () => {
            try {
                // Fetch published products
                const publishedResponse = await axiosInstance.get(`/api/products/user/${user.id}/published`);
                setPublishedItems(publishedResponse.data);

                // Fetch draft products
                const draftsResponse = await axiosInstance.get(`/api/products/user/${user.id}/drafts`);
                setDraftItems(draftsResponse.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        if (user?.id) {
            fetchUserProducts();
        }
    }, [user]);

    const renderPostedItems = (item) => (
        <TouchableOpacity 
            key={item.id} 
            style={styles.itemsContainer}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('ProductDetail', { item })}
        >
            <View style={{ flexDirection: "row", gap: Metrix.HorizontalSize(10), paddingHorizontal: Metrix.HorizontalSize(10) }}>
                <Image 
                    source={item.images ? { uri: item.images.split(',')[0] } : Images.homePopularListing} 
                    style={styles.postedImg} 
                />
                <View style={{ gap: Metrix.VerticalSize(15) }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={styles.title}>{item.title}</Text>
                        {item.isSGPoints ? (
                            <View style={styles.amount}>
                                <Image source={Images.homeBitLogo} />
                                <Text>{item.minBid}</Text>
                            </View>
                        ) : (
                            <View style={styles.amount}>
                                <Image source={Images.homeDollarLogo} />
                                <Text>{item.price}</Text>
                            </View>
                        )}
                    </View>
                    <Text style={styles.description}>{item.description}</Text>
                </View>
            </View>
            {item.isSGPoints && (
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: Metrix.VerticalSize(15), paddingHorizontal: Metrix.HorizontalSize(10) }}>
                    <Text style={styles.highestBidText}>
                        Highest Bid: <Text style={[styles.highestBidText, { color: colors.buttonColor }]}>{item.highestBid || 0}</Text>
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
                    <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterBold }}>{item.bidDuration ? `${Math.floor(item.bidDuration / (24 * 3600))} d` : "N/A"}</Text>
                </View>
                <View style={styles.bottomIcon}>
                    <Image source={Images.eyeIcon} />
                    <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterBold }}>{item.views || 0} views</Text>
                </View>
                <View style={styles.bottomIcon}>
                    <Image source={Images.likeIcon} />
                    <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterBold }}>{item.likes || 0} likes</Text>
                </View>
                <View style={styles.bottomIcon}>
                    <Image source={Images.shareIcon} />
                    <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterBold }}>{item.shares || 0}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    const renderDrafts = (item) => {
        return (
            <TouchableOpacity 
                key={item.id} 
                style={styles.draftsContainer}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('ProductDetail', { item })}
            >
                <View style={{ flexDirection: "row", gap: Metrix.HorizontalSize(10), }}>
                    <Image 
                        source={item.images ? { uri: item.images.split(',')[0] } : Images.homePopularListing} 
                        style={styles.postedImg} 
                    />
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
            </TouchableOpacity>
        )
    }

    const renderFavourites = (item) => {
        return (
            <TouchableOpacity 
                key={item.id} 
                style={styles.draftsContainer}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('ProductDetail', { item })}
            >
                <View style={{ flexDirection: "row", gap: Metrix.HorizontalSize(10), }}>
                    <Image 
                        source={item.images ? { uri: item.images.split(',')[0] } : Images.homePopularListing} 
                        style={styles.postedImg} 
                    />
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
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.mySGItemsContainer}>
            <View style={styles.topContainer}>
                <BackArrowIcon />
                <NavBar title={"My SG Items"} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: Metrix.VerticalSize(25), paddingBottom: Metrix.VerticalSize(20) }}>
                <View style={styles.Container}>
                    <Text style={styles.titleContainerText}>Posted SG Items</Text>
                    {publishedItems.length > 0 ? 
                        publishedItems.map(renderPostedItems) : 
                        <NoItemsMessage text="No posted items found" />
                    }
                </View>
                <View style={styles.Container}>
                    <Text style={styles.titleContainerText}>Drafts</Text>
                    {draftItems.length > 0 ? 
                        draftItems.map(renderDrafts) : 
                        <NoItemsMessage text="No drafts found" />
                    }
                </View>
                <View style={styles.Container}>
                    <Text style={styles.titleContainerText}>Favorites</Text>
                    {favouritesData.map(renderFavourites)}
                </View>
            </ScrollView>
        </View>
    );
}
