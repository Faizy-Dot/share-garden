import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MerchantCoupons from "./coupons/MerchantCoupons";
import MerchantAds from "./ads/MerchantAds";
import MerchantAdDetail from "./ads/MerchantAdDetail";
import MerchantTips from "./tips/MerchantTips";
import MerchantItems from "./items/MerchantItems";
import MerchantPostAD from "./PostAD/MerchantPostAD";
import PreviewMerchantAd from "./PostAD/PreviewMerchantAd";
// Remove this import since we're using MerchantAds instead
// Remove this import since we're using MerchantTips instead
import MerchantProfile from "../merchantProfile/MerchantProfile";


const ItemsStack = createNativeStackNavigator();

function MerchantItemsStackScreen() {
    return (
      <ItemsStack.Navigator screenOptions={{ headerShown: false }} >
        <ItemsStack.Screen name="MerchantItemsScreen" component={MerchantItems} />
        <ItemsStack.Screen name="MerchantProfileScreen" component={MerchantProfile} />
       
      </ItemsStack.Navigator>
    );
  }
  function MerchantCouponsStackScreen() {
    return (
      <ItemsStack.Navigator screenOptions={{ headerShown: false }}>
        <ItemsStack.Screen name="MerchantCouponsScreen" component={MerchantCoupons} />
        <ItemsStack.Screen name="MerchantProfileScreen" component={MerchantProfile} />
      </ItemsStack.Navigator>
    );
  }
  function MerchantPostADStackScreen() {
    return (
      <ItemsStack.Navigator screenOptions={{ headerShown: false }}>
        <ItemsStack.Screen name="MerchantPostADScreen" component={MerchantPostAD} />
        <ItemsStack.Screen name="MerchantPreviewADScreen" component={PreviewMerchantAd} />
       <ItemsStack.Screen name="MerchantProfileScreen" component={MerchantProfile} />
      </ItemsStack.Navigator>
    );
  }
  function MerchantAdsStackScreen() {
    return (
      <ItemsStack.Navigator screenOptions={{ headerShown: false }}>
        <ItemsStack.Screen name="MerchantAdsList" component={MerchantAds} />
        <ItemsStack.Screen name="MerchantAdDetail" component={MerchantAdDetail} />
        <ItemsStack.Screen name="MerchantProfileScreen" component={MerchantProfile} />
      </ItemsStack.Navigator>
    );
  }
  function MerchantTipsStackScreen() {
    return (
      <ItemsStack.Navigator screenOptions={{ headerShown: false }}>
        <ItemsStack.Screen name="MerchantTipsList" component={MerchantTips} />
         <ItemsStack.Screen name="MerchantProfileScreen" component={MerchantProfile} />
      </ItemsStack.Navigator>
    );
  }

export {MerchantItemsStackScreen,MerchantCouponsStackScreen,MerchantPostADStackScreen,MerchantAdsStackScreen,MerchantTipsStackScreen}