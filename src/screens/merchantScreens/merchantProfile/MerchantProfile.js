import React from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, } from 'react-native';
import styles from './styles';
import { Metrix, Colors } from '../../../config';
import BackArrowIcon from '../../../components/backArrowIcon/BackArrowIcon';
import CustomButton from '../../../components/Button/Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CameraIcon } from '../../../assets/svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import fonts from '../../../config/Fonts';
import { useSelector } from 'react-redux';

export default function MerchantProfile({ navigation }) {

    const { user } = useSelector((state) => state.login)


    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={{ gap: Metrix.VerticalSize(11) }}>
                    <View style={{ marginTop: Metrix.VerticalSize(13), paddingHorizontal: Metrix.HorizontalSize(15) }}>
                        <BackArrowIcon />
                    </View>

                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingHorizontal: Metrix.HorizontalSize(18),
                        alignItems: "center"
                    }}>
                        <Text style={styles.editProfileText}>Edit Profile</Text>
                        <CustomButton
                            width={Metrix.HorizontalSize(81)}
                            height={Metrix.VerticalSize(36)}
                            title="Save"
                            borderRadius={Metrix.VerticalSize(4)}
                        />
                    </View>

                    <View style={{
                        flexDirection: "row",
                        gap: Metrix.HorizontalSize(20),
                        paddingHorizontal: Metrix.HorizontalSize(20),
                        alignItems: "center"
                    }}>
                        <TouchableOpacity style={styles.imagePickerContainer}>
                            <View style={styles.profileContainer}>
                                {
                                    user.profileImage ?
                                        <Image
                                            source={user.profileImage}
                                            style={styles.profileImage}
                                            resizeMode="cover"
                                        />
                                        :
                                        <Text style={styles.profileFistLetter}>
                                            {user?.firstName.charAt(0).toUpperCase()}
                                        </Text>
                                }
                                <View style={styles.camerIconConatiner}>
                                    <CameraIcon />
                                </View>
                            </View>
                        </TouchableOpacity>

                        <View style={{ gap: 10, flex: 1 }}>
                            <Text style={[styles.userName, { fontSize: Metrix.FontSmall }]}>Enter your Store Name*</Text>
                            <TextInput style={styles.inputs} />
                        </View>
                    </View>

                    <View style={{ marginTop: Metrix.VerticalSize(7), paddingHorizontal: Metrix.HorizontalSize(15) }}>
                        <Text style={{
                            fontSize: Metrix.normalize(8),
                            fontFamily: fonts.InterLight,
                        }}>JPG, JPEG, PNG Min: 400px, Max: 1024px</Text>
                    </View>
                </View>

                <KeyboardAwareScrollView contentContainerStyle={{ paddingBottom: Metrix.VerticalSize(30) }}>
                    <View style={styles.topInputContainer}>
                        <View style={{ gap: Metrix.VerticalSize(7) }}>
                            <View>
                                <Text style={styles.userName}>Store Address*</Text>
                                <Text style={[styles.userName, { fontFamily: fonts.InterRegular }]}>e.g “23 Ridge Way Plaza, Mississauga, ON”</Text>
                            </View>
                            <TextInput style={styles.inputs} />
                        </View>
                        <View style={{ gap: Metrix.VerticalSize(7) }}>
                            <Text style={styles.userName}>{"Website (if any)"}</Text>
                            <TextInput style={styles.inputs} />
                        </View>

                        <View style={{ gap: Metrix.VerticalSize(7) }}>
                            <Text style={styles.userName}>Email</Text>
                            <TextInput style={styles.inputs} value="john@example.com" editable={false} />
                            <Text style={{
                                fontSize: Metrix.FontSmall,
                                fontFamily: fonts.InterRegular
                            }}>
                                This email will be useful to keep in touch. we don’t share your private email address with other SG users
                            </Text>
                        </View>

                        <View style={{ gap: Metrix.VerticalSize(7) }}>
                            <Text style={styles.userName}>Phone Number</Text>
                            <TextInput style={styles.inputs} />

                        </View>


                    </View>






                    <View style={[styles.borderLineContainer, { marginTop: Metrix.VerticalSize(30) }]}>
                        <View style={styles.borderLine}></View>
                    </View>

                    <View style={styles.connectionContainer}>
                        <Text style={styles.contactInformationText}>Optional Information</Text>
                        <View style={styles.connectionBoxes}>
                            <View>
                                <CustomButton
                                    width={"100%"}
                                    height={Metrix.VerticalSize(40)}
                                    backgroundColor={Colors.white}
                                    borderColor={Colors.black}
                                    borderWidth={1}
                                    borderRadius={Metrix.VerticalSize(3)}
                                    icon={<Icon name="facebook" color="#1B70D4" style={styles.socialButtonIcon} />}
                                    title="Connect"
                                    color={Colors.black}
                                    fontSize={Metrix.FontSmall}
                                    fontFamily={fonts.InterBold}
                                />
                                <Text style={{
                                    fontSize: Metrix.FontExtraSmall,
                                    fontFamily: fonts.InterRegular,
                                    marginTop: Metrix.VerticalSize(5),
                                    flex: 1
                                }}>Sign in with Facebook and discover your trusted connections to buyers</Text>
                            </View>

                            <View>
                                <CustomButton
                                    width={"100%"}
                                    height={Metrix.VerticalSize(40)}
                                    backgroundColor={Colors.white}
                                    borderColor={Colors.black}
                                    borderWidth={1}
                                    borderRadius={Metrix.VerticalSize(3)}
                                    icon={<Icon name="google" color="#F8443E" style={styles.socialButtonIcon} />}
                                    title="Connect"
                                    color={Colors.black}
                                    fontSize={Metrix.FontSmall}
                                    fontFamily={fonts.InterBold}
                                />
                                <Text style={{
                                    fontSize: Metrix.FontExtraSmall,
                                    fontFamily: fonts.InterRegular,
                                    marginTop: Metrix.VerticalSize(5)
                                }}>Sign in with Gmail and discover your trusted connections to buyers</Text>
                            </View>

                            <View>
                                <CustomButton
                                    width={"100%"}
                                    height={Metrix.VerticalSize(40)}
                                    backgroundColor={Colors.white}
                                    borderColor={Colors.black}
                                    borderWidth={1}
                                    borderRadius={Metrix.VerticalSize(3)}
                                    icon={<Icon name="apple" color={Colors.black} style={styles.socialButtonIcon} />}
                                    title="Connect"
                                    color={Colors.black}
                                    fontSize={Metrix.FontSmall}
                                    fontFamily={fonts.InterBold}
                                />
                                <Text style={{
                                    fontSize: Metrix.FontExtraSmall,
                                    fontFamily: fonts.InterRegular,
                                    marginTop: Metrix.VerticalSize(5)
                                }}>Sign in with Apple and discover your trusted connections to buyers</Text>
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </View>
    );
}
