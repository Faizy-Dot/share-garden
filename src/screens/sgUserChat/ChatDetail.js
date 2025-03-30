import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Images, Metrix } from '../../config';
import BackArrowIcon from '../../components/backArrowIcon/BackArrowIcon';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './chatDetailStyle';
import fonts from '../../config/Fonts';
import colors from '../../config/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../../store/actions/chatActions';
import moment from 'moment';
import { ChevronRightIcon } from '../../assets/svg';
import axiosInstance from '../../config/axios';
import io from 'socket.io-client';
import { BASE_URL } from '../../config/constants';

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackArrowIcon />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <View style={styles.userInfo}>
            {getChatUserInfo().image ? (
              <Image 
                source={{ uri: getChatUserInfo().image }} 
                style={styles.userImage} 
              />
            ) : (
              <View style={{
                width: Metrix.HorizontalSize(40),
                height: Metrix.HorizontalSize(40),
                borderRadius: Metrix.HorizontalSize(20),
                backgroundColor: '#E8F3FF',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: Metrix.HorizontalSize(10)
              }}>
                <Text style={{
                  fontSize: Metrix.FontMedium,
                  fontFamily: fonts.InterBold,
                  color: colors.buttonColor,
                }}>
                  {getInitialLetter(getChatUserInfo().name?.split(' ')[0])}
                </Text>
              </View>
            )}
            <Text style={styles.headerTitle}>{getChatUserInfo().name}</Text>
          </View>
          <View style={styles.productInfo}>
            <Image 
              source={
                getProductInfo().image 
                  ? { uri: getProductInfo().image } 
                  : Images.homePopularListing
              } 
              style={styles.productImage} 
            />
            <Text style={styles.productTitle}>{getProductInfo().title}</Text>
            <Text style={styles.productPrice}>$ {getProductInfo().price}</Text>
          </View>
        </View>
      </View>

      {isLoadingMessages ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.buttonColor} />
        </View>
      ) : (
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
          ListEmptyComponent={() => (
            <View style={styles.emptyMessageContainer}>
              <Text style={styles.emptyMessageText}>No messages yet. Start a conversation!</Text>
            </View>
          )}
        />
      )}

      {showScrollButton && (
        <TouchableOpacity 
          style={styles.scrollButton}
          onPress={scrollToBottom}
        >
          <Text style={{ fontSize: 20, color: colors.black }}>›</Text>
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
          style={[styles.sendButton, isSending && styles.sendButtonDisabled]}
          onPress={handleSendMessage}
          disabled={isSending}
        >
          {isSending ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Icon name="chevron-right" size={20} color={colors.black} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatDetail; 