import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Images } from '../../config';

const { width, height } = Dimensions.get('window');

const onboardingData = [
  {
    id: '1',
    title: 'Welcome to Our App',
    description: 'Discover new features and exciting opportunities.',
    image: Images.logo, // Replace with your image file
  },
  {
    id: '2',
    title: 'Stay Connected',
    description: 'Keep in touch with your friends and family anytime.',
    image: Images.logo, // Replace with your image file
  },
  {
    id: '3',
    title: 'Achieve Your Goals',
    description: 'Track your progress and achieve your dreams.',
    image: Images.logo, // Replace with your image file
  },
  {
    id: '4',
    title: 'Get Started Now',
    description: 'Sign up and enjoy our amazing services today.',
    image: Images.logo, // Replace with your image file
  },
];

const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const renderItem = ({ item }) => (
    <View style={[styles.slide, { width }]}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
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
      {/* Skip/Next Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (currentIndex < onboardingData.length - 1) {
            setCurrentIndex(currentIndex + 1);
          } else {
            navigation.navigate('Login'); // Replace 'Home' with your target screen
          }
        }}
      >
        <Text style={styles.buttonText}>
          {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 0.8,
    height: height * 0.5,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    paddingHorizontal: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#007BFF',
  },
  inactiveDot: {
    backgroundColor: '#ccc',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default OnboardingScreen;
