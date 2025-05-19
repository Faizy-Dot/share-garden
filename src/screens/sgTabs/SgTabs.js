import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {  Images, Metrix } from "../../config";
import colors from "../../config/Colors";
import { AdsStackScreen, ItemsStackScreen, PostStackScreen, RewardsStackScreen, TipsStackScreen } from './SgTabsNavigator';
import {  AdsTabIcon, ItemsTabIcon, PostTabIcon, RewardsTabIcon, TipsTabIcon } from '../../assets/svg';

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
            iconSource = focused ? <PostTabIcon color={colors.buttonColor}/> : <PostTabIcon />;
          } else if (route.name === "Tips") {
            iconSource = focused ?  <TipsTabIcon color={colors.buttonColor}/> : <TipsTabIcon/>;
          } else if (route.name === "Items") {
            iconSource = focused ? <ItemsTabIcon color={colors.buttonColor}/> : <ItemsTabIcon/>;
          } else if (route.name === "Rewards") {
            iconSource = focused ?  <RewardsTabIcon color={colors.buttonColor}/>: <RewardsTabIcon/>;
          } else if (route.name === "Ads") {
            iconSource = focused ? <AdsTabIcon color={colors.buttonColor}/> : <AdsTabIcon/>;
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
    <Tab.Screen
  name="Post"
  component={PostStackScreen}
  listeners={({ navigation, route }) => ({
    tabPress: e => {
      const state = navigation.getState();
      const tab = state.routes.find(r => r.name === "Post");
      const nestedState = tab?.state;

      const isOnPostList = nestedState?.routes[nestedState.index]?.name === "PostList";

      if (!isOnPostList) {
        e.preventDefault(); // Prevent default tab behavior
        navigation.navigate("Post", {
          screen: "PostList" // <-- Reset to PostList screen
        });
      }
    
    }
  })}
/>
     <Tab.Screen
  name="Tips"
  component={TipsStackScreen}
  listeners={({ navigation }) => ({
    tabPress: e => {
      const state = navigation.getState();
      const tab = state.routes.find(r => r.name === "Tips");
      const nestedState = tab?.state;

      const isOnTipsList = nestedState?.routes[nestedState.index]?.name === "TipsList"; // Adjust screen name
      if (!isOnTipsList) {
        e.preventDefault();
        navigation.navigate("Tips", {
          screen: "TipsList"
        });
      }
    }
  })}
/>

      <Tab.Screen name="Items" component={ItemsStackScreen} 
       listeners={({ navigation }) => ({
    tabPress: e => {
      const state = navigation.getState();
      const tab = state.routes.find(r => r.name === "Items");
      const nestedState = tab?.state;

      const isOnTipsList = nestedState?.routes[nestedState.index]?.name === "TipsList"; // Adjust screen name
      if (!isOnTipsList) {
        e.preventDefault();
        navigation.navigate("Items", {
          screen: "ItemsList"
        });
      }
    }
  })} />
      <Tab.Screen name="Rewards" component={RewardsStackScreen}  
       listeners={({ navigation }) => ({
    tabPress: e => {
      const state = navigation.getState();
      const tab = state.routes.find(r => r.name === "Rewards");
      const nestedState = tab?.state;

      const isOnTipsList = nestedState?.routes[nestedState.index]?.name === "TipsList"; // Adjust screen name
      if (!isOnTipsList) {
        e.preventDefault();
        navigation.navigate("Rewards", {
          screen: "RewardsList"
        });
      }
    }
  })}/>
      <Tab.Screen name="Ads" component={AdsStackScreen} 
       listeners={({ navigation }) => ({
    tabPress: e => {
      const state = navigation.getState();
      const tab = state.routes.find(r => r.name === "Ads");
      const nestedState = tab?.state;

      const isOnTipsList = nestedState?.routes[nestedState.index]?.name === "TipsList"; // Adjust screen name
      if (!isOnTipsList) {
        e.preventDefault();
        navigation.navigate("Ads", {
          screen: "AdsList"
        });
      }
    }
  })}/>
    </Tab.Navigator>
  );
}