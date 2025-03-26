import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, FlatList, Modal } from 'react-native';
import { styles } from './style';
import BackArrowIcon from '../../../../components/backArrowIcon/BackArrowIcon';
import NavBar from '../../../../components/navBar/NavBar';
import { BlackBitIcon, CrossIcon, DownArrowIcon, LikesIcon, ModalInfoIcon, NotificationIcon, RightArrowIcon, ShareIcon, TimeIcon, ViewsIcon } from '../../../../assets/svg';
import { Colors, Images, Metrix } from '../../../../config';
import fonts from '../../../../config/Fonts';
import colors from '../../../../config/Colors';
import CustomButton from '../../../../components/Button/Button';
import CustomInput from '../../../../components/customInput/CustomInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const requestBuyData = [
    {
        name: "Terry Lance",
        amount: 2000
    },
    {
        name: "Pushpa jhukega nh sala",
        amount: 1800
    },
    {
        name: "Ghajni",
        amount: 1600
    },
]

export default function PreviewPostedSgItems({ navigation, route }) {

    const { item } = route.params

    const [viewItemsDetails, setViewItemsDetails] = useState(false)
    const [viewBidsDetails, setViewBidsDetails] = useState(false)
    const [days, setDays] = useState('');
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');
    const [seconds, setSeconds] = useState('');
    const [acceptState, setAcceptState] = useState({})
    const [declineState, setDeclineState] = useState({});
    const [tradeId, setTradeId] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)

    console.log("accept state==>", acceptState)

    const handleDeclinePress = useCallback((idx) => {
        setDeclineState((prevState) => ({
            ...prevState,
            [idx]: true,
        }));
    }, []);

    const handleAcceptPress = useCallback((idx) => {
        setAcceptState((prevState) => ({
            ...prevState,
            [idx]: true,
        }));
    }, []);

    const renderRequestBitData = (item, index) => {
        return (
            <View key={index} style={[styles.container, acceptState[index] && styles.containerAccepted]}>
                <View style={styles.header}>
                    <View style={styles.userInfo}>
                        <Image source={Images.homeProfile} style={styles.profileImage} />
                        <View>
                            <Text style={styles.bidText}>Bid by</Text>
                            <Text style={styles.bidName}>{item.name}</Text>
                        </View>
                    </View>
    
                    <View style={styles.notificationContainer}>
                        <NotificationIcon stroke={colors.buttonColor} width={24} height={24} />
                        <View style={styles.bidAmountContainer}>
                            <BlackBitIcon width={24} height={24} />
                            <Text style={styles.bidAmount}>{item.amount}</Text>
                        </View>
                    </View>
                </View>
    
                <View style={[styles.actionContainer, acceptState[index] && styles.actionContainerAccepted]}>
                    {declineState[index] ? (
                        <CustomButton
                            height={Metrix.VerticalSize(36)}
                            flex={1}
                            borderRadius={Metrix.VerticalSize(4)}
                            title={"DECLINED"}
                            backgroundColor={colors.redColor}
                            fontSize={Metrix.FontSmall}
                        />
                    ) : (
                        <>
                            {acceptState[index] ? (
                                <View style={styles.statusContainer}>
                                    <Text style={styles.bidStatus}>
                                        Bid Status: <Text style={styles.statusAccepted}>Accepted</Text>
                                    </Text>
                                    <CustomButton
                                        title={"COPY TRADE ID"}
                                        fontSize={Metrix.FontSmall}
                                        fontFamily={fonts.InterBold}
                                        color={tradeId ? colors.white : '#A39696'}
                                        width={Metrix.HorizontalSize(144)}
                                        height={Metrix.VerticalSize(36)}
                                        backgroundColor={!tradeId ? "#C4C4C4" : colors.yellowColor}
                                        borderRadius={Metrix.VerticalSize(4)}
                                    />
                                </View>
                            ) : (
                                <>
                                    <CustomButton
                                        height={Metrix.VerticalSize(36)}
                                        flex={1}
                                        borderRadius={Metrix.VerticalSize(4)}
                                        title={"DECLINE"}
                                        backgroundColor={colors.yellowColor}
                                        fontSize={Metrix.FontSmall}
                                        onPress={() => handleDeclinePress(index)}
                                    />
                                    <CustomButton
                                        height={Metrix.VerticalSize(36)}
                                        flex={1}
                                        borderRadius={Metrix.VerticalSize(4)}
                                        title={"ACCEPT"}
                                        fontSize={Metrix.FontSmall}
                                        onPress={() => {
                                            handleAcceptPress(index);
                                            setTimeout(() => {
                                                setTradeId(true);
                                            }, 3000);
                                        }}
                                    />
                                </>
                            )}
                        </>
                    )}
                </View>
    
                {acceptState[index] && (
                    <View style={styles.infoContainer}>
                        <ModalInfoIcon width={24} height={24} outerStroke={colors.redColor} />
                        <Text style={styles.awaitingText}>Awaiting for the buyer to share trade id with you.</Text>
                    </View>
                )}
            </View>
        );
    };

    console.log("item==>>>", item)

    return (
        <View style={styles.previewPostedSgItemsConatiner}>
            <View style={styles.topContainer}>
                <BackArrowIcon />
                <NavBar title={"My Posted SG Items "}
                    fontSize={Metrix.FontMedium} />
            </View>

            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled">

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: Metrix.VerticalSize(20) }}>
                    <Text style={{ fontSize: Metrix.FontRegular, fontFamily: fonts.InterBold }}>{item.title}</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: Metrix.HorizontalSize(5) }}>
                        <BlackBitIcon width={16} height={16} />
                        <Text style={{ fontSize: Metrix.FontMedium, fontFamily: fonts.InterSemiBold, color: colors.buttonColor }}>{item.minBid}</Text>
                    </View>
                </View>

                <View style={styles.middleToBottomContainer}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: Metrix.HorizontalSize(8) }}>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: Metrix.HorizontalSize(5) }}>
                                <ViewsIcon width={16} height={10} />
                                <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterBold }}>{item.views || 0}</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: Metrix.HorizontalSize(5) }}>
                                <LikesIcon width={14} height={12} />
                                <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterBold }}>{item.likes || 0}</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: Metrix.HorizontalSize(5) }}>
                                <ShareIcon width={14} height={17} />
                                <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterBold }}>{item.shares || 0}</Text>
                            </View>
                        </View>

                        <CustomButton title={"MARK AS SOLD"}
                            fontSize={Metrix.FontSmall}
                            fontFamily={fonts.InterBold}
                            color={tradeId ? colors.white : '#A39696'}
                            width={Metrix.HorizontalSize(144)}
                            height={Metrix.VerticalSize(36)}
                            backgroundColor={!tradeId ? "#C4C4C4" : colors.buttonColor}
                            borderRadius={Metrix.VerticalSize(4)}
                            disabled={tradeId ? false : true}
                            onPress={() => setModalVisible(true)} />

                    </View>

                    {
                        Object.values(acceptState).some(value => value) && (
                            <View style={{ flexDirection: "row", alignItems: "center", gap: Metrix.HorizontalSize(5), flex: 1 }}>
                                <ModalInfoIcon outerStroke={colors.redColor} height={24} width={24} />
                                <Text style={{ fontSize: Metrix.normalize(10), fontFamily: fonts.InterSemiBold, color: "#646464", flex: 1 }}>
                                    To claim SG Points you need to “
                                    <Text style={{ fontFamily: fonts.InterBold, color: colors.buttonColor }}>
                                        Mark As Sold
                                    </Text>” using the SG Id sent by buyer.
                                </Text>
                            </View>
                        )
                    }

                    <View style={[!viewItemsDetails ? { height: Metrix.VerticalSize(48), backgroundColor: colors.buttonColor } : {
                        backgroundColor: colors.white, borderColor: colors.borderColor, borderWidth: 1, paddingTop: Metrix.VerticalSize(10)
                    }, {
                        borderRadius: Metrix.VerticalSize(3), justifyContent: "center",
                        width: "100%",
                    }]}>
                        <View style={[{ flexDirection: "row", alignItems: "center", gap: Metrix.HorizontalSize(20) }]}>

                            <TouchableOpacity style={{ paddingLeft: Metrix.HorizontalSize(20), }} activeOpacity={0.8} onPress={() => setViewItemsDetails(!viewItemsDetails)}>
                                {
                                    viewItemsDetails ? <DownArrowIcon stroke={colors.buttonColor} /> : <RightArrowIcon stroke={colors.white} />
                                }

                            </TouchableOpacity>
                            <Text style={[{ fontSize: Metrix.FontRegular, fontFamily: fonts.InterSemiBold, color: colors.white }, viewItemsDetails && { color: colors.black }]}>View item details</Text>
                        </View>

                        {
                            viewItemsDetails && <View style={{ paddingVertical: Metrix.VerticalSize(20), gap: Metrix.VerticalSize(10) }}>
                                <Image
                                    source={item.images ? { uri: item.images.split(',')[0] } : Images.homePopularListing}
                                    style={{ width: "100%", height: Metrix.VerticalSize(177) }}
                                />
                                <Text style={{ paddingLeft: Metrix.HorizontalSize(15), fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterRegular }}>{item.description}</Text>
                            </View>
                        }

                    </View>

                    <View style={[!viewBidsDetails ? { height: Metrix.VerticalSize(48), backgroundColor: colors.buttonColor } : {
                        backgroundColor: colors.white, borderColor: colors.borderColor, borderWidth: 1, paddingTop: Metrix.VerticalSize(10)
                    }, {
                        borderRadius: Metrix.VerticalSize(3), justifyContent: "center",
                        width: "100%",
                    }]}>
                        <View style={[{ flexDirection: "row", alignItems: "center", gap: Metrix.HorizontalSize(20) }]}>

                            <TouchableOpacity style={{ paddingLeft: Metrix.HorizontalSize(20), }} activeOpacity={0.8} onPress={() => setViewBidsDetails(!viewBidsDetails)}>
                                {
                                    viewBidsDetails ? <DownArrowIcon stroke={colors.buttonColor} /> : <RightArrowIcon stroke={colors.white} />
                                }

                            </TouchableOpacity>
                            <Text style={[{ fontSize: Metrix.FontRegular, fontFamily: fonts.InterSemiBold, color: colors.white }, viewBidsDetails && { color: colors.black }]}>Bidding Details</Text>
                        </View>

                        {
                            viewBidsDetails && <View style={{ paddingVertical: Metrix.VerticalSize(10), gap: Metrix.VerticalSize(10), marginTop: Metrix.VerticalSize(10) }}>
                                <View style={{ height: Metrix.VerticalSize(48), width: "100%", backgroundColor: "#DADADA", flexDirection: "row", justifyContent: "space-around", alignItems: "center", borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.borderColor }}>
                                    <Text style={{ fontSize: Metrix.normalize(13), fontFamily: fonts.InterBold, color: colors.buttonColor }}>Total Bid: <Text style={{ color: colors.black }}>04</Text></Text>
                                    <Text style={{ fontSize: Metrix.normalize(13), fontFamily: fonts.InterBold, color: colors.buttonColor }}>Highest Bid: <Text style={{ color: colors.black }}>2000</Text></Text>
                                    <Text style={{ fontSize: Metrix.normalize(13), fontFamily: fonts.InterBold, color: colors.buttonColor }}>Status: <Text style={{ color: colors.black }}>Active</Text></Text>
                                </View>

                                <View style={[styles.sameMiddleBox, { flexDirection: "row", gap: Metrix.HorizontalSize(29) }]}>
                                    <View style={{ flexDirection: "row", alignItems: "center", gap: Metrix.HorizontalSize(15) }}>
                                        <TimeIcon width={12} height={12} stroke="#5A5A5A" />
                                        <Text style={styles.bidEndsText}>Bid Ends</Text>
                                    </View>

                                    <View style={styles.timerRow}>
                                        {[
                                            { label: "Days", value: days, setter: setDays, field: 'days' },
                                            { label: "Hours", value: hours, setter: setHours, field: 'hours' },
                                            { label: "Minutes", value: minutes, setter: setMinutes, field: 'minutes' },
                                            { label: "Seconds", value: seconds, setter: setSeconds, field: 'seconds' },
                                        ].map((item, index) => (
                                            <View key={index} style={styles.inputContainer}>
                                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                    <TextInput
                                                        style={[
                                                            styles.input,

                                                        ]}
                                                        keyboardType="numeric"
                                                        placeholder="00"
                                                        placeholderTextColor="#000"
                                                        editable={false}
                                                        selectTextOnFocus={false}
                                                        maxLength={2}
                                                    />
                                                    {index < 3 && <Text style={styles.separator}>:</Text>}
                                                </View>
                                                <Text style={styles.label}>{item.label}</Text>

                                            </View>
                                        ))}
                                    </View>

                                </View>

                            </View>
                        }

                    </View>


                    {/* <FlatList
                    data={requestBuyData}
                    renderItem={renderRequestBitData}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ gap: Metrix.VerticalSize(7) }}
                /> */}
                    {
                        requestBuyData.map((item, index) => {
                            return (
                                renderRequestBitData(item, index)
                            )
                        })
                    }


                </View>
            </KeyboardAwareScrollView>

            <Modal visible={modalVisible} transparent animationType="fade">
                <View style={styles.modalContainer}>
                    <View style={styles.modalBox}>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <CrossIcon />
                        </TouchableOpacity>

                        <View style={{marginTop : Metrix.VerticalSize(20) ,gap:Metrix.VerticalSize(30),alignItems :"center"}}>
                            <Text style={{ fontSize: Metrix.FontRegular, fontFamily: fonts.InterSemiBold }}>Kindly enter SG ID, to mark as sold.</Text>
                            <View style={{alignItems :"center" ,gap:Metrix.VerticalSize(20)}}>
                                <View style={{ flexDirection: "row", alignItems: "center", gap: Metrix.HorizontalSize(10) }}>
                                    <Text style={{ fontSize: Metrix.FontRegular, fontFamily: fonts.InterSemiBold }}>SG ID:</Text>
                                    <TextInput style={styles.modalInput} />
                                </View>
                                <CustomButton title={"SUBMIT"}
                                    width={Metrix.HorizontalSize(144)}
                                    height={Metrix.VerticalSize(36)}
                                    borderRadius={Metrix.VerticalSize(35)}
                                    fontSize={Metrix.FontSmall}
                                     />
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: Metrix.HorizontalSize(10),paddingHorizontal :Metrix.HorizontalSize(40) }}>
                                <ModalInfoIcon outerStroke={colors.redColor} width={24} height={24}/>
                                <Text style={{ fontSize: Metrix.normalize(11), fontFamily: fonts.InterRegular,color :"#646464" }}>Go back to your trade screen and copy trade Id to submit here</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    );
}
