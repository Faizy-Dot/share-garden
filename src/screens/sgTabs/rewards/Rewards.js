import { FlatList, Image, Text, View } from "react-native";
import BackArrowIcon from "../../../components/backArrowIcon/BackArrowIcon";
import NavBar from "../../../components/navBar/NavBar";
import styles from "./styles";
import colors from "../../../config/Colors";
import { useEffect, useState } from "react";
import { Images, Metrix } from "../../../config";
import fonts from "../../../config/Fonts";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { BlackBitIcon, PointsEarnIcon, StarIcon } from "../../../assets/svg";

export default function RewardsTabScreen({ navigation }) {

    const { user } = useSelector((state) => state.login)
    const [buttons, setButtons] = useState({
        sgPoints: true,
        sgCoupons: false
    })


    const buttonOptions = [
        { key: 'sgPoints', label: 'SG Points', color: colors.buttonColor },
        { key: 'sgCoupons', label: 'SG Coupons', color: colors.yellowColor },
    ];

    const results = [
        { title: "Offic Chair", itemId: 20243, bit: 300, id: 1 },
        { title: "Offic Chair", itemId: 20243, bit: 1800, id: 2 },
        { title: "Offic Chair", itemId: 20243, bit: 750, id: 3 },
        { title: "Offic Chair", itemId: 20243, bit: 2250, id: 4 },
        { title: "Offic Chair", itemId: 20243, bit: 1230, id: 5 },
        { title: "Offic Chair", itemId: 20243, bit: 250, id: 6 },
        { title: "Offic Chair", itemId: 20243, bit: 97, id: 7 },
    ]

    const renderResults = ({ item }) => {
        return (
            <View style={styles.resultsContainer}>
                <View>
                    <Text style={styles.titleText}>{item.title}</Text>
                    <Text style={styles.itemsIdText}>itemID #{item.itemId}</Text>
                </View>
                <View style={styles.bitContainer}>
                    <BlackBitIcon width={16}
                        height={16} />
                    <Text style={[styles.bitText, item.bit > 1000 ? { color: colors.redColor } : { color: colors.buttonColor }]}>{item.bit}</Text>
                </View>
            </View>
        )
    }


    useEffect(() => {
        if (!user) {
            navigation.navigate("Login")
            Toast.show({
                type: 'error',
                text1: 'Login or Signup',
                text2: 'First Login plz',
            });
        }
    }, [user, navigation]);

    if (!user) {
        return null;
    }

    return (
        <View style={styles.rewardsContainer}>

            <View style={styles.topContainer}>
                <View style={{ paddingHorizontal: Metrix.HorizontalSize(13) }}>
                    <BackArrowIcon />
                </View>

                <View style={{ paddingHorizontal: Metrix.HorizontalSize(13) }}>
                    <NavBar title={"SG Rewards"} />
                </View>

                <View style={styles.buttonsContainer}>
                    {buttonOptions.map(({ key, label, color }) => (
                        <Text
                            key={key}
                            onPress={() => setButtons({ sgPoints: key === 'sgPoints', sgCoupons: key === 'sgCoupons' })}
                            style={[
                                styles.button,
                                { borderBottomColor: color, color: buttons[key] ? 'black' : '#D3D3D3' },
                            ]}
                        >
                            {label}
                        </Text>
                    ))}
                </View>

            </View>

            <View style={styles.middleContainer}>

                <Image source={user.profileImage ? { uri: user.profileImage } : Images.homeProfile} style={styles.profile} />
                <Text style={styles.sameText2}>{user.firstName} {user.lastName}</Text>

                <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                    <StarIcon fillColor={colors.buttonColor} strokeColor={colors.buttonColor} />
                    <StarIcon fillColor={colors.buttonColor} strokeColor={colors.buttonColor} />
                    <StarIcon fillColor={colors.buttonColor} strokeColor={colors.buttonColor} />
                    <StarIcon fillColor={colors.buttonColor} strokeColor={colors.buttonColor} />
                    <StarIcon />
                    <Text style={styles.ratingText}>4.5</Text>
                </View>

                <View style={{ gap: 3, alignItems: "center" }}>
                    <Text style={styles.sameText1}>Your SG Balance is</Text>
                    <Text style={styles.sameText2}>{user.sgPoints}</Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <PointsEarnIcon />
                    <Text style={[styles.sameText1, { marginLeft: Metrix.HorizontalSize(10) }]}>Points earned<Text style={{ fontFamily: fonts.InterBold }}> +300</Text> from last sales</Text>
                </View>

            </View>

            <View style={styles.bottomContainer}>
                <FlatList data={results}
                    renderItem={renderResults}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                />
            </View>

        </View>
    )
}