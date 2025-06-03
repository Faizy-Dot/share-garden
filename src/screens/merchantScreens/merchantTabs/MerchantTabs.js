import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MerchantAdsStackScreen, MerchantCouponsStackScreen, MerchantItemsStackScreen, MerchantPostADStackScreen, MerchantTipsStackScreen } from "./MerchantTabsNavigator";
import { AdsTabIcon, ItemsTabIcon, MerchantCouponIcon, PostTabIcon, TipsTabIcon } from "../../../assets/svg";
import { Metrix } from "../../../config";
import colors from "../../../config/Colors";
import fonts from "../../../config/Fonts";




const Tab = createBottomTabNavigator();

export default function MerchantTabNavigtor() {
    return (
        <Tab.Navigator
            initialRouteName="MerchantItems"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconSource;

                    if (route.name === "MerchantPostAD") {
                        iconSource = focused ? <PostTabIcon color={colors.buttonColor}/> : <PostTabIcon />;
                    } else if (route.name === "MerchantTips") {
                        iconSource = focused ? <TipsTabIcon color={colors.buttonColor}/> : <TipsTabIcon />;
                    } else if (route.name === "MerchantItems") {
                        iconSource = focused ? <ItemsTabIcon color={colors.buttonColor} /> : <ItemsTabIcon />
                    } else if (route.name === "MerchantCoupons") {
                        iconSource = focused ? <MerchantCouponIcon color={colors.buttonColor}/> : <MerchantCouponIcon />;
                    } else if (route.name === "MerchantAds") {
                        iconSource = focused ? <AdsTabIcon color={colors.buttonColor}/> : <AdsTabIcon />;
                    }

                    return iconSource
                },
                tabBarActiveTintColor: colors.buttonColor,
                tabBarInactiveTintColor: colors.black,
                tabBarStyle: {
                    height: Metrix.VerticalSize(65),
                    backgroundColor: colors.white,
                    paddingTop: Metrix.VerticalSize(5)
                },
                tabBarLabelStyle: {
                    fontSize: Metrix.normalize(11), // 👈 Change to your desired font size
                    fontFamily: fonts.InterSemiBold, // Optional: custom font
                },
            })}
        >
            <Tab.Screen name="MerchantPostAD" component={MerchantPostADStackScreen} options={{ tabBarLabel: "Post AD" }} />
            <Tab.Screen name="MerchantTips" component={MerchantTipsStackScreen} options={{ tabBarLabel: "Tips" }} />
            <Tab.Screen
                name="MerchantItems"
                component={MerchantItemsStackScreen}
                options={{ tabBarLabel: "Items" }}
            />
            <Tab.Screen name="MerchantCoupons" component={MerchantCouponsStackScreen} options={{ tabBarLabel: "Coupons" }} />
            <Tab.Screen name="MerchantAds" component={MerchantAdsStackScreen} options={{ tabBarLabel: "Ads" }} />
        </Tab.Navigator>
    )
}