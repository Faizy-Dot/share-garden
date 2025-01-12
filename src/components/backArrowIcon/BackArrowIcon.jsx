import { Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { Images, Metrix } from "../../config";

export default function BackArrowIcon() {
  const navigation = useNavigation(); // Get the navigation object

  return (
    <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.8}>
      <Image
        source={Images.backArrowIcon}
        style={{
          width: Metrix.HorizontalSize(11),
          height: Metrix.VerticalSize(20),
        }}
      />
    </TouchableOpacity>
  );
}
