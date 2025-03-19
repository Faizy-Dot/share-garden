import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PostTabScreen from "./post/Post";
import ItemsTabScreen from "./items/Items";
import RewardsTabScreen from "./rewards/Rewards";
import AdsTabScreen from "./ads/Ads";
import TipsTabScreen from "./tips/Tips";
import { Images, Metrix } from "../../config";
import colors from "../../config/Colors";
import { AdsStackScreen, ItemsStackScreen, PostStackScreen, RewardsStackScreen, TipsStackScreen } from './SgTabsNavigator';
import { AdsGreenTabIcon, AdsTabIcon, ItemsGreenTabIcon, ItemsTabIcon, PostGreenTabIcon, PostTabIcon, RewardsGreenTabIcon, RewardsTabIcon, TipsGreenTabIcon, TipsTabIcon } from '../../assets/svg';

const Tab = createBottomTabNavigator();



export default function SgTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Items"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconSource;

          if (route.name === "Post") {
            iconSource = focused ? <PostGreenTabIcon /> : <PostTabIcon />;
          } else if (route.name === "Tips") {
            iconSource = focused ? <TipsGreenTabIcon/> : <TipsTabIcon/>;
          } else if (route.name === "Items") {
            iconSource = focused ? <ItemsGreenTabIcon/> : <ItemsTabIcon/>;
          } else if (route.name === "Rewards") {
            iconSource = focused ? <RewardsGreenTabIcon/> : <RewardsTabIcon/>;
          } else if (route.name === "Ads") {
            iconSource = focused ? <AdsGreenTabIcon/> : <AdsTabIcon/>;
          }

          return iconSource
        },
        tabBarActiveTintColor: colors.buttonColor,
        tabBarInactiveTintColor: colors.black,
        tabBarStyle: {
          height: Metrix.VerticalSize(60),
          backgroundColor: colors.white,
          paddingTop: Metrix.VerticalSize(5)
        },
      })}
    >
      <Tab.Screen name="Post" component={PostStackScreen} />
      <Tab.Screen name="Tips" component={TipsStackScreen} />
      <Tab.Screen name="Items" component={ItemsStackScreen} />
      <Tab.Screen name="Rewards" component={RewardsStackScreen} />
      <Tab.Screen name="Ads" component={AdsStackScreen} />
    </Tab.Navigator>
  );
}