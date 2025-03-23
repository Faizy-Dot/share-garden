import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Image, FlatList, TouchableOpacity } from 'react-native';
import { Images, Metrix } from '../../config';
import BackArrowIcon from '../../components/backArrowIcon/BackArrowIcon';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './chatDetailStyle';
import fonts from '../../config/Fonts';

const messages = [
  {
    id: 1,
    text: "Please share account details",
    time: "7:00 PM",
    isSender: false
  },
  {
    id: 2,
    text: "Sure! We offer a full range of laundry services.",
    time: "7:02 PM",
    isSender: true
  },
  {
    id: 3,
    text: "That is great! What are your prices like?",
    time: "7:22 PM",
    isSender: false
  },
  {
    id: 4,
    text: "Our prices are very competitive.",
    time: "7:30 PM",
    isSender: true
  },
  {
    id: 5,
    text: "Great! I'll place an order online now.",
    time: "12:25 PM",
    isSender: false
  },
  {
    id: 6,
    text: "Thanks for your help!",
    time: "12:25 PM",
    isSender: false
  },
  {
    id: 7,
    text: "You're welcome! We're happy to help.",
    time: "12:29 PM",
    isSender: true
  }
];

const ChatDetail = ({ route, navigation }) => {
  const { chatUser, productInfo } = route.params;
  const [message, setMessage] = useState('');
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [userScrolled, setUserScrolled] = useState(false);
  const flatListRef = useRef(null);

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  const handleScroll = (event) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const distanceFromBottom = contentSize.height - (contentOffset.y + layoutMeasurement.height);
    
    // If user has scrolled up more than 50 pixels from bottom
    if (distanceFromBottom > 50) {
      setShowScrollButton(true);
      setUserScrolled(true);
    } else {
      setShowScrollButton(false);
      setUserScrolled(false);
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageContainer,
      item.isSender ? styles.senderMessage : styles.receiverMessage
    ]}>
      <Text style={[
        styles.messageText,
        item.isSender ? styles.senderText : styles.receiverText
      ]}>
        {item.text}
      </Text>
      <Text style={[
        styles.messageTime,
        item.isSender ? styles.senderTime : styles.receiverTime
      ]}>
        {item.time}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackArrowIcon />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Chat</Text>
          <View style={styles.productInfo}>
            <Image 
              source={productInfo?.image || Images.homePopularListing} 
              style={styles.productImage} 
            />
            <Text style={styles.productTitle}>{productInfo?.title || 'Gaming Chair'}</Text>
            <Text style={styles.productPrice}>$ {productInfo?.price || '180'}</Text>
          </View>
        </View>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => {
          if (!userScrolled) {
            scrollToBottom();
          }
        }}
        onLayout={() => scrollToBottom()}
        onScroll={handleScroll}
        scrollEventThrottle={400}
      />

      {showScrollButton && (
        <TouchableOpacity 
          style={styles.scrollButton}
          onPress={scrollToBottom}
        >
          <Icon name="arrow-downward" size={24} color="#fff" />
        </TouchableOpacity>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Message..."
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <TouchableOpacity 
          style={styles.sendButton}
          onPress={() => {
            // Handle send message
            setMessage('');
          }}
        >
          <Image source={Images.callIcon} style={styles.callIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatDetail; 