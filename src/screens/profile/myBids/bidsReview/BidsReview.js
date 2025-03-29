import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Modal, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './style';
import BackArrowIcon from '../../../../components/backArrowIcon/BackArrowIcon';
import NavBar from '../../../../components/navBar/NavBar';
import { Images, Metrix } from '../../../../config';
import { BlackBitIcon, CrossIcon, ModalInfoIcon, ModalSuccessLogo, NotificationIcon } from '../../../../assets/svg';
import fonts from '../../../../config/Fonts';
import colors from '../../../../config/Colors';
import CustomButton from '../../../../components/Button/Button';
import axiosInstance from '../../../../config/axios';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function BidsReview() {
    const route = useRoute();
    const navigation = useNavigation();
    
    // Log the entire route object to see what we're getting
    console.log("Full route object:", JSON.stringify(route, null, 2));
    console.log("Route params:", JSON.stringify(route.params, null, 2));
    
    // Destructure with default values and logging
    const { productId, bidId } = route.params || {};
    console.log("Destructured params - productId:", productId, "bidId:", bidId);
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [productDetail, setProductDetail] = useState(null);
    const [bidDetail, setBidDetail] = useState(null);

    const [modalVisible, setModalVisible] = useState(false)
    const [tradeProceed, setTradeProceed] = useState(false)
    const [buyProceed, setBuyProceed] = useState(false)
    const [transferSgPointsModal, setTransferSgPointsModal] = useState(false)

    const resetStates = useCallback(() => {
        setBuyProceed(false);
    }, []);

    useEffect(() => {
        console.log("useEffect triggered");
        console.log("Current route params:", JSON.stringify(route.params, null, 2));
        
        resetStates();
        
        // Check if we have the required parameters
        if (!route.params) {
            console.log("No route params found");
            setError('Navigation parameters are missing');
            setLoading(false);
            return;
        }

        const { productId, bidId } = route.params;
        console.log("Parameters in useEffect:", { productId, bidId });

        if (productId && bidId) {
            console.log("Starting to fetch details...");
            fetchDetails();
        } else {
            console.log("Missing required parameters:", { productId, bidId });
            setError('Missing required parameters');
            setLoading(false);
        }
    }, [resetStates, route.params]);

    const fetchDetails = async () => {
        try {
            setLoading(true);
            setError(null);

            console.log("Fetching product details for ID:", productId);
            // Fetch product details
            const productResponse = await axiosInstance.get(`/api/products/${productId}`);
            console.log("Product response:", productResponse.data);
            setProductDetail(productResponse.data);

            // Instead of fetching individual bid, get all user bids and find the matching one
            console.log("Fetching user bids to find bid:", bidId);
            const bidsResponse = await axiosInstance.get('/api/bids/user');
            console.log("All bids response:", bidsResponse.data);
            
            // Find the bid that matches both the bidId and productId
            const matchingBid = bidsResponse.data.find(bid => 
                bid.id === bidId && 
                bid.product?.id === productId
            );
            
            console.log("Matching bid search:", {
                bidId,
                productId,
                found: !!matchingBid,
                allBids: bidsResponse.data.map(b => ({ 
                    id: b.id, 
                    productId: b.product?.id,
                    amount: b.amount,
                    status: b.status
                }))
            });
            
            if (!matchingBid) {
                throw new Error(`Your bid for this product was not found`);
            }
            
            console.log("Found matching bid:", matchingBid);
            setBidDetail(matchingBid);

        } catch (err) {
            console.error('Error fetching details:', err);
            console.error('Error response:', err.response?.data);
            console.error('Error status:', err.response?.status);
            
            let errorMessage = 'Failed to load details. Please try again later.';
            if (err.response?.status === 404) {
                errorMessage = 'Product or bid not found.';
            } else if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            } else if (err.message) {
                errorMessage = err.message;
            }
            
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={[styles.BidsReviewContainer, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={colors.buttonColor} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.BidsReviewContainer, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: colors.redColor, fontFamily: fonts.InterRegular }}>
                    {error}
                </Text>
            </View>
        );
    }

    if (!productDetail || !bidDetail) {
        return (
            <View style={[styles.BidsReviewContainer, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: colors.redColor, fontFamily: fonts.InterRegular }}>
                    No details found
                </Text>
            </View>
        );
    }

    const getInitialLetter = (name) => {
        return name ? name.charAt(0).toUpperCase() : '?';
    };

    return (
        <View style={styles.BidsReviewContainer}>
            <View style={styles.topContainer}>
                <BackArrowIcon />
                <NavBar title={"My Bids"} />
            </View>

            <View style={styles.bidHeader}>
                <View style={styles.bidHeaderLeft}>
                    {productDetail.seller?.profileImage ? (
                        <Image 
                            source={{ uri: productDetail.seller.profileImage }} 
                            style={styles.profileImage}
                        />
                    ) : (
                        <View style={[styles.profileImage, {
                            backgroundColor: '#E8F3FF',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }]}>
                            <Text style={{
                                fontSize: Metrix.FontLarge,
                                fontFamily: fonts.InterBold,
                                color: colors.buttonColor,
                            }}>
                                {getInitialLetter(productDetail.seller?.firstName)}
                            </Text>
                        </View>
                    )}
                    <View style={{ flex: 1, marginLeft: Metrix.HorizontalSize(10), marginRight: Metrix.HorizontalSize(10) }}>
                        <Text style={styles.titleText} numberOfLines={1}>{productDetail.title}</Text>
                        <Text style={styles.subtitleText} numberOfLines={1}>By {productDetail.seller?.firstName} {productDetail.seller?.lastName}</Text>
                        <Text style={styles.publishDateText} numberOfLines={1}>
                            Published on {new Date(productDetail.createdAt).toLocaleDateString()}
                        </Text>
                    </View>
                </View>

                <View style={[styles.bidHeaderRight, { minWidth: Metrix.HorizontalSize(80) }]}>
                    <BlackBitIcon width={24} height={24} />
                    <Text style={[styles.bitValue, { marginLeft: Metrix.HorizontalSize(5) }]}>{bidDetail.amount}</Text>
                </View>
            </View>

            <View style={styles.chatContainer}>
                <TouchableOpacity 
                    style={{ flexDirection: 'row', alignItems: 'center', gap: Metrix.HorizontalSize(10) }}
                    onPress={() => navigation.navigate('ChatDetail', {
                        chatUser: {
                            id: productDetail.seller?.id,
                            name: `${productDetail.seller?.firstName} ${productDetail.seller?.lastName}`,
                            image: productDetail.seller?.profileImage
                        },
                        productInfo: {
                            id: productDetail.id,
                            title: productDetail.title,
                            price: bidDetail.amount,
                            image: productDetail.images?.[0]
                        }
                    })}
                >
                    <NotificationIcon />
                    <Text style={styles.chatText}>
                        Chat With <Text style={styles.redText}>{productDetail.seller?.firstName} {productDetail.seller?.lastName}</Text>
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.bidInfo}>
                <Text style={styles.myBidText}>
                    My Bid: <Text style={[
                        styles.myBidAcceptedText,
                        bidDetail.status === 'REJECTED' && { color: colors.redColor }
                    ]}>
                        {bidDetail.amount}
                    </Text>
                </Text>
                <View style={styles.statusContainer}>
                    <Text style={[
                        styles.myBidAcceptedText,
                        bidDetail.status === 'REJECTED' && { color: colors.redColor }
                    ]}>
                        {bidDetail.status}
                    </Text>
                    {bidDetail.status === 'ACCEPTED' && (
                        <ModalSuccessLogo width={39} height={39} checkColor={colors.buttonColor} />
                    )}
                </View>
            </View>

            <View style={styles.buttonsContainer}>
                <View style={[styles.buttonWrapper, buyProceed && { backgroundColor: colors.buttonColor, borderWidth: 0 }]}>
                    {
                        tradeProceed ?
                            <>
                                <Text style={[styles.tradeProgress, buyProceed && { color: colors.white }]}>Trade in Progress...</Text>
                                <View style={styles.infoWrapper}>
                                    <ModalInfoIcon IstrokeColor={buyProceed ? colors.white : colors.black} outerStroke={buyProceed ? colors.white : colors.black} />
                                    <Text style={[styles.infoText, buyProceed && { color: colors.white }]}>
                                        2000 SG points are on hold. {buyProceed && "until confirm"}
                                    </Text>
                                </View>
                            </>
                            :
                            <>
                                <CustomButton
                                    title={"Start Trade"}
                                    width={Metrix.HorizontalSize(202)}
                                    height={Metrix.VerticalSize(44)}
                                    borderRadius={Metrix.VerticalSize(25)}
                                    fontSize={Metrix.FontLarge}
                                    fontFamily={fonts.InterBold}
                                    onPress={() => setModalVisible(!modalVisible)}
                                    disabled={bidDetail.status !== 'ACCEPTED'}
                                    backgroundColor={bidDetail.status === 'ACCEPTED' ? colors.buttonColor : colors.grey}
                                    color={bidDetail.status === 'ACCEPTED' ? colors.white : '#AFAFAF'}
                                />
                                <View style={styles.infoWrapper}>
                                    <ModalInfoIcon IstrokeColor={colors.black} />
                                    <Text style={[styles.infoText, { flex: 1, textAlign: 'center' }]} numberOfLines={2}>
                                        {bidDetail.status === 'ACCEPTED' 
                                            ? "Click to start the trade process"
                                            : "Your bid is pending. Wait for seller's acceptance."}
                                    </Text>
                                </View>
                            </>

                    }
                </View>

                <View style={[styles.confirmWrapper, buyProceed && { backgroundColor: "#EEEDEF" }]}>
                    {
                        !buyProceed ?
                            <>

                                <CustomButton
                                    title={"Confirm Buy"}
                                    width={Metrix.HorizontalSize(202)}
                                    height={Metrix.VerticalSize(44)}
                                    borderRadius={Metrix.VerticalSize(25)}
                                    fontSize={Metrix.FontLarge}
                                    fontFamily={fonts.InterBold}
                                    backgroundColor={tradeProceed ? colors.buttonColor : "#D2D2D2"}
                                    color={tradeProceed ? colors.white : '#AFAFAF'}
                                    disabled={tradeProceed ? false : true}
                                    onPress={() => {
                                        setBuyProceed(true)
                                        setModalVisible(true)
                                    }}
                                />
                                <View style={styles.confirmInfoWrapper}>
                                    <ModalInfoIcon IstrokeColor={!tradeProceed ? "#646464" : colors.black} outerStroke={!tradeProceed ? "#646464" : colors.black} />
                                    {
                                        !tradeProceed ?
                                            <Text style={[styles.confirmInfoText, { color: "#646464" }]}>
                                                You need to confirm buy to transfer points & then pick up your item.
                                            </Text>
                                            :

                                            <Text style={[styles.confirmInfoText, { width: "90%" }]}>
                                                You need to confirm buy to share your Trade ID with seller to transfer points & then pick up your item.
                                            </Text>
                                    }
                                </View>
                            </>
                            :
                            <TouchableOpacity style={{ justifyContent: "center", alignItems: "center" }} activeOpacity={0.8} onPress={() => setModalVisible(true)}>
                                <View>
                                    <Text style={{ fontSize: Metrix.FontLarge, fontFamily: fonts.InterBold, color: colors.buttonColor, textAlign: "center" }}>Confirm Buy</Text>
                                    <Text style={{ fontSize: Metrix.FontSmall, fontFamily: fonts.InterSemiBold, }}>I have got this Share Trade ID# </Text>
                                </View>
                                <View style={{ flexDirection: "row", gap: Metrix.HorizontalSize(7), alignItems: "center" }}>
                                    <ModalInfoIcon outerStroke="#646464"
                                        IstrokeColor='#646464' />
                                    <Text style={{ fontSize: Metrix.FontSmall, fontFamily: fonts.InterSemiBold, color: "#646464" }}>You need to confirm buy to transfer points & then pick up your item.</Text>
                                </View>
                            </TouchableOpacity>
                    }
                </View>

                {
                    buyProceed &&
                    <TouchableOpacity activeOpacity={0.8} style={{ width: "100%", height: Metrix.VerticalSize(87), backgroundColor: colors.yellowColor, borderRadius: Metrix.VerticalSize(3), justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: Metrix.FontLarge, fontFamily: fonts.InterBold, color: colors.white }}>Report a problem</Text>
                        <View style={{ flexDirection: "row", gap: Metrix.HorizontalSize(7), alignItems: "center" }}>
                            <ModalInfoIcon outerStroke={colors.white} IstrokeColor={colors.white} />
                            <Text style={{ fontSize: Metrix.FontSmall, fontFamily: fonts.InterRegular, color: colors.white }}>Release my 2000 SG points and cancel trade</Text>
                        </View>
                    </TouchableOpacity>
                }
            </View>


            <Modal visible={modalVisible} transparent animationType="fade">
                <View style={styles.modalContainer}>
                    <View style={styles.modalBox}>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <CrossIcon />
                        </TouchableOpacity>

                        <View style={styles.modalContentWrapper}>
                            <BlackBitIcon width={64} height={64} />
                            <Text style={styles.modalSmallText}>Upon Clicking Proceed</Text>
                            {!buyProceed ? (
                                <>
                                    <View>
                                        <Text style={styles.modalRegularText}>Your 2000 SG Points</Text>
                                        <Text style={styles.modalSmallBoldText}>
                                            will be placed on hold, Until you confirm buy
                                        </Text>
                                    </View>

                                    <Text style={styles.tradeIdText}>
                                        Trade ID# <Text style={styles.tradeIdHighlight}>SG4321</Text>
                                    </Text>

                                    <CustomButton
                                        title={"PROCEED"}
                                        backgroundColor={colors.yellowColor}
                                        height={Metrix.VerticalSize(36)}
                                        width={Metrix.HorizontalSize(193)}
                                        borderRadius={Metrix.VerticalSize(35)}
                                        fontSize={Metrix.FontSmall}
                                        fontFamily={fonts.InterBold}
                                        onPress={() => {
                                            setTradeProceed(true);
                                            setModalVisible(false);
                                        }}
                                    />
                                </>
                            ) : (
                                <>
                                    <Text style={styles.tradeIdText}>
                                        Trade ID# <Text style={styles.tradeIdHighlight}>SG4321</Text>
                                    </Text>

                                    <Text style={styles.modalCenterText}>
                                        will be sent to the Seller which the seller will use to claim
                                        the 2000 SG point that are on hold.
                                    </Text>

                                    <CustomButton
                                        title={"PROCEED"}
                                        backgroundColor={colors.yellowColor}
                                        height={Metrix.VerticalSize(36)}
                                        width={Metrix.HorizontalSize(193)}
                                        borderRadius={Metrix.VerticalSize(35)}
                                        fontSize={Metrix.FontSmall}
                                        fontFamily={fonts.InterBold}
                                        onPress={() => {
                                            setModalVisible(false);
                                            setTransferSgPointsModal(true);
                                        }}
                                    />
                                </>
                            )}
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Modal 2 */}
            <Modal visible={transferSgPointsModal} transparent animationType="fade">
                <View style={styles.modalContainer}>
                    <View style={[styles.modalBox, styles.modalGap]}>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setTransferSgPointsModal(!transferSgPointsModal)}
                        >
                            <CrossIcon />
                        </TouchableOpacity>

                        <ModalSuccessLogo checkColor={colors.buttonColor} />
                        <View>
                            <Text style={styles.transferText}>
                                SG Points <Text style={styles.tradeIdHighlight}>2000</Text>
                            </Text>
                            <Text style={styles.modalSmallCenterText}>
                                Transferred to Seller.
                            </Text>
                            <Text style={styles.thanksText}>
                                Thanks you for using <Text>ShareGarden.</Text>
                            </Text>
                        </View>

                        <Text style={styles.tradeIdText}>
                            Trade ID# <Text style={styles.tradeIdHighlight}>SG4321</Text>
                        </Text>

                        <CustomButton
                            title={"Rate & Reviews Seller"}
                            height={Metrix.VerticalSize(36)}
                            width={Metrix.HorizontalSize(261)}
                            borderRadius={Metrix.VerticalSize(35)}
                            fontSize={Metrix.FontSmall}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

