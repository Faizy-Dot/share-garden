import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ItemsTabScreen from "./items/Items";
import ProductDetail from "./items/ProductDetail";
import PostTabScreen from "./post/Post";
import TipsTabScreen from "./tips/Tips";
import RewardsTabScreen from "./rewards/Rewards";
import AdsTabScreen from "./ads/Ads";
import Profile from "../profile/Profile";
import EditProfile from "../profile/editProfile/EditProfile";

const ItemsStack = createNativeStackNavigator();


function PostStackScreen() {
    return (
      <ItemsStack.Navigator screenOptions={{ headerShown: false }}>
        <ItemsStack.Screen name="PostList" component={PostTabScreen} />
        <ItemsStack.Screen name="Profile" component={Profile} />
        <ItemsStack.Screen name="EditProfile" component={EditProfile} />
      </ItemsStack.Navigator>
    );
  }
  function TipsStackScreen() {
    return (
      <ItemsStack.Navigator screenOptions={{ headerShown: false }}>
        <ItemsStack.Screen name="TipsList" component={TipsTabScreen} />
        <ItemsStack.Screen name="Profile" component={Profile} />
        <ItemsStack.Screen name="EditProfile" component={EditProfile} />
      </ItemsStack.Navigator>
    );
  }
  function ItemsStackScreen() {
    return (
      <ItemsStack.Navigator screenOptions={{ headerShown: false }}>
        <ItemsStack.Screen name="ItemsList" component={ItemsTabScreen} />
        <ItemsStack.Screen name="ProductDetail" component={ProductDetail} />
        <ItemsStack.Screen name="Profile" component={Profile} />
        <ItemsStack.Screen name="EditProfile" component={EditProfile} />
      </ItemsStack.Navigator>
    );
  }
  function RewardsStackScreen() {
    return (
      <ItemsStack.Navigator screenOptions={{ headerShown: false }}>
        <ItemsStack.Screen name="RewardsList" component={RewardsTabScreen} />
        <ItemsStack.Screen name="Profile" component={Profile} />
        <ItemsStack.Screen name="EditProfile" component={EditProfile} />
      </ItemsStack.Navigator>
    );
  }
  function AdsStackScreen() {
    return (
      <ItemsStack.Navigator screenOptions={{ headerShown: false }}>
        <ItemsStack.Screen name="AdsList" component={AdsTabScreen} />
        <ItemsStack.Screen name="Profile" component={Profile} />
        <ItemsStack.Screen name="EditProfile" component={EditProfile} />
      </ItemsStack.Navigator>
    );
  }

export {PostStackScreen,TipsStackScreen,ItemsStackScreen,RewardsStackScreen,AdsStackScreen}