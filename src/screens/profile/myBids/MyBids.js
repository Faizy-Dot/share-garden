import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import styles from './style';
import BackArrowIcon from '../../../components/backArrowIcon/BackArrowIcon';
import NavBar from '../../../components/navBar/NavBar';
import { Images, Metrix } from '../../../config';
import fonts from '../../../config/Fonts';
import colors from '../../../config/Colors';
import { BidTitleIcon, NotificationIcon, SgBidIcon } from '../../../assets/svg';
import { useNavigation } from '@react-navigation/native';

const myBidsData = [
    {
        id: 1,
        title: "7 Setter Sofa Set, By Terry",
        description: "Congratulations ! Your 2000 Bid has been accepted ",

    },
    {
        id: 2,
        title: "Gaming Chair, By Julien",
        description: "Congratulations ! Your 2000 Bid has been accepted ",

    },
    {
        id: 3,
        title: "Gaming Chair, By Sofiya",
        description: "Congratulations ! Your 2000 Bid has been accepted ",

    },
    {
        id: 4,
        title: "I Phone Charger By Ken",
        description: "Congratulations ! Your 2000 Bid has been accepted ",

    },
    {
        id: 5,
        title: "Kids Scotty By Jerry",
        description: "Your 1800 Bid has been declined. ",
        declined: true

    },
    {
        id: 6,
        title: "Computer Desk",
        description: "Congratulations ! Your 2000 Bid has been accepted ",

    },
    {
        id: 7,
        title: "Crockery",
        description: "Your 300 Bid has been declined. ",
        declined: true

    },
]


export default function MyBids() {
const navigation = useNavigation()

    const renderMyBids = ({ item }) => {
        return (
            <TouchableOpacity activeOpacity={0.7} style={styles.renderMyBidsContainer} onPress={()=> navigation.navigate("BidsReview")}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: Metrix.HorizontalSize(20) }}>
                    {
                        item.declined ?
                            <SgBidIcon stroke={colors.redColor} />
                            :
                            <SgBidIcon />
                    }
                    <View style={{ width: Metrix.HorizontalSize(220) }}>
                        <View>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: Metrix.HorizontalSize(5) }}>
                                <Text style={styles.title}>{item.title}</Text>
                                <BidTitleIcon />
                            </View>
                        </View>
                        <Text style={[styles.description, item.declined && { color: colors.redColor }]}>{item.description}</Text>
                        {
                            item.declined &&
                            <Text style={[styles.description, { fontFamily: fonts.InterBold }]}>You can place your bid again</Text>
                        }
                    </View>
                </View>
                <NotificationIcon />
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.myBidsContainer}>
            <View style={styles.topContainer}>
                <BackArrowIcon />
                <NavBar title={"My Bids"} />
            </View>

            <FlatList data={myBidsData}
                renderItem={renderMyBids}
                keyExtractor={(item) => item.id} />

        </View>
    );
}
