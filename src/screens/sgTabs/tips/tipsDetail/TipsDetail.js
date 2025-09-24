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
import SGTipActivityModal from '../../../../components/SGTipActivityModal/SGTipActivityModal';
import sgtipSocketService from '../../../../services/sgtipSocketService';
import sgtipActivityService from '../../../../services/sgtipActivityService';
import commentService from '../../../../services/commentService';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function TipsDetail({ route }) {

    const [sgtipDetail, setSgtipDetail] = useState("")
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageModalVisible, setImageModalVisible] = useState(false);
    const [recentActivity, setRecentActivity] = useState([]);
    const [stats, setStats] = useState({ likes: 0, shares: 0 });
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingContent, setEditingContent] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    
    // Activity modal states
    const [showLikesModal, setShowLikesModal] = useState(false);
    const [showSharesModal, setShowSharesModal] = useState(false);


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
        if (!newComment.trim()) return;

        try {
            // Call API
            const response = await commentService.addComment(sgtipDetail.id, newComment);
            // Make sure response has an `id`, `content`, `createdAt` etc.
            // If not, create a local object
            const newCommentObj = {
                id: response.comment.id || Date.now().toString(), // fallback id
                content: newComment,
                createdAt: response.createdAt || new Date().toISOString(),
                user: user,
                userId: user.id // add logged-in user details so profile image + name show
            };

            // Insert into comments list immediately
            setComments(prev => [newCommentObj, ...prev]);

            // Update stats count
            setStats(prev => ({
                ...prev,
                comments: (prev.comments || 0) + 1
            }));

            // Clear input
            setNewComment('');

            Toast.show({
                type: 'success',
                text1: 'Comment posted successfully',
            });
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error posting comment',
            });
        }
    };



    const handleDeleteComment = async (commentId) => {
        try {
            await commentService.deleteComment(commentId);
            setComments(prev => prev.filter(c => c.id !== commentId));

            // Update stats count
            setStats(prev => ({
                ...prev,
                comments: (prev.comments || 1) - 1
            }));

            Toast.show({
                type: 'success',
                text1: 'Deleted',
                text2: 'Comment deleted successfully'
            });
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to delete comment'
            });
        }
    };



    const handleEditComment = async () => {
        if (!editingContent.trim()) return;

        try {
            const updated = await commentService.editComment(editingCommentId, editingContent);

            setComments(prev =>
                prev.map(c =>
                    c.id === editingCommentId
                        ? { ...c, content: editingContent } // update local immediately
                        : c
                )
            );

            setIsEditing(false);
            setEditingContent('');
            setEditingCommentId(null);

            Toast.show({
                type: 'success',
                text1: 'Comment updated'
            });
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Failed to update comment'
            });
        }
    };




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

    const handleShowLikes = () => {
        setShowLikesModal(true);
    };

    const handleShowShares = () => {
        setShowSharesModal(true);
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
                    {
                        item.user?.profileImage ?
                            <Image
                                source={{ uri: item.user.profileImage }}
                                style={styles.profileImage}
                            />
                            :
                            <Icon name="user-circle" size={Metrix.HorizontalSize(42)} color="white" />
                    }
                    <View style={{ flex: 1 }}>
                        <Text style={styles.commentText}>{item.content}</Text>
                    </View>
                </View>
                <View style={styles.commentFooterContainer}>
                    <Text style={styles.timeText}>{formatTime(item.createdAt)}</Text>
                    <View style={{ flexDirection: "row", gap: Metrix.HorizontalSize(10) }}>
                        {
                            user.id === item.userId &&
                            <>
                                <TouchableOpacity activeOpacity={0.8}
                                    onPress={() => {
                                        setEditingCommentId(item.id);
                                        setEditingContent(item.content);
                                        setIsEditing(true);
                                    }}>
                                    <Text style={[styles.editDeleteText, { color: colors.buttonColor }]}>Edit</Text>
                                </TouchableOpacity>

                                <TouchableOpacity activeOpacity={0.8} onPress={() => handleDeleteComment(item.id)}>
                                    <Text style={[styles.editDeleteText, { color: colors.redColor }]}>Delete</Text>
                                </TouchableOpacity>
                            </>
                        }





                    </View>
                </View>
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
            <View style={styles.topContainer}>
                <BackArrowIcon />
                <NavBar title={"SG Tip"} />
            </View>

            <FlatList
                data={comments}
                renderItem={renderComment}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: Metrix.VerticalSize(20), gap: Metrix.VerticalSize(15) }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"

                // 👇 Top part of your screen (tip details, actions, add comment box)
                ListHeaderComponent={

                    <>
                        <View style={styles.tipTitleConatiner}>
                            <View style={styles.tipTitle}>
                                <TipsTabIcon width={24} height={24} color={colors.buttonColor} />
                                <Text style={{ fontSize: Metrix.FontSmall, fontFamily: fonts.InterBold, flex: 1 }}>{sgtipDetail.title}</Text>
                            </View>
                            <View style={styles.authorContainer}>
                                <Text style={{ fontSize: Metrix.FontSmall, fontFamily: fonts.InterBold, color: colors.buttonColor }}>by {sgtipDetail.author.firstName}{" "}{sgtipDetail.author.lastName}</Text>
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
                                    {sgtipDetail.imagesArray[0] && (
                                        <TouchableOpacity onPress={() => openImageModal(sgtipDetail.imagesArray[0])}>
                                            <Image source={{ uri: sgtipDetail.imagesArray[0] }} style={styles.SGTipupdateImage} />
                                        </TouchableOpacity>
                                    )}
                                </View>
                                <View style={styles.SGTipimageContainer}>
                                    {
                                        sgtipDetail.imagesArray[1] &&
                                        <TouchableOpacity onPress={() => openImageModal(sgtipDetail.imagesArray[1])}>
                                            <Image source={{ uri: sgtipDetail.imagesArray[1] }} style={styles.SGTipupdateImage} />
                                        </TouchableOpacity>
                                    }
                                </View>
                                <View style={styles.SGTipimageContainer}>
                                    {
                                        sgtipDetail.imagesArray[2] &&
                                        <TouchableOpacity onPress={() => openImageModal(sgtipDetail.imagesArray[2])}>
                                            <Image source={{ uri: sgtipDetail.imagesArray[2] }} style={styles.SGTipupdateImage} />
                                        </TouchableOpacity>
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
                                isLiked: sgtipDetail.isLiked || false,
                                hasShared: sgtipDetail.isShared || false
                            }}
                            pulseLikeKey={stats.likes}
                            pulseShareKey={stats.shares}
                        />

                        <View style={styles.commentContainer}>
                            <View style={styles.commentTopContainer}>
                                <CommentLogo />
                                <Text style={styles.commentHeading}>Comments ({sgtipDetail.stats?.comments || 0})</Text>
                            </View>

                            {/* Add Comment Section */}
                            {user?.id !== sgtipDetail.author?.id && (
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
                            )}
                        </View>
                    </>

                }

                // 👇 Shows loader or empty state after the list
                ListFooterComponent={
                    loadingComments ? (
                        <View style={{ alignItems: 'center', paddingVertical: Metrix.VerticalSize(20) }}>
                            <ActivityIndicator size="small" color={colors.buttonColor} />
                            <Text style={{ marginTop: Metrix.VerticalSize(10), color: colors.gray }}>
                                Loading comments...
                            </Text>
                        </View>
                    ) : null
                }

                // 👇 Empty comments list state
                ListEmptyComponent={
                    !loadingComments && (
                        <View style={{ alignItems: 'center', paddingVertical: Metrix.VerticalSize(20) }}>
                            <Text style={{ color: colors.gray, fontSize: Metrix.FontSmall }}>
                                No comments yet. Be the first to comment!
                            </Text>
                        </View>
                    )
                }
            />



            <Modal visible={imageModalVisible} transparent animationType="fade">
                <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={{ position: 'absolute', top: Metrix.VerticalSize(50), right: Metrix.HorizontalSize(20), zIndex: 1 }} onPress={closeImageModal}>
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

            <Modal visible={isEditing} transparent animationType="slide">
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0,0,0,0.5)"
                }}>
                    <View style={{
                        backgroundColor: colors.white,
                        width: "90%",
                        padding: 20,
                        borderRadius: 10
                    }}>
                        <Text style={{ fontSize: Metrix.FontSmall, fontFamily: fonts.InterRegular, marginBottom: Metrix.VerticalSize(10) }}>Edit Comment</Text>
                        <TextInput
                            value={editingContent}
                            onChangeText={setEditingContent}
                            style={{
                                borderWidth: 1,
                                borderColor: colors.borderColor,
                                borderRadius: 6,
                                padding: Metrix.HorizontalSize(10),
                                minHeight: Metrix.VerticalSize(80),
                                textAlignVertical: "top"
                            }}
                            multiline
                        />

                        <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 10 }}>
                            <TouchableOpacity onPress={() => setIsEditing(false)} style={{ marginRight: 15 }}>
                                <Text style={{ fontSize: Metrix.FontSmall, fontFamily: fonts.InterRegular }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleEditComment}>
                                <Text style={{ color: colors.buttonColor, fontSize: Metrix.FontSmall, fontFamily: fonts.InterRegular }}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Bottom sheets removed per new requirement */}

        </KeyboardAvoidingView>
    );
}


