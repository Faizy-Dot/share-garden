import { StyleSheet } from "react-native";
import { Metrix } from "../../config";
import colors from "../../config/Colors";



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.onBoardColor,
    },
    slide: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: Metrix.VerticalSize(50),
      marginTop: Metrix.VerticalSize(55)
  
    },
    image: {
      width: Metrix.HorizontalSize(118),
      height: Metrix.VerticalSize(113),
      resizeMode: 'contain',
      marginBottom: Metrix.VerticalSize(20),
    },
    title: {
      fontSize: Metrix.FontLarge,
      fontWeight: 'bold',
      textAlign: 'center',
      color: colors.white,
      marginBottom: Metrix.VerticalSize(10),
    },
    description: {
      fontSize: Metrix.FontMedium,
      lineHeight: Metrix.VerticalSize(25),
      textAlign: 'center',
      color: colors.white,
      width: Metrix.HorizontalSize(330),
    },
    pagination: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: Metrix.VerticalSize(10),
    },
    dot: {
      width: Metrix.HorizontalSize(10),
      height: Metrix.VerticalSize(10),
      borderRadius: Metrix.LightRadius,
      marginHorizontal: Metrix.HorizontalSize(5),
      borderWidth: 1,
    },
    activeDot: {
      backgroundColor: colors.onBoardColor,
      borderColor: colors.black,
    },
    inactiveDot: {
      backgroundColor: colors.black,
    },
    button: {
      alignSelf: 'center',
      marginBottom: Metrix.VerticalSize(30),
      zIndex: 1,
    },
    buttonText: {
      color: colors.black,
      fontSize: Metrix.FontMedium,
      fontWeight: '600',
    },
    backgroundImage: {
      width: '100%',
      height: Metrix.VerticalSize(398),
      position: 'absolute',
      bottom: 0
    }
  });

  export default styles ; 