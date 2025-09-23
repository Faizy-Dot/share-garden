import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, Image, ActivityIndicator, RefreshControl } from 'react-native';
import { Metrix } from '../../config';
import colors from '../../config/Colors';
import fonts from '../../config/Fonts';
import Icon from 'react-native-vector-icons/FontAwesome';
import axiosInstance from '../../config/axios';
import moment from 'moment';

const ProductActivityModal = ({ visible, onClose, productId, activityType, title }) => {
  const [activityList, setActivityList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchActivity = async () => {
    setLoading(true);
    try {
      let response;
      
      if (activityType === 'like') {
        response = await axiosInstance.get(`/api/products/${productId}/likes`);
      } else if (activityType === 'share') {
        response = await axiosInstance.get(`/api/products/${productId}/shares`);
      } else if (activityType === 'favorite') {
        response = await axiosInstance.get(`/api/products/${productId}/favorites`);
      }
      
      if (response?.data) {
        setActivityList(response.data);
      }
    } catch (error) {
      console.error(`Failed to fetch ${activityType} activity:`, error);
      // Set empty array on error to show "no activity" message
      setActivityList([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (visible) {
      fetchActivity();
    }
  }, [visible, productId, activityType]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchActivity();
  };

  const renderActivityItem = ({ item }) => (
    <View style={{ 
      flexDirection: 'row', 
      alignItems: 'center', 
      paddingVertical: Metrix.VerticalSize(10), 
      borderBottomWidth: 1, 
      borderBottomColor: colors.borderColor 
    }}>
      <View style={{ 
        width: Metrix.HorizontalSize(40), 
        height: Metrix.HorizontalSize(40), 
        borderRadius: Metrix.HorizontalSize(20), 
        backgroundColor: colors.borderColor, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginRight: Metrix.HorizontalSize(10) 
      }}>
        {item.user?.profileImage ? (
          <Image 
            source={{ uri: item.user.profileImage }} 
            style={{ 
              width: Metrix.HorizontalSize(40), 
              height: Metrix.HorizontalSize(40), 
              borderRadius: Metrix.HorizontalSize(20) 
            }} 
            resizeMode="cover" 
          />
        ) : (
          <Icon name="user-circle" size={Metrix.HorizontalSize(30)} color={colors.gray} />
        )}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ 
          fontSize: Metrix.FontSmall, 
          fontFamily: fonts.InterSemiBold, 
          color: colors.black 
        }}>
          {item.user?.firstName} {item.user?.lastName}
        </Text>
        <Text style={{ 
          fontSize: Metrix.FontExtraSmall, 
          fontFamily: fonts.InterRegular, 
          color: colors.gray 
        }}>
          {activityType === 'like' ? 'Liked this product' : 
           activityType === 'favorite' ? 'Saved this product' : 
           `Shared this product (${item.shareType || 'General'})`}
        </Text>
      </View>
      <Text style={{ 
        fontSize: Metrix.FontExtraSmall, 
        fontFamily: fonts.InterRegular, 
        color: colors.gray 
      }}>
        {moment(item.createdAt || item.timestamp).fromNow()}
      </Text>
    </View>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ 
        flex: 1, 
        justifyContent: 'flex-end', 
        backgroundColor: 'rgba(0,0,0,0.5)' 
      }}>
        <View style={{ 
          backgroundColor: colors.white, 
          borderTopLeftRadius: Metrix.VerticalSize(20), 
          borderTopRightRadius: Metrix.VerticalSize(20), 
          padding: Metrix.HorizontalSize(20), 
          maxHeight: Metrix.VerticalSize(600) 
        }}>
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: Metrix.VerticalSize(15) 
          }}>
            <Text style={{ 
              fontSize: Metrix.FontRegular, 
              fontFamily: fonts.InterBold, 
              color: colors.black 
            }}>
              {title}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="times-circle" size={Metrix.HorizontalSize(24)} color={colors.gray} />
            </TouchableOpacity>
          </View>

          {loading ? (
            <ActivityIndicator 
              size="large" 
              color={colors.buttonColor} 
              style={{ marginVertical: Metrix.VerticalSize(50) }} 
            />
          ) : activityList.length === 0 ? (
            <View style={{ 
              alignItems: 'center', 
              paddingVertical: Metrix.VerticalSize(50) 
            }}>
              <Text style={{ 
                fontSize: Metrix.FontSmall, 
                fontFamily: fonts.InterRegular, 
                color: colors.gray 
              }}>
                No one has {activityType === 'like' ? 'liked' : 
                           activityType === 'favorite' ? 'saved' : 'shared'} this product yet.
              </Text>
            </View>
          ) : (
            <FlatList
              data={activityList}
              renderItem={renderActivityItem}
              keyExtractor={(item, index) => item.id || index.toString()}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={[colors.buttonColor]}
                />
              }
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ProductActivityModal;
