import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import { Metrix } from '../../config';
import BackArrowIcon from '../backArrowIcon/BackArrowIcon';
import { BellIcon } from '../../assets/svg';
import fonts from '../../config/Fonts';
import colors from '../../config/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { logout } from '../../redux/Actions/authActions/loginAction';
import Toast from 'react-native-toast-message';

export default function MerchantNavbar({ title, }) {
    const { user } = useSelector((state) => state.login);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const navigation = useNavigation();
    const toggleDropdown = () => setDropdownVisible(!dropdownVisible);
    const closeDropdown = () => setDropdownVisible(false);

     const dispatch = useDispatch();
    
        const handleLogout = () => {
            dispatch(logout());
            Toast.show({
                type: 'success',
                text1: "Logout Successfully",
            });
            navigation.navigate('Login');
        };

    return (
        <TouchableWithoutFeedback onPress={closeDropdown}>
            <View style={styles.container}>
                <BackArrowIcon />
                <View style={styles.row}>
                    <Text style={styles.merchantName}>
                        {title ? title : `Hi, ${user.firstName}`}
                    </Text>

                    <View style={styles.iconRow}>
                        <BellIcon width={22} height={23} />

                        <TouchableOpacity onPress={toggleDropdown}>
                            <Text style={styles.profileImage}>
                                {user?.firstName.charAt(0).toUpperCase()}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {dropdownVisible && (
                    <View style={styles.dropdown}>
                        <TouchableOpacity
                            onPress={() => {
                                setDropdownVisible(false);
                                navigation.navigate('MerchantProfileScreen');
                            }}>
                            <Text style={styles.menuItem}>My Profile</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                setDropdownVisible(false);
                                navigation.navigate('MerchantItems');
                            }}>
                            <Text style={styles.menuItem}>Buy Package</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                setDropdownVisible(false);
                                navigation.navigate('MerchantCoupons');
                            }}>
                            <Text style={styles.menuItem}>Payment History</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            // onPress={() => {
                            //     setDropdownVisible(false);
                            //     navigation.navigate('ChangePasswordScreen');
                            // }}
                            >
                            <Text style={styles.menuItem}>Change Passwords</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            // onPress={() => {
                            //     setDropdownVisible(false);
                            //     navigation.navigate('FriendReferralScreen');
                            // }}
                            >
                            <Text style={styles.menuItem}>Friend Referrals</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={handleLogout}
                            >
                            <Text style={styles.menuItem}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
                )}

            </View>
        </TouchableWithoutFeedback>
    );
}


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: Metrix.HorizontalSize(15),
        marginTop: Metrix.VerticalSize(15),
        zIndex: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Metrix.HorizontalSize(10),
    },
    merchantName: {
        fontSize: Metrix.FontLarge,
        fontFamily: fonts.InterRegular,
    },
    profileImage: {
        width: Metrix.HorizontalSize(45),
        height: Metrix.HorizontalSize(45),
        backgroundColor: 'darkblue',
        borderRadius: Metrix.HorizontalSize(22.5),
        color: colors.white,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: Metrix.FontLarge,
        fontFamily: fonts.InterBold,
    },
    dropdown: {
        position: 'absolute',
        right: Metrix.HorizontalSize(15),
        top: Metrix.VerticalSize(70),
        backgroundColor: '#E9F9FF',
        borderRadius: 12,
        paddingVertical: Metrix.VerticalSize(10),
        paddingHorizontal: Metrix.HorizontalSize(15),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        zIndex: 999,
    },
    menuItem: {
        fontSize: Metrix.FontRegular,
        fontFamily: fonts.InterBold,
        color: '#003366',
        paddingVertical: Metrix.VerticalSize(6),
    },
});
