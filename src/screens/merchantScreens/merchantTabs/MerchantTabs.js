import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MerchantAccountStackScreen, MerchantAdsStackScreen, MerchantCouponsStackScreen, MerchantHomeStackScreen, MerchantOfferStackScreen } from "./MerchantTabsNavigator";
import { AdsTabIcon, MerchantAccountIcon, MerchantCouponIcon, MerchantHomeIcon, MerchantOfferIcon, SgTipsIcon } from "../../../assets/svg";
import { Metrix } from "../../../config";
import colors from "../../../config/Colors";
import { Text, View } from "react-native";
import fonts from "../../../config/Fonts";




const Tab = createBottomTabNavigator();

export default function MerchantTabNavigtor() {
    return (
        <Tab.Navigator
            initialRouteName="MerchantOffers"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconSource;

                    if (route.name === "MerchantHome") {
                        iconSource = focused ? <MerchantHomeIcon /> : <MerchantHomeIcon />;
                    } else if (route.name === "MerchantCoupons") {
                        iconSource = focused ? <MerchantCouponIcon /> : <MerchantCouponIcon />;
                    } else if (route.name === "MerchantOffers") {
                        iconSource = focused ? <MerchantOfferIcon/> : <MerchantOfferIcon/>
                    } else if (route.name === "MerchantAds") {
                        iconSource = focused ? <AdsTabIcon /> : <AdsTabIcon />;
                    } else if (route.name === "MerchantAccount") {
                        iconSource = focused ? <MerchantAccountIcon /> : <MerchantAccountIcon />;
                    }

                    return iconSource
                },
                tabBarActiveTintColor: colors.buttonColor,
                tabBarInactiveTintColor: colors.black,
                tabBarStyle: {
                    height: Metrix.VerticalSize(90),
                    backgroundColor: colors.white,
                    paddingTop: Metrix.VerticalSize(30),
                },
            })}
        >
            <Tab.Screen name="MerchantHome" component={MerchantHomeStackScreen} options={{ tabBarLabel: "Home" }} />
            <Tab.Screen name="MerchantCoupons" component={MerchantCouponsStackScreen} options={{ tabBarLabel: "Coupons" }} />
            <Tab.Screen
                name="MerchantOffers"
                component={MerchantOfferStackScreen}
                options={{
                    tabBarIcon: () => (
                        <View style={{ paddingBottom: Metrix.VerticalSize(35) }}>
                            <MerchantOfferIcon />
                        </View>
                    ),
                    tabBarLabel: ({ color }) => (
                        <Text
                            style={{
                                fontSize: Metrix.FontSmall,
                                fontFamily: fonts.InterBold,
                                color: color,
                                position : "relative",
                                bottom : Metrix.VerticalSize(5)
                            }}
                        >
                            Offers
                        </Text>
                    ),
                }}
            />
            <Tab.Screen name="MerchantAds" component={MerchantAdsStackScreen} options={{ tabBarLabel: "Ads" }} />
            <Tab.Screen name="MerchantAccount" component={MerchantAccountStackScreen} options={{ tabBarLabel: "Account" }} />
        </Tab.Navigator>
    )
}