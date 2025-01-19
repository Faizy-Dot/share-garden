import React from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import styles from './styles';
import { Images, Metrix } from '../../../../config';
import CustomButton from '../../../../components/Button/Button';
import BackArrowIcon from '../../../../components/backArrowIcon/BackArrowIcon';

export default function ForgotPassword({ navigation }) {
    return (
        <View style={styles.forgotPasswordContainer}>
            <View style={{ marginTop: Metrix.VerticalSize(30) }}>
                <BackArrowIcon />
            </View>
            <View style={{ alignItems: "center" }}>
                <Image source={Images.logo} style={styles.logo} />
                <View style={styles.emailContainer}>
                    <View>
                        <Text style={styles.description}>
                            Please enter your email address to receive a OTP by Email.
                        </Text>
                        <TextInput style={styles.input} placeholder='Email'
                            keyboardType="email-address" />
                    </View>
                    <CustomButton title={"Submit"}
                        width={"100%"}
                        onPress={() => navigation.navigate('OneTimePassword')} />
                </View>
            </View>
        </View>
    );
}
