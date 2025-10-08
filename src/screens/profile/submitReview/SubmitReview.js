import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Modal, TouchableOpacity, ScrollView, Platform } from 'react-native';
import BackArrowIcon from '../../../components/backArrowIcon/BackArrowIcon';
import styles from './style';
import { ProgressBar } from 'react-native-paper';
import { Colors, Images, Metrix } from '../../../config';
import colors from '../../../config/Colors';
import CustomButton from '../../../components/Button/Button';
import { ModalSuccessLogo, StarIcon } from '../../../assets/svg';
import NavBar from '../../../components/navBar/NavBar';
import fonts from '../../../config/Fonts';
import ApiCaller from '../../../config/ApiCaller';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

export default function SubmitReview({ route }) {
    console.log("=== SubmitReview Component Started ===");
    
    // Get navigation hook
    const navigation = useNavigation();
    
    // Minimal parameter extraction with maximum safety
    let tradeId = null;
    let productId = null;
    let sellerId = null;
    
    try {
        console.log("Route object:", route);
        console.log("Route params:", route?.params);
        
        if (route && route.params) {
            // Convert everything to strings to avoid type casting issues
            tradeId = route.params.tradeId ? String(route.params.tradeId) : null;
            productId = route.params.productId ? String(route.params.productId) : null;
            sellerId = route.params.sellerId ? String(route.params.sellerId) : null;
        }
        
        console.log("Extracted parameters:", { tradeId, productId, sellerId });
    } catch (error) {
        console.error("Error extracting parameters:", error);
    }
    
    const [rating, setRating] = useState(4);
    const [comment, setComment] = useState('');
    const [submitReviewModal, setSubmitReviewModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [sellerName, setSellerName] = useState('Buyer');
    const [loading, setLoading] = useState(false);
    const [isReviewingBuyer, setIsReviewingBuyer] = useState(false);
    const [tradeData, setTradeData] = useState(null);
    
    // Get user from Redux store
    const user = useSelector(state => state.login?.user);
    
    console.log("=== SubmitReview State Initialized ===");
    
    // Check for existing review and fetch buyer details when component mounts
    useEffect(() => {
        console.log("=== useEffect for buyer review ===");
        try {
            if (sellerId && productId) {
                console.log('Setting up buyer review mode');
                setIsReviewingBuyer(true);
                setSellerName('Buyer');
                fetchBuyerDetails();
                checkExistingReview();
            }
        } catch (error) {
            console.error('Error in buyer review useEffect:', error);
        }
    }, [sellerId, productId]);


    const checkExistingReview = async () => {
        try {
            console.log("Checking for existing review...");
            
            const params = new URLSearchParams();
            if (tradeId) {
                params.append('tradeId', tradeId);
            } else if (productId) {
                params.append('productId', productId);
            }

            const response = await ApiCaller.Get(`/api/reviews/check?${params.toString()}`, '', {
                Authorization: `Bearer ${user.token}`
            });

            console.log("Review check response:", response);

            if (response.status === 200 && response.data) {
                if (response.data.hasReviewed) {
                    console.log("User has already reviewed this product/trade");
                    Alert.alert(
                        "Already Reviewed",
                        "You have already submitted a review for this product/trade.",
                        [
                            {
                                text: "OK",
                                onPress: () => navigation.goBack()
                            }
                        ]
                    );
                    return;
                }
            }

            // If no existing review, proceed to fetch buyer details
            fetchBuyerDetails();
        } catch (error) {
            console.error("Error checking existing review:", error);
            // Continue with normal flow if check fails
            fetchBuyerDetails();
        }
    };
    
    // Fetch comprehensive trade details using the new dedicated API endpoint
    const fetchBuyerDetails = async () => {
        try {
            setLoading(true);
            console.log('Fetching comprehensive trade details for productId:', productId);
            
            if (!user?.token) {
                console.error('No user token available for API call');
                setLoading(false);
                return;
            }
            
            // Use the new dedicated API endpoint with authentication
            const response = await ApiCaller.Get(
                `/api/products/${productId}/buyer-info`,
                '',
                { Authorization: `Bearer ${user.token}` }
            );
            
            console.log('Trade info response:', response);
            
            if (response?.data?.success && response.data.data) {
                const data = response.data.data;
                console.log('Trade data received:', data);
                
                // Store comprehensive trade data
                setTradeData(data);
                
                // Set buyer name for display
                if (data.buyer?.firstName || data.buyer?.lastName) {
                    const buyerName = `${data.buyer.firstName || ''} ${data.buyer.lastName || ''}`.trim();
                    setSellerName(buyerName);
                    console.log('Set buyer name to:', buyerName);
                } else {
                    setSellerName('Buyer');
                }
                
                // Update tradeId from API data if available
                if (data.trade?.id) {
                    console.log('Trade ID from API:', data.trade.id);
                }
            } else {
                console.log('No trade data found or API error');
                setSellerName('Buyer');
            }
        } catch (error) {
            console.error('Error fetching trade details:', error);
            setSellerName('Buyer');
        } finally {
            setLoading(false);
        }
    };
    
    const reviewsData = [
        { label: 'Excellent', percentage: 0.8 },
        { label: 'Good', percentage: 0.6 },
        { label: 'Average', percentage: 0.4 },
        { label: 'Below Average', percentage: 0.2 },
        { label: 'Poor', percentage: 0.1 },
    ];

    const handleStarPress = (index) => {
        console.log("Star pressed:", index + 1);
        setRating(index + 1);
    };

    const handleSubmitReview = async () => {
        console.log("Submit review clicked");
        console.log("Rating:", rating);
        console.log("Comment:", comment);
        console.log("Is reviewing buyer:", isReviewingBuyer);
        console.log("Trade data available:", !!tradeData);
        console.log("Trade ID from data:", tradeData?.trade?.tradeId);
        console.log("Trade ID from params:", tradeId);
        
        // Use trade ID from API data if available, otherwise fall back to params
        // Backend expects human-readable tradeId (like "SGH4LR"), not UUID
        const finalTradeId = tradeData?.trade?.tradeId || tradeId;
        
        // For cash products, we don't need tradeId - we use productId instead
        if (!finalTradeId && !productId) {
            console.error("No trade ID or product ID available for review submission");
            console.error("Trade data available:", !!tradeData);
            console.error("Trade data trade ID:", tradeData?.trade?.id);
            console.error("Params trade ID:", tradeId);
            console.error("Product ID:", productId);
            return;
        }
        
        console.log("Using trade ID for review:", finalTradeId);
        console.log("Using product ID for review:", productId);
        console.log("Review data:", {
            tradeId: finalTradeId,
            rating,
            comment,
            isReviewingBuyer,
            buyerName: tradeData?.buyer?.fullName,
            productTitle: tradeData?.product?.title
        });
        
        try {
            setIsSubmitting(true);
            
            const reviewData = {
                rating: rating,
                comment: comment
            };

            // Send tradeId for bidding products, productId for cash products
            if (finalTradeId) {
                // For bidding products: API will determine reviewedId automatically
                reviewData.tradeId = finalTradeId;
            } else {
                // For cash products: we need to send reviewedId
                reviewData.productId = productId;
                reviewData.reviewedId = isReviewingBuyer ? tradeData?.buyer?.id : tradeData?.seller?.id;
            }
            
            console.log("=== FRONTEND REQUEST DEBUG ===");
            console.log("User logged in:", !!user);
            console.log("User ID:", user?.id);
            console.log("User token:", user?.token ? "Present" : "Missing");
            console.log("Final tradeId:", finalTradeId);
            console.log("ProductId:", productId);
            console.log("Is reviewing buyer:", isReviewingBuyer);
            console.log("Trade data available:", !!tradeData);
            console.log("Buyer ID:", tradeData?.buyer?.id);
            console.log("Seller ID:", tradeData?.seller?.id);
            console.log("Product type:", finalTradeId ? "BIDDING (API will determine reviewedId)" : "CASH (sending reviewedId)");
            if (!finalTradeId) {
                console.log("Reviewed ID (who is being reviewed):", isReviewingBuyer ? tradeData?.buyer?.id : tradeData?.seller?.id);
            }
            console.log("Reviewer ID (will be extracted from Bearer token):", user?.id);
            console.log("Review data being sent:", JSON.stringify(reviewData, null, 2));
            console.log("===============================");
            
            const response = await ApiCaller.Post('/api/reviews', reviewData, {
                Authorization: `Bearer ${user.token}`
            });
            
            console.log("Review submission response:", response);
            
            if (response?.data?.success) {
                console.log("Review submitted successfully!");
                setSubmitReviewModal(true);
                setTimeout(() => {
                    setSubmitReviewModal(false);
                    navigation.goBack();
                }, 2000);
            } else {
                console.error("Review submission failed:", response?.data?.message);
                alert("Failed to submit review: " + (response?.data?.message || "Unknown error"));
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            alert("Error submitting review: " + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    console.log("=== SubmitReview Render Started ===");
    
    if (loading) {
        return (
            <View style={styles.reviewsContainer}>
                <View style={styles.topContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <BackArrowIcon />
                    </TouchableOpacity>
                    <NavBar title={"Review"} />
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.ratingText}>Loading buyer information...</Text>
                </View>
            </View>
        );
    }
    
    return (
        <View style={styles.reviewsContainer}>
            <View style={styles.topContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <BackArrowIcon />
                </TouchableOpacity>
                <NavBar title={"Review"} />
            </View>
            
            <ScrollView style={{ flex: 1 }}>
                {/* Debug Information */}
                {/* <View style={{ backgroundColor: '#f0f0f0', padding: 15, marginBottom: 20, borderRadius: 8 }}>
                    <Text style={[styles.ratingText, { fontSize: 16, marginBottom: 10 }]}>🔍 Debug Data:</Text>
                    <Text style={[styles.ratingText, { fontSize: 12 }]}>TradeId: {tradeId || 'None'}</Text>
                    <Text style={[styles.ratingText, { fontSize: 12 }]}>ProductId: {productId || 'None'}</Text>
                    <Text style={[styles.ratingText, { fontSize: 12 }]}>SellerId: {sellerId || 'None'}</Text>
                    <Text style={[styles.ratingText, { fontSize: 12 }]}>Is Reviewing Buyer: {isReviewingBuyer ? 'Yes' : 'No'}</Text>
                    <Text style={[styles.ratingText, { fontSize: 12 }]}>Seller Name: {sellerName}</Text>
                    <Text style={[styles.ratingText, { fontSize: 12 }]}>Loading: {loading ? 'Yes' : 'No'}</Text>
                    <Text style={[styles.ratingText, { fontSize: 12 }]}>User Token: {user?.token ? 'Present' : 'Missing'}</Text>
                    
                    {tradeData && (
                        <>
                            <Text style={[styles.ratingText, { fontSize: 14, marginTop: 10, fontWeight: 'bold' }]}>📊 Trade Data:</Text>
                            <Text style={[styles.ratingText, { fontSize: 12 }]}>Trade ID: {tradeData.trade?.tradeId || 'N/A'}</Text>
                            <Text style={[styles.ratingText, { fontSize: 12 }]}>Trade Status: {tradeData.trade?.status || 'N/A'}</Text>
                            <Text style={[styles.ratingText, { fontSize: 12 }]}>Buyer: {tradeData.buyer?.fullName || 'N/A'}</Text>
                            <Text style={[styles.ratingText, { fontSize: 12 }]}>Buyer Email: {tradeData.buyer?.email || 'N/A'}</Text>
                            <Text style={[styles.ratingText, { fontSize: 12 }]}>Product: {tradeData.product?.title || 'N/A'}</Text>
                            <Text style={[styles.ratingText, { fontSize: 12 }]}>Bid Amount: {tradeData.bid?.amount || 'N/A'} SG Points</Text>
                            <Text style={[styles.ratingText, { fontSize: 12 }]}>Sold At: {tradeData.product?.soldAt ? new Date(tradeData.product.soldAt).toLocaleDateString() : 'N/A'}</Text>
                        </>
                    )}
                </View> */}

                {/* Rating Section - White Background */}
                <View style={[styles.averageRatingContainer, { paddingHorizontal: 20 }]}>
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

                {/* Review Breakdown - Progress Bars */}
                {reviewsData.map((item, index) => (
                    <View style={styles.reviewRow} key={index}>
                        <Text style={styles.reviewLabel}>{item.label}</Text>
                        <ProgressBar progress={item.percentage} color={colors.buttonColor} style={styles.progressBar} />
                    </View>
                ))}

                {/* Review Writing Section - Light Gray Background */}
                <View style={styles.bottomContainer}>
                    <View>
                        <Text style={styles.ratingText}>Write review</Text>
                        <TextInput
                            style={styles.reviewDescription}
                            multiline={true}
                            numberOfLines={4}
                            placeholder="Would you like to write anything about the product!?"
                            placeholderTextColor={colors.borderColor}
                            textAlignVertical="top"
                            value={comment}
                            onChangeText={setComment}
                        />
                        <Text style={[styles.ratingText, { fontSize: 12, color: colors.grey, textAlign: 'right', marginTop: 5 }]}>
                            {400 - comment.length} characters remaining
                        </Text>
                    </View>
                    
                    {/* Submit Button - Inside gray background */}
                    <View style={{ paddingTop: 20 }}>
                        <CustomButton 
                            title={isSubmitting ? "Submitting..." : "Submit Review"}
                            height={Metrix.VerticalSize(48)}
                            width={"100%"}
                            borderRadius={Metrix.VerticalSize(37)}
                            onPress={handleSubmitReview}
                            disabled={isSubmitting}
                        />
                    </View>
                </View>
            </ScrollView>

            <Modal visible={submitReviewModal} transparent animationType="fade">
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{
                        backgroundColor: 'white',
                        padding: 30,
                        borderRadius: 10,
                        alignItems: 'center'
                    }}>
                        <ModalSuccessLogo width={80} height={80} />
                        <Text style={[styles.ratingText, { fontSize: 18, marginTop: 15 }]}>Review Submitted!</Text>
                        <Text style={[styles.ratingText, { fontSize: 14, marginTop: 5 }]}>Thank you for your feedback.</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
}