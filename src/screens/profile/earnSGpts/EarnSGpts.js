import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import colors from '../../../config/Colors';
import BackArrowIcon from '../../../components/backArrowIcon/BackArrowIcon';
import { Images, Metrix } from '../../../config';
import fonts from '../../../config/Fonts';


const earnSGptsData = [
    {
        id: 1,
        title: "Tell a friend",
        description: "orders, billing and invoice"
    },
    {
        id: 2,
        title: "Write a Reviews",
        description: "how it works to earn points"
    },
    {
        id: 3,
        title: "Write a SG Tips",
        description: "how it works to earn points"
    },
]

export default function EarnSGpts() {

    const renderEarnSGptsData = ({ item }) => {
        return(

        <View style={styles.flatListConatiner}>
            <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
            <View>
                <Image source={Images.rightArrowIcon} />
            </View>
        </View>
        )
    }

    return (
        <View style={styles.EarnSGpts}>
            <View style={styles.topContainer}>
                <BackArrowIcon />
                <Text style={styles.heading}>How to earns SG points</Text>
            </View>

            <View style={styles.headingContainer}>
                <Text style={styles.title}>Welcome rewards</Text>
                <Text style={styles.description}>We offer Up to 100 Pts for every new users.</Text>
            </View>

            <FlatList data={earnSGptsData}
            renderItem={renderEarnSGptsData}
            keyExtractor={(item)=> item.id}/>

        </View>
    );
}


const styles = StyleSheet.create({
    EarnSGpts: {
        flex: 1,
        backgroundColor: colors.white
    },
    topContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: Metrix.HorizontalSize(35),
        gap: Metrix.HorizontalSize(20),
        marginTop: Metrix.VerticalSize(25)
    },
    heading: {
        fontSize: Metrix.normalize(20),
        fontFamily: fonts.InterBold
    },
    title: {
        fontSize: Metrix.FontMedium,
        fontFamily: fonts.InterBold,
        color: colors.buttonColor
    },
    description: {
        fontSize: Metrix.FontSmall,
        fontFamily: fonts.InterRegular
    },
    headingContainer: {
        marginTop: Metrix.VerticalSize(40),
        paddingLeft: Metrix.HorizontalSize(20),
        gap: Metrix.VerticalSize(7),
        borderBottomWidth: 1,
        borderColor: colors.borderColor,
        paddingBottom: Metrix.VerticalSize(20),
        marginHorizontal: Metrix.HorizontalSize(15)
    },
    flatListConatiner:{
        flexDirection : "row",
        paddingHorizontal: Metrix.HorizontalSize(20),
        borderBottomWidth: 1,
        borderColor: colors.borderColor,
        paddingVertical: Metrix.VerticalSize(20),
        marginHorizontal: Metrix.HorizontalSize(15),
        alignItems : "center",
        justifyContent : "space-between"
    }
})