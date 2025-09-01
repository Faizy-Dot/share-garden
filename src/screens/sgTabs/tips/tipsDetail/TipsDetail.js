import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, Modal, Pressable, TouchableOpacity } from 'react-native';
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

export default function TipsDetail({ route }) {
    // console.log(route.params.imageArray)

    const [sgtipDetail, setSgtipDetail] = useState("")
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageModalVisible, setImageModalVisible] = useState(false);

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
        } catch (error) {
            console.error('Failed to fetch SG Tip:', error?.response?.data || error.message);
        } finally {
            setLoading(false); // hide loader even if it fails
        }
    }
    // console.log("sgtipDetail==>>" , sgtipDetail.images)

    useEffect(() => {
        fetchData()
    }, [])


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

    const commentsList = [
        {
            comment: "This trick is totally works , Highly recommend",
            time: "Recent 7pm"
        },
        {
            comment: "Quick solution , Highly recommend",
            time: "3 days ago"
        },
    ]

    const commentsListRender = ({ item }) => {
        return (
            <View style={styles.commentListRenderConatiner}>
                <View style={styles.renderImageText}>
                    <Image source={Images.homeProfile} style={styles.profileImage} />
                    <Text style={styles.commentText}>{item.comment}</Text>
                </View>
                <Text style={styles.timeText}>{item.time}</Text>
            </View>
        )
    }



    return (
        <View style={styles.mainContainer}>
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

            <View style={styles.commentContainer}>
                <View style={styles.commentTopContainer}>
                    <CommentLogo />
                    <Text style={styles.commentHeading}>Comments</Text>
                </View>

                <View style={styles.commentsSection}>
                    <FlatList data={commentsList}
                        renderItem={commentsListRender}
                        contentContainerStyle={{ gap: Metrix.VerticalSize(15) }} />
                </View>
            </View>

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


        </View>
    );
}
