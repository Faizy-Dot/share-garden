import { FlatList, Image, Text, View } from "react-native";
import { styles } from "./styles";
import BackArrowIcon from "../../../components/backArrowIcon/BackArrowIcon";
import NavBar from "../../../components/navBar/NavBar";
import CustomInput from "../../../components/customInput/CustomInput";
import CategoryFlatList from "../../../components/categoryFlatList/CategoryFlatList";
import { Images, Metrix } from "../../../config";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";



const adsData = [
    {
        id: 1,
        image: Images.homePopularListing,
        title: "Nike Store",
        description: "Come visit us at new store to see new collection",
        location: "Newyork, ON"
    },
    {
        id: 2,
        image: Images.homePopularListing,
        title: "Leon Furniture",
        description: "30% off on Thanksgiving day sale",
        location: "Markham, ON"
    },
    {
        id: 3,
        image: Images.homePopularListing,
        title: "Mr. Lube",
        description: "20% off on oil change this week",
        location: "Oshawa, ON"
    },
]


export default function AdsTabScreen() {

    const renderAdsData = ({ item }) => {
        return (
            <View style={styles.adsDataContainer}>
                <Image source={item.image} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                    <View style = {styles.locationContainer}>
                        <View style={{flexDirection : "row",alignItems :"center",gap:Metrix.HorizontalSize(5)}}>
                            <Image source={Images.locationIcon} />
                            <Text style={styles.locationText}>{item.location}</Text>
                        </View>
                        <Image source={Images.adsSticker} />

                    </View>
                </View>
            </View>
        )
    }

    return (
        <KeyboardAwareScrollView style={styles.adsContainer}>
            <View style={styles.topContainer}>
                <View>
                    <BackArrowIcon />
                </View>

                <View>
                    <NavBar title={"Merchant Ads"} />
                </View>

                <View>
                    <CustomInput iconCondition={true} justifyContent={"space-between"} />
                </View>

                <View style={{ marginTop: Metrix.VerticalSize(10) }}>
                    <CategoryFlatList />
                </View>
            </View>

            <View style={styles.bottomContainer}>

                <FlatList data={adsData}
                    keyExtractor={(item) => item.id}
                    renderItem={renderAdsData}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.adsDataStyle} />
                    
                <FlatList data={adsData}
                    keyExtractor={(item) => item.id}
                    renderItem={renderAdsData}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.adsDataStyle} />

            </View>



        </KeyboardAwareScrollView>
    )
}