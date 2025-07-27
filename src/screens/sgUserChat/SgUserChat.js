import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './style';
import BackArrowIcon from '../../components/backArrowIcon/BackArrowIcon';
import NavBar from '../../components/navBar/NavBar';
import { Images, Metrix } from '../../config';
import colors from '../../config/Colors';
import { useNavigation } from '@react-navigation/native';
import axiosInstance from '../../config/axios';
import Toast from 'react-native-toast-message';
import fonts from '../../config/Fonts';

export default function SgUserChat() {
  const navigation = useNavigation();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchChats = async () => {
    try {
      const response = await axiosInstance.get('/api/chat/list');
      setChats(response.data);
      console.log("response.data:=>", response.data);
    } catch (error) {
      console.error('Error fetching chats:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to load chats'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  console.log("chats:=>", chats);

  const getInitialLetter = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  const renderChatData = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.chatBox}
        onPress={() => navigation.navigate('ChatDetail', {
          chatId: item.id,
          chatUser: {
            id: item.otherUser.id,
            name: `${item.otherUser.firstName} ${item.otherUser.lastName}`,
            image: item.otherUser.profileImage
          }
        })}
      >
        <View style={{ flexDirection: "row", gap: Metrix.HorizontalSize(15) }}>
          {item.otherUser.profileImage ? (
            <Image
              source={{ uri: item.otherUser.profileImage }}
              style={styles.chatImage}
            />
          ) : (
            <View style={{
              width: Metrix.HorizontalSize(32),
              height: Metrix.HorizontalSize(32),
              borderRadius: Metrix.HorizontalSize(20),
              backgroundColor: '#E8F3FF', // Light blue background
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text style={{
                fontSize: Metrix.FontLarge,
                fontFamily: fonts.InterBold,
                color: colors.buttonColor, // Using theme's button color
              }}>
                {getInitialLetter(item.otherUser.firstName)}
              </Text>
            </View>
          )}
          <View>
            <Text style={styles.nameText}>{`${item.otherUser.firstName} ${item.otherUser.lastName}`}</Text>
            <Text style={styles.lastMessageText}>
              {item.message}
              <Text>{"  "}<View style={styles.dot}></View>{"  "}{item.lastMessageTime}</Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.chatContainer}>
      <View style={styles.topContainer}>
        <BackArrowIcon />
        <View style={styles.navBarContainer}>
          <NavBar title={"Chats"}/>
        </View>

        <View style={styles.searchInputContainer}>
          <View style={styles.searchLogoContainer}>
            <Image source={Images.homeSearch} style={styles.searchLogo} />
          </View>
          <TextInput style={styles.searchInput} placeholder='Search for...' />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={colors.buttonColor} style={{ marginTop: 20 }} />
        ) : chats && chats.length > 0 ? (
          <FlatList
            data={chats}
            renderItem={renderChatData}
            keyExtractor={(item, index) => item.id?.toString() || index.toString()}
            showsVerticalScrollIndicator={false}
            onRefresh={fetchChats}
            refreshing={loading}
          />
        ) : (
          <Text style={styles.noChatText}>No Chats found</Text>
        )}

      </View>
    </View>
  );
}
