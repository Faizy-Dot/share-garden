import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import styles from './style';
import BackArrowIcon from '../../../components/backArrowIcon/BackArrowIcon';
import NavBar from '../../../components/navBar/NavBar';
import { Images, Metrix } from '../../../config';
import CustomButton from '../../../components/Button/Button';
import colors from '../../../config/Colors';
import fonts from '../../../config/Fonts';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../config/axios';
import { BlackBitIcon, CashIcon, CrossIcon, LikesIcon, ModalInfoIcon, ModalSuccessLogo, ShareIcon, TimeIcon, ViewsIcon } from '../../../assets/svg';


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
    const [favouritesData, setFavouritesData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const { user } = useSelector((state) => state.login);
    const [loading, setLoading] = useState(false)

    console.log("drafts items==>>", draftItems)

    const fetchUserProducts = async () => {
        try {
            const publishedResponse = await axiosInstance.get(`/api/products/user/${user.id}/published`);
            setPublishedItems(publishedResponse.data);

            const draftsResponse = await axiosInstance.get(`/api/products/user/${user.id}/drafts`);
            setDraftItems(draftsResponse.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };


    useEffect(() => {
        if (user?.id) {
            fetchUserProducts();
        }
    }, [user]);


    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axiosInstance.get('/api/products/user/favorites');
                setFavouritesData(response.data);
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        fetchFavorites();
    }, []);


    const handlePublish = async (item) => {

        setLoading(true);
        try {
            const formData = new FormData();

            // Required fields
            formData.append('title', item.title);
            formData.append('description', item.description);
            formData.append('categoryId', item.categoryId);
            formData.append('condition', item.condition);
            formData.append('isSGPoints', item.isSGPoints.toString());
            formData.append('isPublished', true);
            formData.append('status', 'ACTIVE')

            // Conditional fields based on payment type
            if (item.isSGPoints) {
                formData.append('minBid', item.minBid.toString());
                formData.append('bidDuration', item.bidDuration.toString());
            } else {
                formData.append('price', item.price.toString());
            }

            // Append images
            item.imagesArray.filter(img => img !== null).forEach((image, index) => {
                formData.append('images', {
                    uri: image,
                    type: 'image/jpeg',
                    name: `image${index}.jpg`,
                });
            });


            const response = await axiosInstance.put(
                `/api/products/${item.id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            console.log('API Response:', response);

            if (response.status === 200) {
                setLoading(false)
                setModalVisible(true);

                setTimeout(() => {
                    fetchUserProducts();
                    setModalVisible(false);
                }, 7000);
            }



        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to create product';
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: errorMessage,
            });
        } finally {
            setLoading(false);
        }
    };



    const renderPostedItems = (item) => (
        <TouchableOpacity
            key={item.id}
            style={styles.itemsContainer}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('PreviewPostedSgItems', { item })}
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
                                <BlackBitIcon />
                                <Text>{item.minBid}</Text>
                            </View>
                        ) : (
                            <View style={styles.amount}>
                                <CashIcon />
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
                        onPress={() => navigation.navigate('PreviewPostedSgItems', { item: item })}
                    />
                </View>
            )}
            <View style={styles.bottomContainer}>
                <View style={styles.bottomIcon}>
                    <TimeIcon />
                    <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterBold }}>{item.bidDuration ? `${Math.floor(item.bidDuration / (24 * 3600))} d` : "N/A"}</Text>
                </View>
                <View style={styles.bottomIcon}>
                    <ViewsIcon />
                    <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterBold }}>{item.views || 0} views</Text>
                </View>
                <View style={styles.bottomIcon}>
                    <LikesIcon />
                    <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterBold }}>{item.likes || 0} likes</Text>
                </View>
                <View style={styles.bottomIcon}>
                    <ShareIcon />
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
                <View style={styles.draftButtonContainer}>
                    <CustomButton title={"PREVIEW"}
                        backgroundColor={"#C4C4C4"}
                        width={Metrix.HorizontalSize(100)}
                        height={Metrix.VerticalSize(36)}
                        borderRadius={Metrix.VerticalSize(4)}
                        fontSize={Metrix.FontSmall}
                        fontFamily={fonts.InterBold}
                        onPress={() => navigation.navigate("Post", {
                            screen: "PostList",
                            params: { ...item, SGItems: true }
                        })} />
                    <CustomButton title={loading ? "PUBLISH..." : "PUBLISH"}
                        backgroundColor={colors.buttonColor}
                        width={Metrix.HorizontalSize(100)}
                        height={Metrix.VerticalSize(36)}
                        borderRadius={Metrix.VerticalSize(4)}
                        fontSize={Metrix.FontSmall}
                        fontFamily={fonts.InterBold}
                        onPress={() => handlePublish(item)} />

                </View>
            </TouchableOpacity>
        )
    }

    const renderFavourites = (item) => {
        const product = item.product;
        return (
            <TouchableOpacity
                key={product.id}
                style={styles.draftsContainer}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('ProductDetail', { item: product })}
            >
                <View style={{ flexDirection: "row", gap: Metrix.HorizontalSize(10), }}>
                    <Image
                        source={{ uri: product.images.split(',')[0] }}
                        style={styles.postedImg}
                    />
                    <View style={{ gap: Metrix.VerticalSize(15) }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={styles.title}>{product.title}</Text>
                            {product.isSGPoints ? (
                                <View style={styles.amount}>
                                    <BlackBitIcon />
                                    <Text>{product.minBid}</Text>
                                </View>
                            ) : (
                                <View style={styles.amount}>
                                    <CashIcon />
                                    <Text>{product.price}</Text>
                                </View>
                            )}
                        </View>
                        <Text style={styles.description}>{product.description}</Text>
                    </View>
                </View>
                <View style={styles.favouritesButtonContainer}>
                    {(product.isSGPoints || product.isBidding) && (
                        <>
                            <Text style={{
                                fontSize: Metrix.FontRegular,
                                fontFamily: fonts.InterSemiBold
                            }}>
                                Highest bid {product.highestBid}
                            </Text>
                            <CustomButton
                                title={"PLACE BIDS"}
                                backgroundColor={colors.buttonColor}
                                width={Metrix.HorizontalSize(100)}
                                height={Metrix.VerticalSize(36)}
                                borderRadius={Metrix.VerticalSize(4)}
                                fontSize={Metrix.FontSmall}
                                fontFamily={fonts.InterBold}
                            />
                        </>
                    )}
                </View>
            </TouchableOpacity>
        )
    }

    const handleModalClose = () => {
        setModalVisible(false)
        fetchUserProducts();
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


                <Modal visible={modalVisible} transparent animationType="fade">
                    <View style={styles.modalContainer}>
                        <View style={styles.modalBox}>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={handleModalClose}
                            >
                                <CrossIcon />
                            </TouchableOpacity>
                            <ModalSuccessLogo />
                            <Text style={styles.modalTitle}>

                                <>Your SG item has been posted on <Text style={{ color: colors.buttonColor }}>SG marketplace</Text></>

                            </Text>


                            <View style={styles.bottomModalContainer}>
                                <ModalInfoIcon />
                                <Text style={styles.modalDescription}>
                                    You can access your posted item under <Text style={{ color: colors.redColor }}>Profile {">"} My posted items.</Text>
                                </Text>
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </View>
    );
}
