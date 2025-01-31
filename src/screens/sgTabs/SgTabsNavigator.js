import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ItemsTabScreen from "./items/Items";
import ProductDetail from "./items/ProductDetail";
import PostTabScreen from "./post/Post";
import TipsTabScreen from "./tips/Tips";
import RewardsTabScreen from "./rewards/Rewards";
import AdsTabScreen from "./ads/Ads";
import Profile from "../profile/Profile";
import EditProfile from "../profile/editProfile/EditProfile";
import SgUserNotification from "../sgUserNotifcation/SgUserNotification";
import SgUserChat from "../sgUserChat/SgUserChat";
import EarnSGpts from "../profile/earnSGpts/EarnSGpts";
import MySGItems from "../profile/mySGItems/MySGItems";
import MyBids from "../profile/myBids/MyBids";
import MySGTips from "../profile/mySGtips/MySGTips";
import Reviews from "../profile/reviews/Reviews";
import Settings from "../profile/settings/Settings";
import HelpAndSupport from "../profile/helpAndsupport/HelpAndSupport";
import Preview from "./post/preview/Preview";


const ItemsStack = createNativeStackNavigator();

function PostStackScreen() {
    return (
      <ItemsStack.Navigator screenOptions={{ headerShown: false }}>
        <ItemsStack.Screen name="PostList" component={PostTabScreen} />
        <ItemsStack.Screen name="Profile" component={Profile} />
        <ItemsStack.Screen name="EditProfile" component={EditProfile} />
        <ItemsStack.Screen name="SgUserNotification" component={SgUserNotification} />
        <ItemsStack.Screen name="SgUserChat" component={SgUserChat} />
        <ItemsStack.Screen name="EarnSGpts" component={EarnSGpts} />
        <ItemsStack.Screen name="MySGItems" component={MySGItems} />
        <ItemsStack.Screen name="MyBids" component={MyBids} />
        <ItemsStack.Screen name="Preview" component={Preview} />
      </ItemsStack.Navigator>
    );
  }
  function TipsStackScreen() {
    return (
      <ItemsStack.Navigator screenOptions={{ headerShown: false }}>
        <ItemsStack.Screen name="TipsList" component={TipsTabScreen} />
        <ItemsStack.Screen name="Profile" component={Profile} />
        <ItemsStack.Screen name="EditProfile" component={EditProfile} />
        <ItemsStack.Screen name="SgUserNotification" component={SgUserNotification} />
        <ItemsStack.Screen name="SgUserChat" component={SgUserChat} />
        <ItemsStack.Screen name="EarnSGpts" component={EarnSGpts} />
        <ItemsStack.Screen name="MySGItems" component={MySGItems} />
         <ItemsStack.Screen name="MyBids" component={MyBids} />
         <ItemsStack.Screen name="MySGTips" component={MySGTips} />
         <ItemsStack.Screen name="Reviews" component={Reviews} />
         <ItemsStack.Screen name="Settings" component={Settings} />
         <ItemsStack.Screen name="HelpAndSupport" component={HelpAndSupport} />
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
        <ItemsStack.Screen name="SgUserNotification" component={SgUserNotification} />
        <ItemsStack.Screen name="SgUserChat" component={SgUserChat} />
        <ItemsStack.Screen name="EarnSGpts" component={EarnSGpts} />
        <ItemsStack.Screen name="MySGItems" component={MySGItems} />
         <ItemsStack.Screen name="MyBids" component={MyBids} />
         <ItemsStack.Screen name="MySGTips" component={MySGTips} />
         <ItemsStack.Screen name="Reviews" component={Reviews} />
         <ItemsStack.Screen name="Settings" component={Settings} />
         <ItemsStack.Screen name="HelpAndSupport" component={HelpAndSupport} />
      </ItemsStack.Navigator>
    );
  }
  function RewardsStackScreen() {
    return (
      <ItemsStack.Navigator screenOptions={{ headerShown: false }}>
        <ItemsStack.Screen name="RewardsList" component={RewardsTabScreen} />
        <ItemsStack.Screen name="Profile" component={Profile} />
        <ItemsStack.Screen name="EditProfile" component={EditProfile} />
        <ItemsStack.Screen name="SgUserNotification" component={SgUserNotification} />
        <ItemsStack.Screen name="SgUserChat" component={SgUserChat} />
        <ItemsStack.Screen name="EarnSGpts" component={EarnSGpts} />
        <ItemsStack.Screen name="MySGItems" component={MySGItems} />
         <ItemsStack.Screen name="MyBids" component={MyBids} />
         <ItemsStack.Screen name="MySGTips" component={MySGTips} />
         <ItemsStack.Screen name="Reviews" component={Reviews} />
         <ItemsStack.Screen name="Settings" component={Settings} />
         <ItemsStack.Screen name="HelpAndSupport" component={HelpAndSupport} />
      </ItemsStack.Navigator>
    );
  }
  function AdsStackScreen() {
    return (
      <ItemsStack.Navigator screenOptions={{ headerShown: false }}>
        <ItemsStack.Screen name="AdsList" component={AdsTabScreen} />
        <ItemsStack.Screen name="Profile" component={Profile} />
        <ItemsStack.Screen name="EditProfile" component={EditProfile} />
        <ItemsStack.Screen name="SgUserNotification" component={SgUserNotification} />
        <ItemsStack.Screen name="SgUserChat" component={SgUserChat} />
        <ItemsStack.Screen name="EarnSGpts" component={EarnSGpts} />
        <ItemsStack.Screen name="MySGItems" component={MySGItems} />
         <ItemsStack.Screen name="MyBids" component={MyBids} />
         <ItemsStack.Screen name="MySGTips" component={MySGTips} />
         <ItemsStack.Screen name="Reviews" component={Reviews} />
         <ItemsStack.Screen name="Settings" component={Settings} />
         <ItemsStack.Screen name="HelpAndSupport" component={HelpAndSupport} />
      </ItemsStack.Navigator>
    );
  }

export {PostStackScreen,TipsStackScreen,ItemsStackScreen,RewardsStackScreen,AdsStackScreen}