import React from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import styles from './styles';
import { Images, Metrix } from '../../../../config';
import CustomButton from '../../../../components/Button/Button';
import BackArrowIcon from '../../../../components/backArrowIcon/BackArrowIcon';

export default function ResetPassword({ navigation }) {
  return (
    <View style={styles.resetPasswordContainer}>
      <View style={{ marginTop: Metrix.VerticalSize(30) }}>
        <BackArrowIcon />
      </View>
      <View style={{ alignItems: "center" }}>
        <Image source={Images.logo} style={styles.logo} />

        <View style={{marginTop: Metrix.VerticalSize(50),width:"100%"}}>
          <Text style={styles.description}>
            Please enter and confirm your new password to reset it.
          </Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry={true}
            />

            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry={true}
            />
          </View>
        </View>

      </View>
      <CustomButton
        title={"Save"}
        width={"100%"}
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}
