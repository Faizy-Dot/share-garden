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
            setBids(response.data);
        } catch (err) {
            setError('Failed to fetch bids. Please try again later.');
            console.error('Error fetching bids:', err);
        } finally {
            setLoading(false);
        }
    };

    const renderMyBids = ({ item }) => {
        const isDeclined = item.status === 'REJECTED';
        const isAccepted = item.status === 'ACCEPTED';
        
        return (
            <TouchableOpacity 
                activeOpacity={0.7} 
                style={styles.renderMyBidsContainer} 
                onPress={() => navigation.navigate("BidsReview", { bid: item })}
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
                <NotificationIcon />
            </TouchableOpacity>
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
