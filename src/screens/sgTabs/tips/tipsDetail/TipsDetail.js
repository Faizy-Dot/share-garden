import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import axiosInstance from '../../../../config/axios';
import styles from './styles';
import BackArrowIcon from '../../../../components/backArrowIcon/BackArrowIcon';
import NavBar from '../../../../components/navBar/NavBar';
import { GreenBitIcon, TipsTabIcon } from '../../../../assets/svg';
import colors from '../../../../config/Colors';
import { Metrix } from '../../../../config';
import fonts from '../../../../config/Fonts';
import { ActivityIndicator } from 'react-native-paper';

export default function TipsDetail({ route }) {
    console.log(route.params.imageArray)

    const [sgtipDetail, setSgtipDetail] = useState("")
    const [loading, setLoading] = useState(true);

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
    return (
        <View style={styles.mainContainer}>
            <View style={styles.topContainer}>
                <BackArrowIcon />
                <NavBar title={"SG Tip"} />
            </View>

            <View style={styles.tipTitle}>
                <TipsTabIcon width={24} height={24} color={colors.buttonColor} />
                <Text style={{ fontSize: Metrix.FontSmall, fontFamily: fonts.InterBold }}>{sgtipDetail.title}</Text>
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
                    {
                      route.params.imageArray[0] &&
                      <Image source={{ uri: route.params.imageArray[0] }} style={styles.SGTipupdateImage} />
                    }
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


        </View>
    );
}
