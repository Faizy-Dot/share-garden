import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MerchantCoupons from "./coupons/MerchantCoupons";
import MerchantAds from "./ads/MerchantAds";
import MerchantTips from "./tips/MerchantTips";
import MerchantItems from "./items/MerchantItems";
import MerchantPostAD from "./PostAD/MerchantPostAD";
import PreviewMerchantAd from "./PostAD/PreviewMerchantAd";
import AdsTabScreen from "../../sgTabs/ads/Ads";
import TipsTabScreen from "../../sgTabs/tips/Tips";


const ItemsStack = createNativeStackNavigator();

function MerchantItemsStackScreen() {
    return (
      <ItemsStack.Navigator screenOptions={{ headerShown: false }} >
        <ItemsStack.Screen name="MerchantItemsScreen" component={MerchantItems} />
       
      </ItemsStack.Navigator>
    );
  }
  function MerchantCouponsStackScreen() {
    return (
      <ItemsStack.Navigator screenOptions={{ headerShown: false }}>
        <ItemsStack.Screen name="MerchantCouponsScreen" component={MerchantCoupons} />
       
      </ItemsStack.Navigator>
    );
  }
  function MerchantPostADStackScreen() {
    return (
      <ItemsStack.Navigator screenOptions={{ headerShown: false }}>
        <ItemsStack.Screen name="MerchantPostADScreen" component={MerchantPostAD} />
        <ItemsStack.Screen name="MerchantPreviewADScreen" component={PreviewMerchantAd} />
      
      </ItemsStack.Navigator>
    );
  }
  function MerchantAdsStackScreen() {
    return (
      <ItemsStack.Navigator screenOptions={{ headerShown: false }}>
        <ItemsStack.Screen name="AdsList" component={AdsTabScreen} />
       
      </ItemsStack.Navigator>
    );
  }
  function MerchantTipsStackScreen() {
    return (
      <ItemsStack.Navigator screenOptions={{ headerShown: false }}>
        <ItemsStack.Screen name="TipsList" component={TipsTabScreen} />
      </ItemsStack.Navigator>
    );
  }

export {MerchantItemsStackScreen,MerchantCouponsStackScreen,MerchantPostADStackScreen,MerchantAdsStackScreen,MerchantTipsStackScreen}