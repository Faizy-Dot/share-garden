import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, TextInput } from 'react-native';
import styles from './styles';
import { Colors, Images, Metrix } from '../../../config';
import BackArrowIcon from '../../../components/backArrowIcon/BackArrowIcon';
import colors from '../../../config/Colors';
import CustomInput from '../../../components/customInput/CustomInput';
import CustomButton from '../../../components/Button/Button';
import Toast from 'react-native-toast-message';
import { useSelector } from "react-redux";
import Axios from 'axios';
var baseUrl = 'https://api.sharegarden.ca/api/';


const TabBarButton = ({ iconSource, label, focused, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.tabButton} activeOpacity={1}>
        <Image
            source={iconSource}
            style={{
                width: Metrix.HorizontalSize(28),
                height: Metrix.VerticalSize(28),
                resizeMode: "contain",
                tintColor: focused ? colors.buttonColor : colors.black,
            }}
        />
        <Text style={[styles.tabLabel, { color: focused ? colors.buttonColor : colors.black }]}>{label}</Text>
    </TouchableOpacity>
);

export default function EditProfile({ navigation }) {
    const { user, token } = useSelector((state) => state.login);
    const [fname, setFname] = useState(user?.firstname);
    const [lname, setLname] = useState(user?.lastname);
    const [email, setEmail] = useState(user?.emailaddress);
    const [phone, setPhone] = useState(user?.phonenumber);

    const config = {
        header: { Authorization: `Bearer ${token}`, 'Content-Type':'application/json'}
    }

    const handleSubmit = async () => {
        try {
          const response = await Axios.post(
            `${baseUrl}User/UpdateProfile`,
            {  
              firstName: fname,
              lastName: lname,
              profilePicutreUrl: "",
              about: user.about,
              genderId: 0,
              dob: "0001-01-01T00:00:00",
              phoneNumber: user.phonenumber,
              email: user.emailaddress,
              userId: user.userid,
            },
            config
          );

          console.log(response);
      
          if (response.data.status === "success") {
            Toast.show({
              type: 'success',
              text1: 'Success',
              text2: 'Profile updated successfully!',
            });
            navigation.navigate('Profile');
          } else {
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: 'Something went wrong!',
            });
          }
        } catch (error) {
          console.error(error);
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Error updating profile!',
          });
        }
      };


    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={{ marginTop: Metrix.VerticalSize(13), paddingHorizontal: Metrix.HorizontalSize(15), }}>
                    <BackArrowIcon />
                </View>

                <View style={styles.editProfileContainer}>
                    {/* <Image source={Images.logo} style={styles.logo} /> */}
                    <Image source={Images.homeProfile} style={styles.profile} />
                    <Text style={styles.title}>{user?.firstname} {user?.lastname}</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputs}
                            value={fname}
                            onChangeText={setFname}
                            placeholder="First Name"
                        />
                        <TextInput
                            style={styles.inputs}
                            value={lname}
                            onChangeText={setLname}
                            placeholder="Last Name"
                        />
                        <TextInput
                            style={[
                                styles.inputs,
                                { backgroundColor: Colors.grayLight, color: Colors.grayDark } // Example styling
                            ]}
                            value={email}
                            placeholder="Email"
                            editable={false}
                        />
                        <TextInput
                            style={styles.inputs}
                            value={phone}
                            onChangeText={setPhone}
                            placeholder="Phone Number"
                        />
                    </View>
                    <View style={{ marginTop: Metrix.VerticalSize(20) }}>
                        <CustomButton title="Save" onPress={handleSubmit} />
                    </View>
                </View>



            </View>

            <View style={styles.tabBarContainer}>
                <TabBarButton onPress={() => navigation.navigate("SgTabs", { screen: "Post" })} iconSource={Images.postBlackTab} label="Post" />
                <TabBarButton onPress={() => navigation.navigate("SgTabs", { screen: "Tips" })} iconSource={Images.tipsBlackTab} label="Tips" />
                <TabBarButton onPress={() => navigation.navigate("SgTabs", { screen: "Items" })} iconSource={Images.itemsBlackTab} label="Items" />
                <TabBarButton onPress={() => navigation.navigate("SgTabs", { screen: "Rewards" })} iconSource={Images.rewardsBlackTab} label="Rewards" />
                <TabBarButton onPress={() => navigation.navigate("SgTabs", { screen: "Ads" })} iconSource={Images.adsBlackTab} label="Ads" />
            </View>
        </View>
    );
}

