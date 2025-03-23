import React, { useState } from 'react';
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
                <View style={styles.buttonWrapper}>
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
                </View>

                <View style={styles.confirmWrapper}>
                    <CustomButton
                        title={"Confirm Buy"}
                        width={Metrix.HorizontalSize(202)}
                        height={Metrix.VerticalSize(44)}
                        borderRadius={Metrix.VerticalSize(25)}
                        fontSize={Metrix.FontLarge}
                        fontFamily={fonts.InterBold}
                        backgroundColor="#D2D2D2"
                        color='#AFAFAF'
                        disabled={true}
                    />
                    <View style={styles.confirmInfoWrapper}>
                        <ModalInfoIcon IstrokeColor={colors.buttonColor} outerStroke={colors.buttonColor} />
                        <Text style={styles.confirmInfoText}>
                            You need to confirm buy to transfer points & then pick up your item.
                        </Text>
                    </View>
                </View>
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
                        <View style={{ marginTop: Metrix.VerticalSize(25), alignItems: "center", gap: Metrix.VerticalSize(10) }}>
                            <BlackBitIcon width={64} height={64} />
                            <Text style={{ fontSize: Metrix.FontSmall, fontFamily: fonts.InterRegular }}>Upon Clicking Proceed</Text>
                            <View>
                                <Text style={{ fontSize: Metrix.FontRegular, fontFamily: fonts.InterSemiBold , textAlign :"center" }}> Your 2000 SG Points </Text>
                                <Text style={{ fontSize: Metrix.FontSmall, fontFamily: fonts.InterSemiBold,textAlign :"center" }}>will be placed on hold, Until you confirm buy</Text>
                            </View>

                            <Text style={{ fontSize: Metrix.FontMedium, fontFamily: fonts.InterBold }}>Trade ID# <Text style={{ color: colors.buttonColor }}>SG4321</Text></Text>
                            <CustomButton title={"PROCEED"}
                                backgroundColor={colors.yellowColor}
                                height={Metrix.VerticalSize(36)}
                                width={Metrix.HorizontalSize(193)}
                                borderRadius={Metrix.VerticalSize(35)}
                                fontSize={Metrix.FontSmall}
                                fontFamily={fonts.InterBold} />
                        </View>

                    </View>
                </View>
            </Modal>
        </View>
    );
}

