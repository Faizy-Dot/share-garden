import React, {Component} from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Images, Metrix } from "../../config";
import CustomButton from "../../components/Button/Button";
import colors from "../../config/Colors";
import DescriptionLogo from "../../assets/svg/DescriptionLogo";
import Bitt from "../../assets/svg/bitt.svg"

export default function GetStartedScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Bitt/>
      <DescriptionLogo/>
     
      
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          title="GET  STARTED"
          onPress={() => navigation.navigate('Login')}
          height={Metrix.VerticalSize(68)}
        />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Metrix.VerticalSize(100),
  },
  logo: {
    width: Metrix.HorizontalSize(312),
    height : Metrix.VerticalSize(140)
  },

  buttonContainer: {
    marginBottom: Metrix.VerticalSize(40),
  },

});
