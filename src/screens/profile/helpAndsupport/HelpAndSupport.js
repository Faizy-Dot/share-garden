import React from 'react';
import { View, Text, Image, TextInput, ScrollView } from 'react-native';
import styles from './style';
import BackArrowIcon from '../../../components/backArrowIcon/BackArrowIcon';
import { Images, Metrix } from '../../../config';
import CustomInput from '../../../components/customInput/CustomInput';
import CustomButton from '../../../components/Button/Button';
import fonts from '../../../config/Fonts';

export default function HelpAndSupport() {
  return (
    <View style={styles.helpAndSupportContainer}>
      <View style={styles.topContainer}>
        <BackArrowIcon />
        <Text style={styles.topTitle}>Help & Support</Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: Metrix.VerticalSize(15) }} showsVerticalScrollIndicator={false}>
        <View style={styles.middleContainer}>
          <Image source={Images.logo} style={styles.logo}/>
          <View>
            <Text style={styles.helpText}>Help & Support </Text>
            <Text style={styles.termsText}>Help centre and legal terms</Text>
          </View>

          <View style={styles.middleInputContainer}>
            <CustomInput height={Metrix.VerticalSize(48)}
              borderRadius={Metrix.VerticalSize(37)}
              placeholder={"Search"} />
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <Text style={styles.bottomHelpText}>Need more help?</Text>

          <Text style={styles.bottomSendText}>Send a message!</Text>
          <View style={{ gap: Metrix.VerticalSize(15) }}>
            <View >
              <Text style={styles.bottomInputLabel}>Your email address</Text>
              <TextInput style={styles.bottomInputs} />
            </View>
            <View>
              <Text style={styles.bottomInputLabel}>Subject</Text>
              <TextInput style={styles.bottomInputs} />
            </View>
            <View style={{ marginTop: Metrix.VerticalSize(15) }}>
              <Text style={styles.bottomInputLabel}>Describe your issue</Text>
              <TextInput style={[styles.bottomInputs, { height: Metrix.VerticalSize(75) }]}
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top" />
            </View>
            <CustomButton title={"SUBMIT"}
              height={Metrix.VerticalSize(42)}
              width={"100%"}
              fontSize={Metrix.FontSmall}
              fontFamily={fonts.InterBold}
              borderRadius={Metrix.VerticalSize(3)} />
          </View>

        </View>

      </ScrollView>

    </View>
  );
}
