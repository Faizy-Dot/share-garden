import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Metrix } from '../../config';
import BackArrowIcon from '../backArrowIcon/BackArrowIcon';
import { BellIcon } from '../../assets/svg';
import fonts from '../../config/Fonts';
import colors from '../../config/Colors';
import { useSelector } from 'react-redux';

export default function MerchantNavbar({title}) {

const { user } = useSelector((state) => state.login)

    return (
        <View style={styles.container}>
            <BackArrowIcon />
            <View style={styles.row}>
                <Text style={styles.merchantName}>{title ? title : `Hi, ${user.firstName}` }</Text>
                <View style={styles.iconRow}>
                    <BellIcon width={22} height={23} />
                    <Text style={styles.profileImage}>{user?.firstName.charAt(0).toUpperCase()}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: Metrix.HorizontalSize(15),
        marginTop: Metrix.VerticalSize(15),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Metrix.HorizontalSize(10),
    },

    merchantName: {
        fontSize: Metrix.FontLarge,
        fontFamily: fonts.InterRegular
    },
    profileImage: {
        width: Metrix.HorizontalSize(45),
        height: Metrix.HorizontalSize(45),
        backgroundColor: "darkblue",
        borderRadius: Metrix.HorizontalSize(22.5),
        color: colors.white,
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: Metrix.FontLarge,
        fontFamily: fonts.InterBold
    },
});


