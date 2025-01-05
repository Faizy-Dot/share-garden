import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostTabScreen from "./post/Post";
import ItemsTabScreen from "./items/Items";
import RewardsTabScreen from "./rewards/Rewards";
import AdsTabScreen from "./ads/Ads";
import TipsTabScreen from "./tips/Tips"
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import { Images, Metrix } from "../../config";
import colors from "../../config/Colors";

const Tab = createBottomTabNavigator();

export default function SgTabNavigator() {
  const navigation = useNavigation()
    return (
      <Tab.Navigator
       initialRouteName="Items"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconSource;
  
            if (route.name === "Post") {
              iconSource = focused ? Images.postGreenTab : Images.postBlackTab;
            } else if (route.name === "Tips") {
              iconSource = focused ? Images.tipsGreenTab : Images.tipsBlackTab;
            } else if (route.name === "Items") {
              iconSource = focused ? Images.itemsGreenTab : Images.itemsBlackTab;
            } else if (route.name === "Rewards") {
              iconSource = focused ? Images.rewardsGreenTab : Images.rewardsBlackTab;
            } else if (route.name === "Ads") {
              iconSource = focused ? Images.adsGreenTab : Images.adsBlackTab;
            }
  
            return (
              <Image
                source={iconSource}
                style={{
                  width: Metrix.HorizontalSize(28), 
                  height: Metrix.VerticalSize(28), 
                  resizeMode: "contain",
                }}
              />
            );
          },
          tabBarActiveTintColor: '#00A676',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            height : Metrix.VerticalSize(60),    
            backgroundColor: colors.white,
            paddingTop : Metrix.VerticalSize(5) 
          },
        })}
      >
        <Tab.Screen name="Post" component={PostTabScreen} />
        <Tab.Screen name="Tips" component={TipsTabScreen} />
        <Tab.Screen name="Items" component={ItemsTabScreen} />
        <Tab.Screen name="Rewards" component={RewardsTabScreen} />
        <Tab.Screen name="Ads" component={AdsTabScreen} />
      </Tab.Navigator>
    );
  }
  