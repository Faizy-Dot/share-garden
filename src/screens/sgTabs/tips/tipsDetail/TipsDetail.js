import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, FlatList, Modal, Pressable, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import axiosInstance from '../../../../config/axios';
import styles from './styles';
import BackArrowIcon from '../../../../components/backArrowIcon/BackArrowIcon';
import NavBar from '../../../../components/navBar/NavBar';
import { CommentLogo, CrossIcon, GreenBitIcon, SgProfileLogo, TipsTabIcon } from '../../../../assets/svg';
import colors from '../../../../config/Colors';
import { Images, Metrix } from '../../../../config';
import fonts from '../../../../config/Fonts';
import { ActivityIndicator } from 'react-native-paper';
import { images } from '../../../../assets';
import { useSelector } from 'react-redux';
import RealTimeActivity from '../../../../components/RealTimeActivity/RealTimeActivity';
import SGTipActions from '../../../../components/SGTipActions/SGTipActions';
import sgtipSocketService from '../../../../services/sgtipSocketService';
import sgtipActivityService from '../../../../services/sgtipActivityService';
import commentService from '../../../../services/commentService';
import Toast from 'react-native-toast-message';
import moment from 'moment';

export default function TipsDetail({ route }) {
    // console.log(route.params.imageArray)

    const [sgtipDetail, setSgtipDetail] = useState("")
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageModalVisible, setImageModalVisible] = useState(false);
    const [recentActivity, setRecentActivity] = useState([]);
    const [stats, setStats] = useState({ likes: 0, shares: 0 });
    
    // Comments state
    const [comments, setComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false
    });
    
    const { user } = useSelector((state) => state.login);
    const realTimeActivityRef = useRef(null);

    console.log("sgTipDetail===>>", sgtipDetail)

    const openImageModal = (imageUri) => {
        setSelectedImage(imageUri);
        setImageModalVisible(true);
    };

    const closeImageModal = () => {
        setImageModalVisible(false);
        setSelectedImage(null);
    };

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(`/api/sgtips/${route.params.id}`);
            setSgtipDetail(response.data);
            
            // Set initial stats
            if (response.data.stats) {
                setStats({
                    likes: response.data.stats.likes || 0,
                    shares: response.data.stats.shares || 0,
                    comments: response.data.stats.comments || 0
                });
            }
        } catch (error) {
            console.error('Failed to fetch SG Tip:', error?.response?.data || error.message);
        } finally {
            setLoading(false); // hide loader even if it fails
        }
    }

    const fetchActivity = async () => {
        try {
            const response = await sgtipActivityService.getSGTipActivity(route.params.id, 5);
            setRecentActivity(response.activities || []);
        } catch (error) {
            console.error('Failed to fetch activity:', error);
        }
    }

    const fetchComments = async (page = 1) => {
        try {
            setLoadingComments(true);
            const response = await commentService.getSGTipComments(route.params.id, page, 20);
            setComments(response.comments || []);
            setPagination(response.pagination || {});
        } catch (error) {
            console.error('Failed to fetch comments:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to load comments'
            });
        } finally {
            setLoadingComments(false);
        }
    }

    const handleSubmitComment = async () => {
        if (!newComment.trim() || isSubmittingComment) return;

        setIsSubmittingComment(true);
        try {
            const response = await commentService.addComment(route.params.id, newComment);
            console.log('Comment response:', response);

            // Add the new comment to the list (backend returns complete comment with user info)
            setComments(prev => [response, ...prev]);
            setNewComment('');
            
            // Update comment count in stats
            setStats(prev => ({
                ...prev,
                comments: (prev.comments || 0) + 1
            }));
            
            Toast.show({
                type: 'success',
                text1: 'Comment Added',
                text2: 'Your comment has been posted successfully'
            });

        } catch (error) {
            console.error('Failed to submit comment:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to post comment. Please try again.'
            });
        } finally {
            setIsSubmittingComment(false);
        }
    }

    // Setup socket connection and real-time listeners
    useEffect(() => {
        if (!user?.id || !route.params.id) return;

        // Connect to socket service
        sgtipSocketService.connect(user.id);
        
        // Join SGTip room for live updates
        sgtipSocketService.joinSGTipRoom(route.params.id);

        // Set up event listeners
        const handleSGTipLiked = (data) => {
            if (data.sgTipId === route.params.id) {
                // Show notification if user is the author
                if (data.likedBy && user.id === sgtipDetail.author?.id) {
                    Toast.show({
                        type: 'success',
                        text1: 'Your SGTip Got a Like! 💖',
                        text2: `${data.likedBy.firstName} liked your SGTip: "${data.sgTipTitle}"`
                    });
                }
                
                // Update activity feed
                if (realTimeActivityRef.current) {
                    realTimeActivityRef.current.addActivity({
                        type: 'like',
                        user: data.likedBy,
                        timestamp: data.timestamp,
                        id: `like-${Date.now()}`
                    });
                }
            }
        };

        const handleSGTipShared = (data) => {
            if (data.sgTipId === route.params.id) {
                // Show notification if user is the author
                if (data.sharedBy && user.id === sgtipDetail.author?.id) {
                    Toast.show({
                        type: 'success',
                        text1: 'Your SGTip Was Shared! 📤',
                        text2: `${data.sharedBy.firstName} shared your SGTip: "${data.sgTipTitle}"`
                    });
                }
                
                // Update activity feed
                if (realTimeActivityRef.current) {
                    realTimeActivityRef.current.addActivity({
                        type: 'share',
                        user: data.sharedBy,
                        shareType: data.shareType,
                        timestamp: data.timestamp,
                        id: `share-${Date.now()}`
                    });
                }
            }
        };

        const handleStatsUpdate = (data) => {
            if (data.sgTipId === route.params.id) {
                // Update stats in real-time
                setStats(prev => ({
                    ...prev,
                    likes: data.type === 'like' ? prev.likes + 1 : prev.likes,
                    shares: data.type === 'share' ? prev.shares + 1 : prev.shares
                }));
            }
        };

        // Add event listeners
        sgtipSocketService.addEventListener('sgtip_liked', handleSGTipLiked);
        sgtipSocketService.addEventListener('sgtip_shared', handleSGTipShared);
        sgtipSocketService.addEventListener('sgtip_stats_update', handleStatsUpdate);

        // Cleanup function
        return () => {
            sgtipSocketService.removeEventListener('sgtip_liked', handleSGTipLiked);
            sgtipSocketService.removeEventListener('sgtip_shared', handleSGTipShared);
            sgtipSocketService.removeEventListener('sgtip_stats_update', handleStatsUpdate);
            sgtipSocketService.leaveSGTipRoom(route.params.id);
        };
    }, [user?.id, route.params.id, sgtipDetail.author?.id]);

    useEffect(() => {
        fetchData();
        fetchActivity();
        fetchComments();
    }, [])

    const handleStatsUpdate = (newStats) => {
        setStats(newStats);
    };

    const handleActivityPress = (activity) => {
        // Handle activity item press (e.g., navigate to user profile)
        console.log('Activity pressed:', activity);
    };


    if (loading) {
        return (
            <View style={[styles.mainContainer, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={colors.buttonColor} />
            </View>
        );
    }

    if (!sgtipDetail) {
        return (
            <View style={styles.mainContainer}>
                <Text style={{ textAlign: 'center', marginTop: 20 }}>No tip data available.</Text>
            </View>
        );
    }

    const renderComment = ({ item }) => {
        const formatTime = (timestamp) => {
            const now = moment();
            const commentTime = moment(timestamp);
            const diffInMinutes = now.diff(commentTime, 'minutes');
            
            if (diffInMinutes < 1) return 'Just now';
            if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
            if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
            return commentTime.format('MMM DD');
        };

        return (
            <View style={styles.commentListRenderConatiner}>
                <View style={styles.renderImageText}>
                    <Image 
                        source={item.user?.profileImage ? { uri: item.user.profileImage } : Images.homeProfile} 
                        style={styles.profileImage} 
                    />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.commentText}>{item.content}</Text>
                        {item.isEdited && (
                            <Text style={[styles.timeText, { fontSize: Metrix.FontExtraSmall, color: colors.gray }]}>
                                (edited)
                            </Text>
                        )}
                    </View>
                </View>
                <Text style={styles.timeText}>{formatTime(item.createdAt)}</Text>
                
                {/* Render replies if any */}
                {item.replies && item.replies.length > 0 && (
                    <View style={{ marginLeft: Metrix.HorizontalSize(50), marginTop: Metrix.VerticalSize(10) }}>
                        {item.replies.map((reply, index) => (
                            <View key={reply.id} style={[styles.commentListRenderConatiner, { marginBottom: Metrix.VerticalSize(8) }]}>
                                <View style={styles.renderImageText}>
                                    <Image 
                                        source={reply.user?.profileImage ? { uri: reply.user.profileImage } : Images.homeProfile} 
                                        style={[styles.profileImage, { width: Metrix.HorizontalSize(32), height: Metrix.HorizontalSize(32) }]} 
                                    />
                                    <View style={{ flex: 1 }}>
                                        <Text style={[styles.commentText, { fontSize: Metrix.FontExtraSmall }]}>{reply.content}</Text>
                                    </View>
                                </View>
                                <Text style={[styles.timeText, { fontSize: Metrix.FontExtraSmall }]}>{formatTime(reply.createdAt)}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        );
    };



    return (
        <KeyboardAvoidingView 
            style={styles.mainContainer} 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
            {/* Real-time Activity Overlay */}
            <RealTimeActivity
                ref={realTimeActivityRef}
                sgTipId={route.params.id}
                userId={user?.id}
                isAuthor={user?.id === sgtipDetail.author?.id}
                onActivityPress={handleActivityPress}
            />
            
            <ScrollView 
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.topContainer}>
                    <BackArrowIcon />
                    <NavBar title={"SG Tip"} />
                </View>

            <View style={styles.tipTitleConatiner}>
                <View style={styles.tipTitle}>
                    <TipsTabIcon width={24} height={24} color={colors.buttonColor} />
                    <Text style={{ fontSize: Metrix.FontSmall, fontFamily: fonts.InterBold }}>{sgtipDetail.title}</Text>
                </View>
                <View>
                    <Text style={{ fontSize: Metrix.FontSmall, fontFamily: fonts.InterBold }}>{sgtipDetail.author.firstName}{" "}{sgtipDetail.author.lastName}</Text>
                </View>
            </View>


            <View style={styles.categoryEarnContainer}>
                <View style={styles.categoryContainer}>
                    <Text style={{ fontSize: Metrix.FontSmall, fontFamily: fonts.InterSemiBold }}>Category:</Text>
                    <Text style={{ fontSize: Metrix.FontSmall, fontFamily: fonts.InterRegular }}>{sgtipDetail.category.name}</Text>
                </View>
                <View style={styles.earnConatiner}>
                    <Text style={{ fontSize: Metrix.FontSmall, fontFamily: fonts.InterSemiBold }}>Points Earned</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: Metrix.HorizontalSize(5) }}>
                        <GreenBitIcon />
                        <Text style={{ fontSize: Metrix.FontRegular, fontFamily: fonts.InterBold }}>{sgtipDetail.stats.totalPointsEarned}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.descriptionImgContainer}>
                <Text>{sgtipDetail.description}</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: Metrix.VerticalSize(15) }}>
                    <View style={styles.SGTipimageContainer}>
                        {route.params.imageArray[0] && (
                            <TouchableOpacity onPress={() => openImageModal(route.params.imageArray[0])}>
                                <Image source={{ uri: route.params.imageArray[0] }} style={styles.SGTipupdateImage} />
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={styles.SGTipimageContainer}>
                        {
                            route.params.imageArray[1] &&
                            <Image source={{ uri: route.params.imageArray[1] }} style={styles.SGTipupdateImage} />
                        }
                    </View>
                    <View style={styles.SGTipimageContainer}>
                        {
                            route.params.imageArray[2] &&
                            <Image source={{ uri: route.params.imageArray[2] }} style={styles.SGTipupdateImage} />
                        }
                    </View>
                </View>
            </View>

            {/* Like and Share Actions */}
            <SGTipActions
                sgTipId={route.params.id}
                userId={user?.id}
                authorId={sgtipDetail.author?.id}
                initialStats={stats}
                onStatsUpdate={handleStatsUpdate}
                sgTipData={{
                    title: sgtipDetail.title,
                    description: sgtipDetail.description,
                    author: sgtipDetail.author,
                    isLiked: sgtipDetail.isLiked || false, // Use existing like status from API response
                    hasShared: sgtipDetail.isShared || false // Use existing share status from API response (note: field name is isShared, not hasShared)
                }}
            />

            <View style={styles.commentContainer}>
                <View style={styles.commentTopContainer}>
                    <CommentLogo />
                    <Text style={styles.commentHeading}>Comments ({sgtipDetail.stats?.comments || 0})</Text>
                </View>

                {/* Add Comment Section */}
                <View style={{ marginTop: Metrix.VerticalSize(15), marginBottom: Metrix.VerticalSize(10) }}>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderColor: colors.borderColor,
                            borderRadius: Metrix.VerticalSize(8),
                            padding: Metrix.HorizontalSize(12),
                            fontSize: Metrix.FontSmall,
                            fontFamily: fonts.InterRegular,
                            minHeight: Metrix.VerticalSize(80),
                            maxHeight: Metrix.VerticalSize(120),
                            textAlignVertical: 'top',
                            backgroundColor: colors.white
                        }}
                        placeholder="Write a comment..."
                        placeholderTextColor={colors.gray}
                        value={newComment}
                        onChangeText={setNewComment}
                        multiline
                        maxLength={500}
                        returnKeyType="default"
                        blurOnSubmit={false}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: Metrix.VerticalSize(8) }}>
                        <Text style={{ fontSize: Metrix.FontExtraSmall, color: colors.gray }}>
                            {newComment.length}/500 characters
                        </Text>
                        <TouchableOpacity
                            style={{
                                backgroundColor: newComment.trim() ? colors.buttonColor : colors.borderColor,
                                paddingHorizontal: Metrix.HorizontalSize(20),
                                paddingVertical: Metrix.VerticalSize(8),
                                borderRadius: Metrix.VerticalSize(20),
                                opacity: isSubmittingComment ? 0.6 : 1
                            }}
                            onPress={handleSubmitComment}
                            disabled={!newComment.trim() || isSubmittingComment}
                        >
                            {isSubmittingComment ? (
                                <ActivityIndicator size="small" color={colors.white} />
                            ) : (
                                <Text style={{
                                    color: colors.white,
                                    fontSize: Metrix.FontSmall,
                                    fontFamily: fonts.InterSemiBold
                                }}>
                                    Post
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Comments List */}
                <View style={styles.commentsSection}>
                    {loadingComments ? (
                        <View style={{ alignItems: 'center', paddingVertical: Metrix.VerticalSize(20) }}>
                            <ActivityIndicator size="small" color={colors.buttonColor} />
                            <Text style={{ marginTop: Metrix.VerticalSize(10), color: colors.gray }}>Loading comments...</Text>
                        </View>
                    ) : (
                        <FlatList 
                            data={comments}
                            renderItem={renderComment}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={{ gap: Metrix.VerticalSize(15) }}
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={
                                <View style={{ alignItems: 'center', paddingVertical: Metrix.VerticalSize(20) }}>
                                    <Text style={{ color: colors.gray, fontSize: Metrix.FontSmall }}>No comments yet. Be the first to comment!</Text>
                                </View>
                            }
                        />
                    )}
                </View>
            </View>

            </ScrollView>

            <Modal visible={imageModalVisible} transparent animationType="fade">
                <View style={{ flex: 1,backgroundColor: "rgba(0,0,0,0.5)", justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={{ position: 'absolute', top: Metrix.VerticalSize(50), right: Metrix.HorizontalSize(20) ,zIndex : 1}} onPress={closeImageModal}>
                        <CrossIcon strokeColor='white' />
                    </TouchableOpacity>
                    {selectedImage && (
                        <Image
                            source={{ uri: selectedImage }}
                            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                        />
                    )}
                </View>
            </Modal>

        </KeyboardAvoidingView>
    );
}
