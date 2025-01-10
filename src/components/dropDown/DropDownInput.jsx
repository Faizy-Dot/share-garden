import React, { useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Images, Metrix } from '../../config';
import colors from '../../config/Colors';
import fonts from '../../config/Fonts';

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
];

const DropdownComponent = ({placeholder}) => {
    const [value, setValue] = useState(null);

    const renderItem = item => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
            </View>
        );
    };

    return (
        <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={placeholder}
            searchPlaceholder="Search..."
            value={value}
            onChange={item => {
                setValue(item.value);
            }}
            renderItem={renderItem}
            renderRightIcon={() => (
                <Image
                    source={Images.dropDownIcon} // Replace with your image path
                    style={styles.icon}
                />
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
        borderRadius: Metrix.LightRadius,
        borderColor: colors.borderColor,
        fontFamily: fonts.InterRegular,
    },
    // icon: {
    //     width: Metrix.HorizontalSize(11),
    //     height: Metrix.HorizontalSize(8)
    // },
      item: {
        padding: 5,
        paddingHorizontal : 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth : 1,
        borderColor : colors.borderColor
      },
  
    placeholderStyle: {
        fontFamily: fonts.InterRegular,
    },
    selectedTextStyle: {
        fontSize: Metrix.FontSmall
    },
 
});