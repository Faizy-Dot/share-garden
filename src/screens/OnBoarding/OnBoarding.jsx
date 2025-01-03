import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Images } from '../../config';
import styles from './styles';

const { width, height } = Dimensions.get('window');

const onboardingData = [
  {
    id: '1',
    title: 'SIGN UP & GET POINTS',
    description: 'Create an account and receive a bonus amount of points to start shopping!',
    image: Images.onBoardFirst,
  },
  {
    id: '2',
    title: 'EXPLORE ITEMS AND ARTICLES',
    description: 'Explore our marketplace, find great deals on used goods, and use your points to purchase items.',
    image: Images.onBoardSecond,
  },
  {
    id: '3',
    title: 'BUY AND SELL GOODS',
    description: 'List your used goods, sell them to other users, and earn points to redeem more items.',
    image: Images.onBoardThird,
  },
  {
    id: '4',
    title: 'EARN POINTS AND LEVEL UP',
    description: 'Complete tasks, refer friends, and earn points to level up and unlock exclusive awards.',
    image: Images.onBoardFourth,
  },
];

const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null); // Reference to FlatList

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const renderItem = ({ item }) => (
    <View style={[styles.slide, { width }]}>
      <Image source={item.image} style={styles.image} />
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  const handleSkip = () => {
    if (currentIndex < onboardingData.length - 1) {
      const nextIndex = currentIndex + 1;
      flatListRef.current.scrollToOffset({
        offset: width * nextIndex,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    } else {
      navigation.navigate('GetStarted');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef} // Attach ref to FlatList
        data={onboardingData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
      />
      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
      {/* Skip Button */}
      <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={handleSkip}>
        <Text style={styles.buttonText}>
          Skip
        </Text>
      </TouchableOpacity>
      <Image
        source={Images.onBoardBottom}
style={styles.backgroundImage}
      />
    </View>
  );
};



export default OnboardingScreen;
