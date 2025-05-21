import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MerchantHome from "./home/MerchantHome";
import MerchantCoupons from "./coupons/MerchantCoupons";
import MerchantOffers from "./offers/MerchantOffers";
import MerchantAds from "./ads/MerchantAds";
import MerchantAccount from "./account/MerchantAccount";


const ItemsStack = createNativeStackNavigator();

function MerchantHomeStackScreen() {
    return (
      <ItemsStack.Navigator screenOptions={{ headerShown: false }} >
        <ItemsStack.Screen name="MerchantHomeScreen" component={MerchantHome} />
       
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
  function MerchantOfferStackScreen() {
    return (
      <ItemsStack.Navigator screenOptions={{ headerShown: false }}>
        <ItemsStack.Screen name="MerchantOffersScreen" component={MerchantOffers} />
      
      </ItemsStack.Navigator>
    );
  }
  function MerchantAdsStackScreen() {
    return (
      <ItemsStack.Navigator screenOptions={{ headerShown: false }}>
        <ItemsStack.Screen name="MerchantAdsScreen" component={MerchantAds} />
       
      </ItemsStack.Navigator>
    );
  }
  function MerchantAccountStackScreen() {
    return (
      <ItemsStack.Navigator screenOptions={{ headerShown: false }}>
        <ItemsStack.Screen name="MerchantAccountScreen" component={MerchantAccount} />
       
      </ItemsStack.Navigator>
    );
  }

export {MerchantHomeStackScreen,MerchantCouponsStackScreen,MerchantOfferStackScreen,MerchantAdsStackScreen,MerchantAccountStackScreen}