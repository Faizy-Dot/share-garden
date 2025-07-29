import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Image, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Images, Metrix } from '../../config';
import BackArrowIcon from '../../components/backArrowIcon/BackArrowIcon';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './chatDetailStyle';
import fonts from '../../config/Fonts';
import colors from '../../config/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../../store/actions/chatActions';
import moment from 'moment';
import { CashIcon, ChevronRightIcon, EmojiIcon, NotificationIcon } from '../../assets/svg';
import axiosInstance from '../../config/axios';
import io from 'socket.io-client';
import { BASE_URL } from '../../config/constants';
import NavBar from '../../components/navBar/NavBar';
import { images } from '../../assets';
import EmojiSelector, { Categories } from 'react-native-emoji-selector';


const getInitialLetter = (name) => {
  return name ? name.charAt(0).toUpperCase() : '?';
};

const ChatDetail = ({ route, navigation }) => {
  const { chatUser, productInfo } = route.params || {};
  const [message, setMessage] = useState('');
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [userScrolled, setUserScrolled] = useState(false);
  const flatListRef = useRef(null);
  const socketRef = useRef(null);
  const { user } = useSelector(state => state.login);
  const [messages, setMessages] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Get the correct user ID based on the chatUser object structure
  const getChatUserId = () => {
    if (!chatUser) {
      console.error('Chat user data is missing');
      return null;
    }
    // Handle different possible structures of chatUser
    const userId = chatUser.id || chatUser.userId || chatUser._id;
    if (!userId) {
      console.error('Chat user ID is missing');
      return null;
    }
    return userId;
  };

  // Get the correct product info
  const getProductInfo = () => {
    if (!productInfo) {
      return {
        title: 'Product',
        price: '0',
        image: null
      };
    }
    return {
      title: productInfo.title || 'Product',
      price: productInfo.price || '0',
      image: productInfo.image || null
    };
  };

  // Get the correct chat user info
  const getChatUserInfo = () => {
    if (!chatUser) {
      return {
        name: 'Chat',
        image: null
      };
    }
    return {
      name: chatUser.name || 'Chat',
      image: chatUser.image || null
    };
  };

  useEffect(() => {
    const chatUserId = getChatUserId();
    if (!chatUserId) {
      console.error('Invalid chat user data');
      return;
    }

    socketRef.current = io(BASE_URL, {
      transports: ['websocket'],
      path: '/socket.io',
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });

    // Add connection event listeners
    socketRef.current.on('connect', () => {
      console.log('Socket connected successfully');
      // Join personal room after connection
      socketRef.current.emit('join', user.id);
    });

    socketRef.current.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    socketRef.current.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
    });

    // Only listen for one type of message event
    socketRef.current.on('private message', handleNewMessage);

    return () => {
      if (socketRef.current) {
        socketRef.current.off('private message', handleNewMessage);
        socketRef.current.disconnect();
      }
    };
  }, [getChatUserId(), user.id]);

  const handleNewMessage = (newMessage) => {
    console.log('Received message:', newMessage);
    const chatUserId = getChatUserId();
    // Check if message is related to current chat
    if (newMessage.senderId === chatUserId || newMessage.receiverId === chatUserId) {
      const formattedMessage = {
        id: newMessage.id,
        text: newMessage.message,
        time: moment(newMessage.createdAt).format('h:mm A'),
        isSender: newMessage.senderId === user.id
      };

      setMessages(prevMessages => {
        // Check if we have a temporary message with the same text
        const hasTempMessage = prevMessages.some(msg =>
          msg.id.startsWith('temp-') &&
          msg.text === newMessage.message &&
          msg.isSender === (newMessage.senderId === user.id)
        );

        if (hasTempMessage) {
          // Replace the temporary message with the real one
          return prevMessages.map(msg =>
            msg.id.startsWith('temp-') &&
              msg.text === newMessage.message &&
              msg.isSender === (newMessage.senderId === user.id)
              ? formattedMessage
              : msg
          );
        } else {
          // If no temporary message found, add the new message
          return [...prevMessages, formattedMessage];
        }
      });

      if (!userScrolled) {
        scrollToBottom();
      }
    }
  };

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  const handleScroll = (event) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const distanceFromBottom = contentSize.height - (contentOffset.y + layoutMeasurement.height);

    if (distanceFromBottom > 50) {
      setShowScrollButton(true);
      setUserScrolled(true);
    } else {
      setShowScrollButton(false);
      setUserScrolled(false);
    }
  };

  console.log("Chat User ID", getChatUserId());

  const fetchChatHistory = async () => {
    try {
      setIsLoadingMessages(true);
      const chatUserId = getChatUserId();
      if (!chatUserId) {
        console.error('Invalid chat user data');
        return;
      }

      const response = await axiosInstance.get(`/api/chat/${chatUserId}`);

      const formattedMessages = response.data.map(msg => ({
        id: msg.id,
        text: msg.message,
        time: moment(msg.createdAt).format('h:mm A'),
        isSender: msg.isSentByMe
      }));

      formattedMessages.sort((a, b) =>
        moment(a.createdAt).valueOf() - moment(b.createdAt).valueOf()
      );

      setMessages(formattedMessages);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  useEffect(() => {
    fetchChatHistory();
  }, [getChatUserId()]);

  const handleSendMessage = async () => {
    if (!message.trim() || isSending) return;

    setIsSending(true);
    setShowEmojiPicker(false);

    try {
      const chatUserId = getChatUserId();
      if (!chatUserId) {
        console.error('Invalid chat user data');
        return;
      }

      const tempId = `temp-${new Date().getTime()}`;
      const newMessage = {
        text: message.trim(),
        time: moment().format('h:mm A'),
        isSender: true,
        id: tempId,
      };

      // Add message to local state with temporary ID
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setMessage('');
      if (!userScrolled) {
        scrollToBottom();
      }

      const response = await axiosInstance.post('/api/chat/send', {
        receiverId: chatUserId,
        message: newMessage.text
      });

      // No need to update the message here as it will be handled by the socket
    } catch (error) {
      console.error('Failed to send message:', error);
      // Remove the temporary message if sending fails
      setMessages(prevMessages =>
        prevMessages.filter(msg => msg.id !== tempId)
      );
    } finally {
      setIsSending(false);
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

  const renderChatHeader = () => (
    <View style={styles.chatHeader}>
      <Image
        source={{ uri: chatUser.image }} // Replace with your actual image URL or source
        style={styles.chatUserImage}
      />
      <Text style={styles.chatUserName}>{chatUser.name}</Text>
      <NotificationIcon stroke={colors.buttonColor} />
    </View>
  );



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.navbarContainer}>
          <BackArrowIcon />
          <NavBar title={"Chats"} />
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.productInfoContainer}>
            <Image source={Images.homePopularListing} style={styles.productImage} />
            <Text style={styles.infoText}>7 Seater Sofa Set</Text>
          </View>
          <View style={[styles.productInfoContainer, { gap: 5 }]}>
            <CashIcon />
            <Text style={[styles.infoText, { color: colors.buttonColor }]}>2200</Text>
          </View>
        </View>

      </View>

      {isLoadingMessages ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.buttonColor} />
        </View>
      ) : (
        <View style={{ flex: 1, paddingHorizontal: Metrix.HorizontalSize(15) }}>

          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={[styles.messagesList, { flexGrow: 1 }]}
            onContentSizeChange={() => {
              if (!userScrolled) {
                scrollToBottom();
              }
            }}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={renderChatHeader}
            onLayout={() => scrollToBottom()}
            stickyHeaderIndices={[0]}
            onScroll={handleScroll}
            scrollEventThrottle={400}
            ListEmptyComponent={() => (
              <View style={styles.emptyMessageContainer}>
                <Text style={styles.emptyMessageText}>No messages yet. Start a conversation!</Text>
              </View>
            )}
          />
        </View>
      )}



      <View style={styles.inputContainer}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => setShowEmojiPicker(prev => !prev)} style={styles.emojiButton}>
          <EmojiIcon />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Message..."
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <TouchableOpacity
          style={[styles.sendButton, isSending && styles.sendButtonDisabled]}
          onPress={handleSendMessage}
          disabled={isSending}
        >
          {isSending ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Icon name="chevron-right" size={30} color={colors.buttonColor} />
          )}
        </TouchableOpacity>
      
      </View>
        {showEmojiPicker && (
          <EmojiSelector
            onEmojiSelected={emoji => setMessage(prev => prev + emoji)}
            showSearchBar={false}
            showTabs={true}
            category={Categories.all}
            columns={8}
            style={{ height: 250 }}
          />
        )}
    </View>
  );
};

export default ChatDetail; 