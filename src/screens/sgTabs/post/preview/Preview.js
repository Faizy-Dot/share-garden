import React, { useEffect, useState } from "react";
import { Image, Modal, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import BackArrowIcon from "../../../../components/backArrowIcon/BackArrowIcon";
import colors from "../../../../config/Colors";
import NavBar from "../../../../components/navBar/NavBar";
import { Images, Metrix } from "../../../../config";
import styles from "./style";
import fonts from "../../../../config/Fonts";
import CustomButton from "../../../../components/Button/Button";


export default function PostTabScreen({ navigation, route }) {
  const [days, setDays] = useState(12);
  const [hours, setHours] = useState(10);
  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(50);
  const [modalVisible, setModalVisible] = useState(false);
  const [publish, setPublish] = useState(false)
  const [draft, setDraft] = useState(false)

  const { user } = useSelector((state) => state.login)

  const { title, pointOrCashValue, description, images, sgPoints, cash, checked } = route.params;

  console.log("checked==>>>",images)
  

  const handleInput = (text, setter) => {
    const numericText = text.replace(/[^0-9]/g, ""); // Allow only numbers
    if (numericText.length <= 2) {
      setter(numericText);
    }
  };

  useEffect(() => {
    if (!user) {
      navigation.navigate("Login")
      Toast.show({
        type: 'error',
        text1: 'Login or Signup',
        text2: 'First Login plz',
      });
    }
  }, [user, navigation]);

  if (!user) {
    return null;
  }

  return (
    <KeyboardAwareScrollView style={styles.postContainer} showsVerticalScrollIndicator={false}>
      <View>
        <BackArrowIcon />
      </View>

      <View>
        <NavBar title={"Create a Post"}
          fontSize={Metrix.FontRegular}
        />
      </View>

      <View style={styles.middleContainer}>
        <Text style={styles.middleHeading}>ITEMS PREVIEW</Text>
        <View style={styles.middleBox}>
          <View style={{ paddingHorizontal: Metrix.HorizontalSize(20) }}>
            <Text style={styles.middleTitle}>{title}</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View style={styles.imageContainer}>
                {
                  images[0] &&
                <Image source={{ uri: images[0] }} style={styles.updateImage} />
                }
              </View>
              <View style={styles.imageContainer}>
              {
                  images[1] &&
                <Image source={{ uri: images[1] }} style={styles.updateImage} />
                }
              </View>
              <View style={styles.imageContainer}>
              {
                  images[2] &&
                <Image source={{ uri: images[2] }} style={styles.updateImage} />
                }
              </View>
            </View>
          </View>

          <View style={styles.sameMiddleBox}>
            <Text style={styles.middleDescription}>{description}</Text>
          </View>

          <View style={styles.sameMiddleBox}>
            <Text style={styles.itemConditionText}>Category : <Text style={{ fontFamily: fonts.InterRegular }}>Furniture</Text></Text>
          </View>

          <View style={[styles.sameMiddleBox, { flexDirection: "row", gap: Metrix.HorizontalSize(5), }]}>
            <Text style={styles.itemConditionText}>Item Condition : <Text style={{ fontFamily: fonts.InterRegular }}>{checked}</Text> </Text>

          </View>

          <View style={[styles.sameMiddleBox, { flexDirection: "row", alignItems: "center", justifyContent: "space-between" }]}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: Metrix.HorizontalSize(10) }}>
              <Image source={sgPoints ? Images.bitLogoBig : Images.dollarLogoBig} style={styles.bitLogo} />
              <Text style={[styles.itemConditionText, { fontFamily: fonts.InterBold }]}>Bid in SG Pts </Text>
            </View>
            <Text style={styles.bidsValue}>{cash && "$  "}{pointOrCashValue}</Text>
          </View>
          {
            sgPoints &&
            <>

              <View style={[styles.sameMiddleBox, { flexDirection: "row", gap: Metrix.HorizontalSize(29) }]}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: Metrix.HorizontalSize(15) }}>
                  <Image source={Images.homePostVector} style={styles.timeIcon} />
                  <Text style={styles.bidEndsText}>Bid Ends</Text>
                </View>

                <View style={styles.timerRow}>
                  {[
                    { label: "Days", value: days, setter: setDays },
                    { label: "Hours", value: hours, setter: setHours },
                    { label: "Minutes", value: minutes, setter: setMinutes },
                    { label: "Seconds", value: seconds, setter: setSeconds },
                  ].map((item, index) => (
                    <View key={index} style={styles.inputContainer}>
                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TextInput
                          style={styles.input}
                          keyboardType="numeric"
                          placeholder="00"
                          placeholderTextColor="#000"
                          value={item.value}
                          onChangeText={(text) => handleInput(text, item.setter)}
                          maxLength={2}
                        />
                        {index < 3 && <Text style={styles.separator}>:</Text>}
                      </View>
                      <Text style={styles.label}>{item.label}</Text>
                    </View>
                  ))}
                </View>

              </View>
            </>
          }



        </View>
      </View>

      <View style={styles.bottomButtons}>
        <CustomButton
          height={Metrix.VerticalSize(42)}
          title={"SAVE DRAFT"}
          backgroundColor={colors.white}
          color={colors.black}
          borderWidth={1}
          borderColor={colors.borderColor}
          borderRadius={Metrix.VerticalSize(4)}
          flex={1}
          onPress={() => {
            setModalVisible(true)
            setDraft(true)
            setPublish(false)
          }}
        />

        <CustomButton
          height={Metrix.VerticalSize(42)}
          title={"PUBLISH"}
          backgroundColor={colors.buttonColor}
          borderRadius={Metrix.VerticalSize(4)}
          flex={1}
          onPress={() => {
            setModalVisible(true)
            setDraft(false)
            setPublish(true)
          }} />
      </View>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <TouchableOpacity style={styles.closeButton} onPress={() => {
              setModalVisible(false)
              setDraft(false)
              setPublish(false)
            }}>
              <Image source={Images.crossIcon} />
            </TouchableOpacity>
            <Image source={Images.successIcon} style={styles.successIcon} />
            {
              draft ?
                <Text style={styles.modalTitle}>Your SG item has been saved in drafts</Text>
                :
                <Text style={styles.modalTitle}>Your SG item has been posted on <Text style={{ color: colors.buttonColor }}>SG marketplace</Text></Text>
            }

            <View style={styles.bottomModalContainer}>
              <Image source={Images.infoIcon} />
              <Text style={styles.modalDescription}>You can access your {publish ? "posted" : "drafts"} item under <Text style={{ color: colors.redColor }}>Profile {">"} My posted items.</Text></Text>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAwareScrollView>
  );
}
