import React, { useState } from 'react';
import { View, Text, FlatList, Image, TextInput, Modal, TouchableOpacity } from 'react-native';
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
import Toast from 'react-native-toast-message';

export default function SubmitReview({ route }) {
    const { tradeId } = route.params || {};
    const [rating, setRating] = useState(4);
    const [comment, setComment] = useState('');
    const [submitReviewModal, setSubmitReviewModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
console.log("tradid from submit reviews==>>" , tradeId)
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

    return (
        <View style={styles.reviewsContainer}>
            <View style={styles.topContainer}>
                <BackArrowIcon />
                <NavBar title={"Review"} />
            </View>

            <View style={styles.averageRatingContainer}>
                <Text style={styles.ratingText}>Rate your experience with Terry</Text>
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
        </View>
    );
}
