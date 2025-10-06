import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TextInput, Modal, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import BackArrowIcon from '../../../components/backArrowIcon/BackArrowIcon';
import styles from './style';
import { ProgressBar } from 'react-native-paper';
import { Colors, Images, Metrix } from '../../../config';
import colors from '../../../config/Colors';
import CustomButton from '../../../components/Button/Button';
import { ModalSuccessLogo, StarIcon } from '../../../assets/svg';
import NavBar from '../../../components/navBar/NavBar';
import fonts from '../../../config/Fonts';
import axiosInstance from '../../../config/axios';
import ApiCaller from '../../../config/ApiCaller';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';

export default function SubmitReview({ route }) {
    const { tradeId } = route.params || {};
    const { user } = useSelector(state => state.login);
    const [rating, setRating] = useState(4);
    const [comment, setComment] = useState('');
    const [submitReviewModal, setSubmitReviewModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [sellerName, setSellerName] = useState('Seller');
    const [loading, setLoading] = useState(true);
    
    console.log("=== SubmitReview Debug Info ===");
    console.log("Route params:", route.params);
    console.log("TradeId from params:", tradeId);
    console.log("User info:", user?.id, user?.firstName);
    console.log("===============================");
    
    // If no tradeId is provided, try to get seller name from the most recent trade
    const shouldFetchAllTrades = !tradeId;
    
    // Fetch trade details to get seller name
    const fetchTradeDetails = async () => {
        try {
            setLoading(true);
            console.log('Fetching trade details for tradeId:', tradeId);
            console.log('User token available:', !!user?.token);
            console.log('Should fetch all trades:', shouldFetchAllTrades);
            
            if (!user?.token) {
                console.log('Missing user token');
                setLoading(false);
                return;
            }
            
            if (!tradeId && !shouldFetchAllTrades) {
                console.log('No tradeId provided and not fetching all trades');
                setLoading(false);
                return;
            }

            const response = await ApiCaller.Get(
                '/api/trades',
                '',
                { Authorization: `Bearer ${user.token}` }
            );

            console.log('Trades API response:', response?.status, response?.data);
            
            if (response.status === 200 && Array.isArray(response.data)) {
                console.log('Total trades found:', response.data.length);
                console.log('Looking for tradeId:', tradeId);
                console.log('All trades:', response.data.map(t => ({ id: t.id, tradeId: t.tradeId, seller: t.seller?.firstName })));
                
                let trade = null;
                
                if (tradeId) {
                    // Try multiple ways to find the specific trade
                    // Method 1: Find by tradeId (human-readable ID)
                    trade = response.data.find(t => t.tradeId === tradeId);
                    console.log('Found trade by tradeId:', trade);
                    
                    // Method 2: Find by id (UUID)
                    if (!trade) {
                        trade = response.data.find(t => t.id === tradeId);
                        console.log('Found trade by id:', trade);
                    }
                    
                    // Method 3: Find by partial match
                    if (!trade) {
                        trade = response.data.find(t => t.tradeId?.includes(tradeId) || t.id?.includes(tradeId));
                        console.log('Found trade by partial match:', trade);
                    }
                } else {
                    // No specific tradeId provided, use the most recent trade
                    console.log('No tradeId provided, using most recent trade');
                    trade = response.data[0]; // Most recent trade (they're ordered by createdAt desc)
                    console.log('Using most recent trade:', trade);
                }
                
                if (trade && trade.seller) {
                    const sellerFullName = `${trade.seller.firstName} ${trade.seller.lastName}`;
                    setSellerName(sellerFullName);
                    console.log('Successfully set seller name:', sellerFullName);
                } else {
                    console.log('Trade not found or no seller info. Available trades:', response.data.length);
                    // Set a fallback name based on the first trade's seller if available
                    const firstTrade = response.data[0];
                    if (firstTrade && firstTrade.seller) {
                        const fallbackName = `${firstTrade.seller.firstName} ${firstTrade.seller.lastName}`;
                        setSellerName(fallbackName);
                        console.log('Using fallback seller name:', fallbackName);
                    }
                }
            } else {
                console.log('Error fetching trades:', response?.status, response?.data);
            }
        } catch (error) {
            console.error('Error fetching trade details:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTradeDetails();
    }, [tradeId, user?.token]);

    const reviewsData = [
        { label: 'Excellent', percentage: 0.8 },
        { label: 'Good', percentage: 0.6 },
        { label: 'Average', percentage: 0.4 },
        { label: 'Below Average', percentage: 0.2 },
        { label: 'Poor', percentage: 0.1 },
    ];

    const handleStarPress = (index) => {
        setRating(index + 1);
    };

    const handleSubmitReview = async () => {
        if (!tradeId) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Trade ID is required'
            });
            return;
        }

        try {
            setIsSubmitting(true);
            const response = await axiosInstance.post('/api/reviews', {
                tradeId,
                rating,
                comment: comment.trim()
            });

            console.log('Review submitted successfully:', response.data);
            setSubmitReviewModal(true);
            setTimeout(() => {
                setSubmitReviewModal(false);
            }, 1500);
        } catch (error) {
            console.error('Error submitting review:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to submit review'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.reviewsContainer}>
                <View style={styles.topContainer}>
                    <BackArrowIcon />
                    <NavBar title={"Review"} />
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.ratingText}>Loading seller information...</Text>
                </View>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView 
            style={styles.reviewsContainer} 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
            <View style={styles.topContainer}>
                <BackArrowIcon />
                <NavBar title={"Review"} />
            </View>

            <ScrollView 
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.averageRatingContainer}>
                    <Text style={styles.ratingText}>Rate your experience with {sellerName}</Text>
                    <Text style={styles.averageRating}>{rating.toFixed(1)}</Text>
                    <View style={styles.starsContainer}>
                        {[1, 2, 3, 4, 5].map((_, index) => (
                            <TouchableOpacity 
                                key={index} 
                                onPress={() => handleStarPress(index)}
                            >
                                <StarIcon 
                                    fillColor={index < rating ? colors.buttonColor : 'none'} 
                                    strokeColor={colors.buttonColor} 
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Review Breakdown */}
                {reviewsData.map((item, index) => (
                    <View style={styles.reviewRow} key={index}>
                        <Text style={styles.reviewLabel}>{item.label}</Text>
                        <ProgressBar progress={item.percentage} color={colors.buttonColor} style={styles.progressBar} />
                    </View>
                ))}

                <View style={styles.bottomContainer}>
                    <View>
                        <Text style={styles.ratingText}>Write Review</Text>
                        <TextInput
                            style={styles.reviewDescription}
                            multiline={true}
                            numberOfLines={4}
                            placeholder="Review"
                            placeholderTextColor={colors.borderColor}
                            textAlignVertical="top"
                            value={comment}
                            onChangeText={setComment}
                        />
                    </View>
                    <CustomButton 
                        title={"Submit Review"}
                        height={Metrix.VerticalSize(48)}
                        width={"100%"}
                        borderRadius={Metrix.VerticalSize(37)}
                        onPress={handleSubmitReview}
                        disabled={isSubmitting}
                    />
                </View>
            </ScrollView>

            <Modal visible={submitReviewModal} transparent animationType="fade">
                <View style={styles.modalContainer}>
                    <View style={styles.modalBox}>
                        <View style={{alignItems: "center", gap: Metrix.VerticalSize(10)}}>
                            <ModalSuccessLogo checkColor={colors.buttonColor} width={69} height={69} />
                            <Text style={[styles.modalText, {width: Metrix.HorizontalSize(200)}]}>
                                Your Review Has been Posted
                            </Text>
                        </View>
                        <Text style={[styles.modalText, { fontFamily: fonts.InterRegular, width: Metrix.HorizontalSize(220) }]}>
                            10 SG points added to your balance
                        </Text>
                    </View>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    );
}
