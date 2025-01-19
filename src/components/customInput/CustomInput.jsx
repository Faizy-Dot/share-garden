

import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native';
import { Fonts, Images, Metrix } from '../../config';

export default function CustomInput({
    justifyContent,
    iconCondition , 
    placeholder,
}) {
  const onEnterPress = ()=>{
    Alert.alert("Enter Pressed!", "You submitted the input.");
  }
  return (
    <View style={[styles.inputContainer, {justifyContent} ,]}>
    <Image source={Images.homeSearch} style={[styles.searchIcon , !iconCondition && {left : Metrix.HorizontalSize(15)}]} />
    <TextInput style={[styles.input, !iconCondition && {width : "100%" , paddingLeft : Metrix.HorizontalSize(60)}]} placeholder={placeholder} placeholderTextColor="#999" 
     returnKeyType="done" // Changes the Enter key label to "Done"
     onSubmitEditing={onEnterPress}/>
   {
    iconCondition &&
    <Image source={Images.homeFilter} style={styles.filterLogo} />
   }
</View>
  );
}


const styles = StyleSheet.create({
      inputContainer: {
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
        },
          searchIcon: {
                width: Metrix.HorizontalSize(25),
                height: Metrix.VerticalSize(27),
                position: "absolute",
                left: Metrix.HorizontalSize(23),
                zIndex: 1
            },
              input: {
                    width: Metrix.HorizontalSize(300),
                    height: Metrix.VerticalSize(60),
                    backgroundColor: "#F3F3F3",
                    borderColor: "#E6E6E6",
                    borderWidth: 1,
                    borderRadius: Metrix.LightRadius,
                    paddingLeft: Metrix.HorizontalSize(45),
                    fontSize: Metrix.FontRegular,
                    fontFamily: Fonts.InterSemiBold
                },
                filterLogo: {
                    width: Metrix.HorizontalSize(20),
                    height: Metrix.VerticalSize(15)
                },
})