import React, { useRef } from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import styles from './styles';
import { Images, Metrix } from '../../../../config';
import CustomButton from '../../../../components/Button/Button';
import BackArrowIcon from '../../../../components/backArrowIcon/BackArrowIcon';

export default function OneTimePassword({ navigation }) {
  // Refs for managing focus between inputs
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const handleInputChange = (text, index) => {
    if (text.length === 1 && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  return (
    <View style={styles.OneTimePassword}>
      <View style={{ marginTop: Metrix.VerticalSize(30) }}>
        <BackArrowIcon />
      </View>
      <View style={{ alignItems: "center" }}>
        <Image source={Images.logo} style={styles.logo} />
        <View style={{marginTop : Metrix.VerticalSize(50) ,width : "100%"}}>
          <Text style={styles.description}>
            Enter the 4-digit code sent to your email address.
          </Text>

          <View style={styles.otpInputsContainer}>
            {Array(4)
              .fill()
              .map((_, index) => (
                <TextInput
                  key={index}
                  ref={inputRefs[index]}
                  style={styles.otpInput}
                  keyboardType="numeric"
                  maxLength={1}
                  onChangeText={(text) => handleInputChange(text, index)}
                />
              ))}
          </View>

          {/* Verify Button */}
          <CustomButton
            title={"Verify"}
            width={"100%"}
            onPress={() => navigation.navigate('ResetPassword')}
          />
        </View>
      </View>
    </View>
  );
}
