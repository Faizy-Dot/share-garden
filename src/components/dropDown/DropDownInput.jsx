import React, { useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Images, Metrix } from '../../config';
import colors from '../../config/Colors';
import fonts from '../../config/Fonts';
import { DropDownGreenArrow } from '../../assets/svg';

const DropdownComponent = ({ data, value, onChange, paddingHorizontal = Metrix.HorizontalSize(20), placeholder, listText, height = Metrix.VerticalSize(58), width = "100%", fontSize, fontFamily }) => {
    const renderItem = item => {
        return (
            <View style={styles.item}>
                <Text style={[styles.textItem, { fontSize: listText, fontFamily: fonts.InterRegular }]}>{item.label}</Text>
            </View>
        );
    };

    return (
        <Dropdown
            style={[styles.dropdown, { height: height, width: width, paddingHorizontal: paddingHorizontal }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={[styles.selectedTextStyle, { fontSize, fontFamily }]}
            inputSearchStyle={styles.inputSearchStyle}
            data={data || []}
            // search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={placeholder}
            searchPlaceholder="Search..."
            value={value}
            onChange={onChange}
            renderItem={renderItem}
            renderRightIcon={() => (
                <View>

                    <DropDownGreenArrow />
                </View>
            )}
        />
    );
};

export default DropdownComponent;

const styles = StyleSheet.create({
    dropdown: {
        width: "100%",
        height: Metrix.VerticalSize(58),
        borderWidth: 1,
        paddingHorizontal: Metrix.HorizontalSize(20),
        borderRadius: Metrix.VerticalSize(4),
        borderColor: colors.borderColor,
        fontFamily: fonts.InterRegular,
    },
    // icon: {
    //     width: Metrix.HorizontalSize(11),
    //     height: Metrix.HorizontalSize(8)
    // },
    item: {
        padding: 5,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: colors.borderColor
    },
    placeholderStyle: {
        color: colors.black,
        fontSize: Metrix.FontExtraSmall,
        fontFamily: fonts.InterRegular,
    },
    selectedTextStyle: {
        fontSize: Metrix.FontExtraSmall,
        color: colors.black,
        fontFamily: fonts.InterRegular,
    },
});