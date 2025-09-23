import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { CrossIcon } from '../../assets/svg';
import colors from '../../config/Colors';
import fonts from '../../config/Fonts';
import { Metrix } from '../../config';
import sgtipActivityService from '../../services/sgtipActivityService';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';

const SGTipActivityModal = ({ 
  visible, 
  onClose, 
  sgTipId, 
  activityType = 'likes', // 'likes' or 'shares'
  title = 'Activity' 
}) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (visible && sgTipId) {
      fetchActivities();
    }
  }, [visible, sgTipId, activityType]);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const response = await sgtipActivityService.getSGTipActivity(sgTipId, 50);
      
      // Filter activities by type
      const filteredActivities = response.activities.filter(
        activity => activity.type === activityType
      );
      
      setActivities(filteredActivities);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchActivities();
    setRefreshing(false);
  };

  const formatTime = (timestamp) => {
    const now = moment();
    const activityTime = moment(timestamp);
    const diffInMinutes = now.diff(activityTime, 'minutes');

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d ago`;
    return activityTime.format('MMM DD, YYYY');
  };

  const getActivityIcon = () => {
    if (activityType === 'like') {
      return '❤️';
    } else if (activityType === 'share') {
      return '📤';
    }
    return '🔔';
  };

  const getActivityText = (activity) => {
    if (activityType === 'like') {
      return 'liked your SGTip';
    } else if (activityType === 'share') {
      return `shared your SGTip${activity.shareType ? ` via ${activity.shareType}` : ''}`;
    }
    return 'interacted with your SGTip';
  };

  const renderActivityItem = ({ item }) => (
    <View style={styles.activityItem}>
      <View style={styles.userImageContainer}>
        {item.user?.profileImage ? (
          <Image
            source={{ uri: item.user.profileImage }}
            style={styles.userImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.defaultUserImage}>
            <Text style={styles.defaultUserText}>
              {item.user?.firstName?.charAt(0) || '?'}
            </Text>
          </View>
        )}
      </View>
      
      <View style={styles.activityContent}>
        <Text style={styles.activityText}>
          <Text style={styles.userName}>
            {item.user?.firstName} {item.user?.lastName}
          </Text>
          {' '}
          {getActivityText(item)}
        </Text>
        <Text style={styles.timeText}>
          {formatTime(item.timestamp)}
        </Text>
      </View>
      
      <View style={styles.activityIcon}>
        <Text style={styles.iconText}>{getActivityIcon()}</Text>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>{getActivityIcon()}</Text>
      <Text style={styles.emptyTitle}>
        No {activityType}s yet
      </Text>
      <Text style={styles.emptySubtitle}>
        {activityType === 'like' 
          ? 'Be the first to like this SGTip!' 
          : 'Be the first to share this SGTip!'
        }
      </Text>
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              {title} ({activities.length})
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <CrossIcon strokeColor={colors.gray} />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View style={styles.content}>
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.buttonColor} />
                <Text style={styles.loadingText}>Loading {activityType}s...</Text>
              </View>
            ) : (
              <FlatList
                data={activities}
                renderItem={renderActivityItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                ListEmptyComponent={renderEmptyState}
                contentContainerStyle={styles.listContainer}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: Metrix.VerticalSize(20),
    borderTopRightRadius: Metrix.VerticalSize(20),
    maxHeight: '80%',
    minHeight: '50%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Metrix.HorizontalSize(20),
    paddingVertical: Metrix.VerticalSize(15),
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },
  headerTitle: {
    fontSize: Metrix.FontRegular,
    fontFamily: fonts.InterBold,
    color: colors.black,
  },
  closeButton: {
    padding: Metrix.HorizontalSize(5),
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Metrix.VerticalSize(40),
  },
  loadingText: {
    marginTop: Metrix.VerticalSize(10),
    fontSize: Metrix.FontSmall,
    fontFamily: fonts.InterRegular,
    color: colors.gray,
  },
  listContainer: {
    paddingBottom: Metrix.VerticalSize(20),
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Metrix.HorizontalSize(20),
    paddingVertical: Metrix.VerticalSize(12),
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor + '30',
  },
  userImageContainer: {
    marginRight: Metrix.HorizontalSize(12),
  },
  userImage: {
    width: Metrix.HorizontalSize(40),
    height: Metrix.HorizontalSize(40),
    borderRadius: Metrix.HorizontalSize(20),
  },
  defaultUserImage: {
    width: Metrix.HorizontalSize(40),
    height: Metrix.HorizontalSize(40),
    borderRadius: Metrix.HorizontalSize(20),
    backgroundColor: colors.borderColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultUserText: {
    fontSize: Metrix.FontSmall,
    fontFamily: fonts.InterBold,
    color: colors.buttonColor,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: Metrix.FontSmall,
    fontFamily: fonts.InterRegular,
    color: colors.black,
    lineHeight: Metrix.VerticalSize(20),
  },
  userName: {
    fontFamily: fonts.InterSemiBold,
    color: colors.black,
  },
  timeText: {
    fontSize: Metrix.FontExtraSmall,
    fontFamily: fonts.InterRegular,
    color: colors.gray,
    marginTop: Metrix.VerticalSize(2),
  },
  activityIcon: {
    marginLeft: Metrix.HorizontalSize(10),
  },
  iconText: {
    fontSize: Metrix.FontRegular,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Metrix.VerticalSize(60),
    paddingHorizontal: Metrix.HorizontalSize(40),
  },
  emptyIcon: {
    fontSize: Metrix.FontLarge * 2,
    marginBottom: Metrix.VerticalSize(20),
  },
  emptyTitle: {
    fontSize: Metrix.FontRegular,
    fontFamily: fonts.InterBold,
    color: colors.black,
    marginBottom: Metrix.VerticalSize(8),
  },
  emptySubtitle: {
    fontSize: Metrix.FontSmall,
    fontFamily: fonts.InterRegular,
    color: colors.gray,
    textAlign: 'center',
    lineHeight: Metrix.VerticalSize(20),
  },
});

export default SGTipActivityModal;
