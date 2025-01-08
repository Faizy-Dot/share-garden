import { Image, View } from "react-native";
import { Images, Metrix } from "../../config";




export default function BackArrowIcon(){
    return(
        <View>
            <Image source={Images.backArrowIcon} style = {{width : Metrix.HorizontalSize(11) , height : Metrix.VerticalSize(20)}}/>
        </View>
    )
}