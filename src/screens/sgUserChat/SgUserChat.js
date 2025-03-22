import React from 'react';
import { View, Text, TextInput, Image, FlatList, TouchableOpacity } from 'react-native';
import styles from './style';
import BackArrowIcon from '../../components/backArrowIcon/BackArrowIcon';
import NavBar from '../../components/navBar/NavBar';
import { Images, Metrix } from '../../config';
import { useNavigation } from '@react-navigation/native';


const chatData = [
  {
    id: 1,
    image: Images.homeProfile,
    name: "Ashley Simpson",
    lastMessage: "I want to ask...",
    timeAgo: "10m ago"
  },
  {
    id: 2,
    image: Images.homeProfile,
    name: "Tery Lance",
    lastMessage: "Ok Thanks.",
    timeAgo: "1h ago"
  },
  {
    id: 3,
    image: Images.homeProfile,
    name: "Stephen",
    lastMessage: "You: Great.",
    timeAgo: "23h ago"
  },
  {
    id: 4,
    image: Images.homeProfile,
    name: "Ashley Simpson",
    lastMessage: "Ok Thanks.",
    timeAgo: "10m ago"
  },
  {
    id: 5,
    image: Images.homeProfile,
    name: "Harryson",
    lastMessage: "Ok Thanks.",
    timeAgo: "23h ago"
  },
  {
    id: 6,
    image: Images.homeProfile,
    name: "Ashley Simpson",
    lastMessage: "You: Not yet.",
    timeAgo: "10m ago"
  },
]

export default function SgUserChat() {
  const navigation = useNavigation();

  const renderChatData = ({ item }) => {
    return (
      <TouchableOpacity 
        style={styles.chatBox}
        onPress={() => navigation.navigate('ChatDetail', {
          chatUser: {
            name: item.name,
            image: item.image
          },
          productInfo: {
            title: 'Gaming Chair',
            price: '180',
            image: Images.homePopularListing
          }
        })}
      >
        <View style={{flexDirection: "row", gap: Metrix.HorizontalSize(15)}}>
          <Image source={item.image} style={styles.chatImage} />
          <View>
            <Text style={styles.nameText}>{item.name}</Text>
            <Text style={styles.lastMessageText}>{item.lastMessage}
              <Text>{"  "}<View style={styles.dot}></View>{"  "}{item.timeAgo}</Text>
            </Text>
          </View>
        </View>

        <View style={styles.messageCount}>
          <Text style={styles.count}>1</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.chatContainer}>
      <View style={styles.topContainer}>
        <BackArrowIcon />
        <View style={styles.navBarContainer}>
          <Text style={styles.chatLogo}>Chat</Text>
          <NavBar />
        </View>

        <View style={styles.searchInputContainer}>
          <View style={styles.searchLogoContainer}>
            <Image source={Images.homeSearch} style={styles.searchLogo} />
          </View>
          <TextInput style={styles.searchInput} placeholder='Search for...' />
        </View>

        <FlatList 
          data={chatData}
          renderItem={renderChatData}
          keyExtractor={(item)=> item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
