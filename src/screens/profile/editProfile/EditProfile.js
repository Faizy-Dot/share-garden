import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, TextInput } from 'react-native';
import styles from './styles';
import { Colors, Images, Metrix } from '../../../config';
import BackArrowIcon from '../../../components/backArrowIcon/BackArrowIcon';
import colors from '../../../config/Colors';
import CustomInput from '../../../components/customInput/CustomInput';
import CustomButton from '../../../components/Button/Button';



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



    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={{ marginTop: Metrix.VerticalSize(13), paddingHorizontal: Metrix.HorizontalSize(15), }}>
                    <BackArrowIcon />
                </View>

                <View style={styles.editProfileContainer}>
                    <Image source={Images.logo} style={styles.logo} />
                    <Image source={Images.homeProfile} style={styles.profile} />
                    <Text style={styles.title}>Ashley Simson</Text>
                    <View style={styles.inputContainer}>

                    <TextInput style={styles.inputs} placeholder='Name' />
                    <TextInput style={styles.inputs} placeholder='Password' />
                    <TextInput style={styles.inputs} placeholder='Phone Number' />
                    <TextInput style={styles.inputs} placeholder='Address' />
                    </View>
                    <View style={{marginTop : Metrix.VerticalSize(20)}}>
                    <CustomButton title={"Save"} />
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

