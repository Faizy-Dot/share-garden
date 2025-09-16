import { FlatList, Image, Text, View } from "react-native";
import BackArrowIcon from "../../../components/backArrowIcon/BackArrowIcon";
import NavBar from "../../../components/navBar/NavBar";
import styles from "./styles";
import colors from "../../../config/Colors";
import React, { useEffect, useState, useCallback } from "react";
import { Images, Metrix } from "../../../config";
import fonts from "../../../config/Fonts";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { BlackBitIcon, PointsEarnIcon, StarIcon } from "../../../assets/svg";
import axiosInstance from "../../../config/axios";
import { useFocusEffect } from '@react-navigation/native';

export default function RewardsTabScreen({ navigation }) {

    const { user } = useSelector((state) => state.login)
    const [buttons, setButtons] = useState({
        sgPoints: true,
        sgCoupons: false
    })

    // State for API data
    const [reviewData, setReviewData] = useState({
        averageRating: 4.5,
        totalReviews: 0
    });
    const [rewardsSummary, setRewardsSummary] = useState({
        currentBalance: 0,
        totalEarned: 0,
        totalSpent: 0,
        totalTransactions: 0
    });
    const [transactionHistory, setTransactionHistory] = useState([]);
    const [recentReward, setRecentReward] = useState(null);
    const [loading, setLoading] = useState(true);

    const buttonOptions = [
        { key: 'sgPoints', label: 'SG Points', color: colors.buttonColor },
        { key: 'sgCoupons', label: 'SG Coupons', color: colors.yellowColor },
    ];

    // Fetch user reviews
    const fetchUserReviews = async () => {
        try {
            const response = await axiosInstance.get(`/api/reviews/user/${user.id}`);
            setReviewData({
                averageRating: response.data.averageRating || 4.5,
                totalReviews: response.data.totalReviews || 0
            });
        } catch (error) {
            console.log('Error fetching user reviews:', error);
        }
    };

    // Fetch rewards summary - GET /api/rewards/summary
    const fetchRewardsSummary = async () => {
        try {
            console.log('Fetching rewards summary...');
            const response = await axiosInstance.get('/api/rewards/summary');
            console.log('Rewards summary response:', response.data);
            setRewardsSummary(response.data);
        } catch (error) {
            console.log('Error fetching rewards summary:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to load rewards summary',
            });
        }
    };

    // Fetch transaction history - GET /api/rewards/history
    const fetchTransactionHistory = async () => {
        try {
            console.log('Fetching transaction history...');
            const response = await axiosInstance.get('/api/rewards/history');
            console.log('Transaction history response:', response.data);
            setTransactionHistory(response.data.transactions || response.data || []);
        } catch (error) {
            console.log('Error fetching transaction history:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to load transaction history',
            });
        }
    };

    // Fetch recent reward - GET /api/rewards/history?type=EARNED&category=SGTIP_PUBLISH&page=1&limit=10
    const fetchRecentReward = async () => {
        try {
            console.log('Fetching recent reward...');
            const response = await axiosInstance.get('/api/rewards/history?type=EARNED&category=SGTIP_PUBLISH&page=1&limit=10');
            console.log('Recent reward response:', response.data);
            if (response.data && response.data.transactions && response.data.transactions.length > 0) {
                setRecentReward(response.data.transactions[0]);
            } else if (response.data && response.data.length > 0) {
                setRecentReward(response.data[0]);
            }
        } catch (error) {
            console.log('Error fetching recent reward:', error);
        }
    };

    // Fetch all data
    const fetchData = async () => {
        setLoading(true);
        try {
            await Promise.all([
                fetchUserReviews(),
                fetchRewardsSummary(),
                fetchTransactionHistory(),
                fetchRecentReward()
            ]);
        } catch (error) {
            console.log('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Render star rating
    const renderStars = () => {
        const rating = reviewData.averageRating;
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <StarIcon 
                    key={i}
                    fillColor={i <= rating ? colors.buttonColor : "none"} 
                    strokeColor={i <= rating ? colors.buttonColor : "#D3D3D3"} 
                />
            );
        }
        return stars;
    };

    const renderResults = ({ item }) => {
        return (
            <View style={styles.resultsContainer}>
                <View style={{flex : 1 , paddingRight : Metrix.HorizontalSize(10)}}>
                    <Text style={styles.titleText}>{item.description || item.category || 'Transaction'}</Text>
                    <Text style={styles.itemsIdText}>
                        {item.type === 'EARNED' ? 'Earned' : 'Spent'} • {new Date(item.createdAt || item.date).toLocaleDateString()}
                    </Text>
                </View>
                <View style={styles.bitContainer}>
                    <BlackBitIcon width={16} height={16} />
                    <Text style={[
                        styles.bitText, 
                        item.type === 'EARNED' 
                            ? { color: colors.buttonColor } 
                            : { color: colors.redColor }
                    ]}>
                        {item.type === 'EARNED' ? '+' : '-'}{item.amount}
                    </Text>
                </View>
            </View>
        )
    }

    // Use useFocusEffect to refresh data when screen is focused
    useFocusEffect(
        useCallback(() => {
            if (user) {
                console.log('Screen focused - refreshing rewards data...');
                fetchData();
            }
        }, [user])
    );

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
        <View style={styles.rewardsContainer}>

            <View style={styles.topContainer}>
                <View style={{ paddingHorizontal: Metrix.HorizontalSize(13) }}>
                    <BackArrowIcon />
                </View>

                <View style={{ paddingHorizontal: Metrix.HorizontalSize(13) }}>
                    <NavBar title={"SG Rewards"} />
                </View>

                <View style={styles.buttonsContainer}>
                    {buttonOptions.map(({ key, label, color }) => (
                        <Text
                            key={key}
                            onPress={() => setButtons({ sgPoints: key === 'sgPoints', sgCoupons: key === 'sgCoupons' })}
                            style={[
                                styles.button,
                                { borderBottomColor: color, color: buttons[key] ? 'black' : '#D3D3D3' },
                            ]}
                        >
                            {label}
                        </Text>
                    ))}
                </View>

            </View>

            <View style={styles.middleContainer}>

                <Image source={user.profileImage ? { uri: user.profileImage } : Images.homeProfile} style={styles.profile} />
                <Text style={styles.sameText2}>{user.firstName} {user.lastName}</Text>

                <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                    {renderStars()}
                    <Text style={styles.ratingText}>{reviewData.averageRating.toFixed(1)}</Text>
                </View>

                <View style={{ gap: 3, alignItems: "center" }}>
                    <Text style={styles.sameText1}>Your SG Balance is</Text>
                    <Text style={styles.sameText2}>{rewardsSummary.currentBalance || 0}</Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <PointsEarnIcon />
                    <Text style={[styles.sameText1, { marginLeft: Metrix.HorizontalSize(10) }]}>
                        {recentReward ? (
                            <>Points earned<Text style={{ fontFamily: fonts.InterBold }}> +{recentReward.amount}</Text> from {recentReward.category?.toLowerCase() || 'recent activity'}</>
                        ) : (
                            <>Points earned<Text style={{ fontFamily: fonts.InterBold }}> +0</Text> from last sales</>
                        )}
                    </Text>
                </View>

            </View>

            <View style={styles.bottomContainer}>
                <FlatList 
                    data={transactionHistory}
                    renderItem={renderResults}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.id || item._id || Math.random().toString()}
                    refreshing={loading}
                    onRefresh={fetchData}
                />
            </View>

        </View>
    )
}