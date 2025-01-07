import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Images from '../../../config/Images';
import CustomButton from '../../../components/Button/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Metrix } from '../../../config';

const Login = ({ navigation }) => {
    return (
        <KeyboardAwareScrollView style={styles.container} contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: Metrix.VerticalSize(25)
        }}>
            <Image
                source={Images.logo}
                style={styles.logo}
            />

            {/* Input Fields */}
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#999" />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#999"
                    secureTextEntry
                />
            </View>

            {/* Forgot Password */}
            <Text style={styles.forgotPassword}>Forgot Password?</Text>

            {/* Login Button */}
            <CustomButton
                title={"Login"}
                width={Metrix.HorizontalSize(300)}
                onPress={()=>navigation.navigate("SgTabs", { screen: "Items", params: { user: true} })}
            />

            {/* OR Divider */}
            <Text style={styles.orText}>OR</Text>

            {/* Social Media Buttons with Icons */}
            <View style={{ gap: 12 }}>

                <CustomButton
                    title={"Continue With Facebook"}
                    icon={<FontAwesome name="facebook" color="#fff" style={styles.socialButtonIcon}
                    />}
                    backgroundColor='#1B70D4'
                    width={Metrix.HorizontalSize(300)}
                    height={Metrix.VerticalSize(40)}
                />

                <CustomButton
                    title={"Continue With Facebook"}
                    icon={<FontAwesome name="google" color="#fff" style={styles.socialButtonIcon}
                    />}
                    backgroundColor='#F8443E'
                    width={Metrix.HorizontalSize(300)}
                    height={Metrix.VerticalSize(40)}
                />

                <CustomButton
                    title={"Continue With Facebook"}
                    icon={<FontAwesome name="apple" color="#fff" style={styles.socialButtonIcon}
                    />}
                    backgroundColor='#000000'
                    width={Metrix.HorizontalSize(300)}
                    height={Metrix.VerticalSize(40)}
                />
            </View>

            <View style={{marginTop : Metrix.VerticalSize(30)}}>
                <CustomButton
                    title={"Don't have an account?Sign up Now"}
                    width={Metrix.HorizontalSize(300)}
                    fontSize={Metrix.FontSmall}
                    onPress={()=> navigation.navigate("Signup")}
                />
            </View>

            <View style = {styles.skip}>
                <TouchableOpacity 
                activeOpacity={0.8}
                onPress={()=>navigation.navigate("SgTabs", { screen: "Items", params: { user: false} })}
                >
                <Text style={styles.skipText}>{"Skip>>"}</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default Login