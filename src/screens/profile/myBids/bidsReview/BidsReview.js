import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import styles from './style';
import BackArrowIcon from '../../../../components/backArrowIcon/BackArrowIcon';
import NavBar from '../../../../components/navBar/NavBar';
import { Images, Metrix } from '../../../../config';
import { BlackBitIcon, CrossIcon, ModalInfoIcon, ModalSuccessLogo, NotificationIcon } from '../../../../assets/svg';
import fonts from '../../../../config/Fonts';
import colors from '../../../../config/Colors';
import CustomButton from '../../../../components/Button/Button';

export default function BidsReview() {

    const [modalVisible, setModalVisible] = useState(false)
    const [tradeProceed, setTradeProceed] = useState(false)
    const [buyProceed, setBuyProceed] = useState(false)
    const [transferSgPointsModal, setTransferSgPointsModal] = useState(false)

    console.log("buyProceed>>>", buyProceed)

    const resetStates = useCallback(() => {
        setBuyProceed(false);
    }, []);

    useEffect(() => {
        resetStates(); // Call the function once when the component mounts
    }, [resetStates]);

    return (
        <View style={styles.BidsReviewContainer}>
            <View style={styles.topContainer}>
                <BackArrowIcon />
                <NavBar title={"My Bids"} />
            </View>

            <View style={styles.bidHeader}>
                <View style={styles.bidHeaderLeft}>
                    <Image source={Images.homeProfile} style={styles.profileImage} />
                    <View>
                        <Text style={styles.titleText}>7 Seater Sofa </Text>
                        <Text style={styles.subtitleText}>By Trey Lance</Text>
                        <Text style={styles.publishDateText}>Published on 24 April 2024</Text>
                    </View>
                </View>

                <View style={styles.bidHeaderRight}>
                    <BlackBitIcon width={28} height={28} />
                    <Text style={styles.bitValue}>200</Text>
                </View>
            </View>

            <View style={styles.chatContainer}>
                <NotificationIcon />
                <Text style={styles.chatText}>
                    Chat With <Text style={styles.redText}>Terry Lance</Text>
                </Text>
            </View>

            <View style={styles.bidInfo}>
                <Text style={styles.myBidText}>
                    My Bid: <Text style={styles.myBidAcceptedText}>2000</Text>
                </Text>
                <View style={styles.statusContainer}>
                    <Text style={styles.myBidAcceptedText}>Accepted</Text>
                    <ModalSuccessLogo width={39} height={39} checkColor={colors.buttonColor} />
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
                                />
                                <View style={styles.infoWrapper}>
                                    <ModalInfoIcon IstrokeColor={colors.black} />
                                    <Text style={styles.infoText}>
                                        The points you bid, will be placed on hold.
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

