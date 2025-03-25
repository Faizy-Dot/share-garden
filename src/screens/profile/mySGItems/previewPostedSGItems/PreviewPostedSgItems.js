import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';
import { styles } from './style';
import BackArrowIcon from '../../../../components/backArrowIcon/BackArrowIcon';
import NavBar from '../../../../components/navBar/NavBar';
import { BlackBitIcon, DownArrowIcon, LikesIcon, NotificationIcon, RightArrowIcon, ShareIcon, TimeIcon, ViewsIcon } from '../../../../assets/svg';
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


    const renderRequestBitData = (item, index) => {
        return (

            <View key={index} style={{ width: "100%", height: Metrix.VerticalSize(108), borderWidth: 1, borderColor: colors.borderColor, borderRadius: Metrix.VerticalSize(3), paddingHorizontal: Metrix.HorizontalSize(8) }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: Metrix.VerticalSize(5) }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: Metrix.HorizontalSize(5), paddingVertical: Metrix.VerticalSize(7) }}>
                        <Image source={Images.homeProfile} style={{ width: Metrix.HorizontalSize(40), height: Metrix.HorizontalSize(40) }} />
                        <View>
                            <Text style={{ fontSize: Metrix.FontSmall, fontFamily: fonts.InterSemiBold }}>Bid by</Text>
                            <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterSemiBold, color: colors.buttonColor }}>{item.name}</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center", gap: Metrix.HorizontalSize(15) }}>
                        <NotificationIcon stroke={colors.buttonColor} width={24} height={24} />
                        <View style={{ flexDirection: "row", alignItems: "center", gap: Metrix.HorizontalSize(8) }}>
                            <BlackBitIcon width={24} height={24} />
                            <Text style={{ fontSize: Metrix.FontMedium, fontFamily: fonts.InterSemiBold }}>{item.amount}</Text>
                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: "row", gap: Metrix.HorizontalSize(10) }}>
                    <CustomButton height={Metrix.VerticalSize(36)} flex={1} borderRadius={Metrix.VerticalSize(4)}
                        title={"DECLINE"}
                        backgroundColor={colors.yellowColor}
                        fontSize={Metrix.FontSmall} />
                    <CustomButton height={Metrix.VerticalSize(36)} flex={1} borderRadius={Metrix.VerticalSize(4)}
                        title={"ACCEPT"}
                        fontSize={Metrix.FontSmall} />
                </View>
            </View>
        )
    }

    console.log("item==>>>", item)
    console.log(viewItemsDetails)
    return (
        <View style={styles.previewPostedSgItemsConatiner}>
            <View style={styles.topContainer}>
                <BackArrowIcon />
                <NavBar title={"My Posted SG Items "}
                    fontSize={Metrix.FontMedium} />
            </View>

            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>

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
                            color='#A39696'
                            width={Metrix.HorizontalSize(144)}
                            height={Metrix.VerticalSize(36)}
                            backgroundColor="#C4C4C4"
                            borderRadius={Metrix.VerticalSize(4)} />
                    </View>

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

                    {/* <FlatList data={requestBuyData}
                    renderItem={renderRequestBitData}
                    contentContainerStyle={{gap:Metrix.VerticalSize(7)}} /> */}
                    {
                        requestBuyData.map((item, index) => {
                            return (
                                renderRequestBitData(item, index)
                            )
                        })
                    }


                </View>
            </KeyboardAwareScrollView>

        </View>
    );
}
