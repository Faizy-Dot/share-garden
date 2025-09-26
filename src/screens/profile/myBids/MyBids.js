import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './style';
import BackArrowIcon from '../../../components/backArrowIcon/BackArrowIcon';
import NavBar from '../../../components/navBar/NavBar';
import { Images, Metrix } from '../../../config';
import fonts from '../../../config/Fonts';
import colors from '../../../config/Colors';
import { BidTitleIcon, NotificationIcon, SgBidIcon } from '../../../assets/svg';
import { useNavigation } from '@react-navigation/native';
import axiosInstance from '../../../config/axios';

export default function MyBids() {
    const navigation = useNavigation();
    const [bids, setBids] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBids();
    }, []);

    const fetchBids = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/api/bids/user');
            console.log("bids ==>>>" , response.data)
            setBids(response.data);
        } catch (err) {
            setError('Failed to fetch bids. Please try again later.');
            console.error('Error fetching bids:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleChatPress = (bid) => {
        console.log('Bid data:', bid);
        // Navigate to ChatDetail with the required parameters
        navigation.navigate('ChatDetail', {
            chatUser: {
                id: bid.product.sellerId || bid.product.userId || bid.product.seller.id, // Try different possible paths for seller ID
                name: bid.product.sellerName || bid.product.seller?.name || 'Seller',
                image: bid.product.sellerImage || bid.product.seller?.image || null
            },
            productInfo: {
                title: bid.product.title,
                price: bid.amount,
                image: bid.product.image
            }
        });
    };

    const renderMyBids = ({ item }) => {
        const isDeclined = item.status === 'REJECTED';
        const isAccepted = item.status === 'ACCEPTED';
        
        // console.log("Full bid item:", JSON.stringify(item, null, 2));
        // console.log("Product data:", JSON.stringify(item.product, null, 2));
        
        return (
            <View style={styles.renderMyBidsContainer}>
                <TouchableOpacity 
                    activeOpacity={0.7} 
                    style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
                    onPress={() => {
                        const navigationParams = {
                            productId: item.product?.id,
                            bidId: item.id
                        };
                        console.log("Navigating to BidsReview with params:", navigationParams);
                        navigation.navigate("BidsReview", navigationParams);
                    }}
                >
                    <View style={{ flexDirection: "row", alignItems: "center", gap: Metrix.HorizontalSize(20) }}>
                        <SgBidIcon stroke={isDeclined ? colors.redColor : colors.buttonColor} />
                        <View style={{ width: Metrix.HorizontalSize(220) }}>
                            <View>
                                <View style={{ flexDirection: "row", alignItems: "center", gap: Metrix.HorizontalSize(5) }}>
                                    <Text style={styles.title}>{item.product.title}</Text>
                                    <BidTitleIcon />
                                </View>
                            </View>
                            <Text style={[styles.description, isDeclined && { color: colors.redColor }]}>
                                {isAccepted 
                                    ? `Congratulations! Your ${item.amount} Bid has been accepted`
                                    : isDeclined
                                        ? `Your ${item.amount} Bid has been declined`
                                        : `Your bid of ${item.amount} SG Points is pending`}
                            </Text>
                            {isDeclined && (
                                <Text style={[styles.description, { fontFamily: fonts.InterBold }]}>
                                    You can place your bid again
                                </Text>
                            )}
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => handleChatPress(item)}
                    style={{ padding: Metrix.HorizontalSize(10) }}
                >
                    <NotificationIcon />
                </TouchableOpacity>
            </View>
        );
    };

    if (loading) {
        return (
            <View style={[styles.myBidsContainer, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={colors.buttonColor} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.myBidsContainer, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: colors.redColor, fontFamily: fonts.InterRegular }}>
                    {error}
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.myBidsContainer}>
            <View style={styles.topContainer}>
                <BackArrowIcon />
                <NavBar title={"My Bids"} />
            </View>

            {bids.length === 0 ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ 
                        fontFamily: fonts.InterRegular, 
                        fontSize: Metrix.FontSmall,
                        color: colors.grey 
                    }}>
                        You haven't placed any bids yet
                    </Text>
                </View>
            ) : (
                <FlatList 
                    data={bids}
                    renderItem={renderMyBids}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ flexGrow: 1 }}
                />
            )}
        </View>
    );
}
