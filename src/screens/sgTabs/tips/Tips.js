import { FlatList, Image, Text, View } from "react-native";
import styles from "./styles";
import BackArrowIcon from "../../../components/backArrowIcon/BackArrowIcon";
import NavBar from "../../../components/navBar/NavBar";
import { Images, Metrix } from "../../../config";
import CustomInput from "../../../components/customInput/CustomInput";
import DropdownComponent from "../../../components/dropDown/DropDownInput";
import fonts from "../../../config/Fonts";
import colors from "../../../config/Colors";
import { LikesIcon, ShareIcon, TimeIcon, ViewsIcon } from "../../../assets/svg";

export default function TipsTabScreen() {

    const categoriesData = [
        {
            id: 1,
            title: "How to repair and upcycle old clothes",
            description: "Give old clothes a new life! Repair, upcycle, or repurpose them to reduce waste, save money, and unleash your creativity!",
            views: 164,
            likes: 378,
            shared: 20,
            time: 20,
            image: Images.homePopularListing
        },
        {
            id: 2,
            title: "How to repair and upcycle old clothes",
            description: "Give old clothes a new life! Repair, upcycle, or repurpose them to reduce waste, save money, and unleash your creativity!",
            views: 164,
            likes: 378,
            shared: 20,
            time: 20,
            image: Images.homePopularListing
        },
        {
            id: 3,
            title: "How to repair and upcycle old clothes",
            description: "Give old clothes a new life! Repair, upcycle, or repurpose them to reduce waste, save money, and unleash your creativity!",
            views: 164,
            likes: 378,
            shared: 20,
            time: 20,
            image: Images.homePopularListing
        },
        {
            id: 4,
            title: "How to repair and upcycle old clothes",
            description: "Give old clothes a new life! Repair, upcycle, or repurpose them to reduce waste, save money, and unleash your creativity!",
            views: 164,
            likes: 378,
            shared: 20,
            time: 20,
            image: Images.homePopularListing
        },
        {
            id: 5,
            title: "How to repair and upcycle old clothes",
            description: "Give old clothes a new life! Repair, upcycle, or repurpose them to reduce waste, save money, and unleash your creativity!",
            views: 164,
            likes: 378,
            shared: 20,
            time: 20,
            image: Images.homePopularListing
        },
    ]


    const renderCategory = ({ item }) => {
        return (
            <View style={styles.categoryContainer}>
                <View style={{ flexDirection: "row", padding: 20, gap: Metrix.HorizontalSize(15), width: "100%" }}>
                    <Image source={item.image} style={{ width: Metrix.HorizontalSize(119), height: Metrix.HorizontalSize(116), }} />
                    <View style={{ width: Metrix.HorizontalSize(200), gap: 10, height: Metrix.VerticalSize(116) }}>
                        <Text style={{ fontSize: Metrix.FontSmall, fontFamily: fonts.InterSemiBold, color: colors.buttonColor }}>{item.title}</Text>
                        <Text style={{ fontSize: Metrix.FontExtraSmall, fontFamily: fonts.InterRegular, }}>{item.description}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                    <View style={{ flexDirection: "row", gap: 5 }}>
                        <ViewsIcon />
                        <Text>{item.views} Views</Text>
                    </View>
                    <View style={{ flexDirection: "row", gap: 5 }}>
                        <LikesIcon />
                        <Text>{item.likes} Likes</Text>
                    </View>
                    <View style={{ flexDirection: "row", gap: 5 }}>
                        <ShareIcon />
                        <Text>{item.shared} Shared</Text>
                    </View>
                    <View style={{ flexDirection: "row", gap: 5 }}>
                        <TimeIcon />
                        <Text>{item.time} h</Text>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.tipsContainer}>
            <View>
                <BackArrowIcon />
            </View>

            <View style={{ marginTop: Metrix.VerticalSize(7) }}>
                <NavBar title={"Explore SG Tips"} />
            </View>

            <View style={{ marginTop: Metrix.VerticalSize(22), gap: 10 }}>

                <View>
                    <CustomInput iconCondition={false} />
                </View>

                <View>
                    <DropdownComponent
                        placeholder={"Select Category"} />
                </View>

                <FlatList
                    data={categoriesData}
                    renderItem={renderCategory}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.categoryList}
                    showsVerticalScrollIndicator={false}
                />




            </View>


        </View>
    )
}