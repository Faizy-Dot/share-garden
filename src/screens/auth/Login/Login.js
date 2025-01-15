import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Images from '../../../config/Images';
import CustomButton from '../../../components/Button/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Metrix } from '../../../config';
import { useDispatch } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import { login } from '../../../assets/redux/Actions/authActions/loginAction';
import Toast from 'react-native-toast-message';

const Login = ({ navigation }) => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const getDeviceDetails = async () => {
        const deviceid = (await DeviceInfo.getUniqueId()).toString(); 
        const fcmtoken = "Coming Soon"; 
        const devicetype = Platform.OS.toString(); 
        
        return { deviceid, fcmtoken, devicetype };
    };

    const handleLogin = async () => {
        if (!email || !password) {
            // alert('Please fill in both email and password.');
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Please fill in both email and password.',
              });
            return;
        }

        // Get device details
        const { deviceid, fcmtoken, devicetype } = await getDeviceDetails();

        // Prepare user data
        const userData = {
            emailaddress: email,
            password,
            deviceid,
            fcmtoken,
            devicetype,
        };

        // Call login action
        try {
            const res = await dispatch(login(userData)).unwrap();
            // alert(res.message);
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: res.message,
              });
            console.log('Login successfully:>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', res);
            navigation.navigate('SgTabs');
        } catch (err) {
            // alert('Login failed!');
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Login failed!',
              });
            console.error(err);
        }
    };


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
                <TextInput style={styles.input}
                 placeholder="Email"
                  placeholderTextColor="#999"
                  onChangeText={setEmail}
                   />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#999"
                    secureTextEntry
                    onChangeText={setPassword}
                />
            </View>

            {/* Forgot Password */}
            <Text style={styles.forgotPassword}>Forgot Password?</Text>

            {/* Login Button */}
            <CustomButton
                title={"Login"}
                width={Metrix.HorizontalSize(300)}
                onPress={handleLogin}
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
                    height={Metrix.VerticalSize(50)}
                />

                <CustomButton
                    title={"Continue With Google"}
                    icon={<FontAwesome name="google" color="#fff" style={styles.socialButtonIcon}
                    />}
                    backgroundColor='#F8443E'
                    width={Metrix.HorizontalSize(300)}
                    height={Metrix.VerticalSize(50)}
                />

                <CustomButton
                    title={"Continue With Apple"}
                    icon={<FontAwesome name="apple" color="#fff" style={styles.socialButtonIcon}
                    />}
                    backgroundColor='#000000'
                    width={Metrix.HorizontalSize(300)}
                    height={Metrix.VerticalSize(50)}
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
                style={{width : Metrix.HorizontalSize(60) , height : Metrix.VerticalSize(30) }}
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