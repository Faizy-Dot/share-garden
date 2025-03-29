import { StyleSheet } from 'react-native';
import colors from '../../../../config/Colors';
import { Metrix } from '../../../../config';
import fonts from '../../../../config/Fonts';

const styles = StyleSheet.create({
  ProductDetailcontainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: Metrix.HorizontalSize(15),
  },
  NavBarContainer: {
    flexDirection: 'row',
    marginTop: Metrix.VerticalSize(20),
    alignItems: 'center',
  },
  BackArrowContainer: {
    flex: 1,
    paddingBottom: Metrix.VerticalSize(10),
  },
  NavBarWrapper: {
    flex: 1,
    paddingRight: Metrix.HorizontalSize(18),
  },
  HeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Metrix.HorizontalSize(5),
    marginVertical : Metrix.VerticalSize(15)
  },
  title: {
    fontSize: Metrix.FontRegular,
    fontFamily: fonts.InterSemiBold,
    color: colors.buttonColor,
  },
  PriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Metrix.HorizontalSize(5),
  },
  price: {
    fontSize: Metrix.normalize(20),
    fontFamily: fonts.InterSemiBold,
    color: colors.buttonColor,
  },
  bitLogo: {
    width: Metrix.HorizontalSize(26),
    height: Metrix.HorizontalSize(26),
  },
  middleContainer: {
    gap : Metrix.VerticalSize(15)
  },
  middleTopContainer: {
    borderWidth : 1,
    borderColor : colors.borderColor,
    borderRadius : Metrix.LightRadius,
    paddingBottom :Metrix.VerticalSize(15)
  },
  productImage: {
    width: Metrix.HorizontalSize(345),
    height: Metrix.VerticalSize(175),
  },
  FeaturedContainer: {
    position: 'absolute',
    right: Metrix.HorizontalSize(15),
    justifyContent: 'space-between',
    height: Metrix.VerticalSize(175),
    paddingVertical: Metrix.VerticalSize(15),
    alignItems: 'center',
  },
  featuredText: {
    backgroundColor: '#FFC202',
    fontSize: Metrix.FontExtraSmall,
    fontFamily: fonts.InterBold,
    padding: Metrix.VerticalSize(2),
    width: Metrix.HorizontalSize(61),
    textAlign: 'center',
    borderRadius: Metrix.LightRadius,
  },
  IconContainer: {
    flexDirection: 'row',
    gap: Metrix.HorizontalSize(10),
    alignItems: 'center',
  },
  middleMidContainer: {
    height : Metrix.VerticalSize(48),
    width : "100%",
    backgroundColor : colors.inputBackgroundColor,
    borderWidth : 1,
    borderColor : colors.borderColor,
    flexDirection : "row",
    justifyContent :"space-between",
    paddingHorizontal : Metrix.HorizontalSize(15),
    alignItems :"center",
    borderRadius : Metrix.VerticalSize(3),
  },
  middleBottomContainer: {
    height : Metrix.VerticalSize(108),
    borderWidth : 1,
    borderColor : colors.borderColor,
    justifyContent : "space-around",
    alignItems : "center",
    borderRadius : Metrix.VerticalSize(3),
    flexDirection : "row"
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Metrix.VerticalSize(10),
  },
  dot: {
    width: Metrix.VerticalSize(4),
    height:  Metrix.VerticalSize(4),
    borderRadius: 2,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: colors.black,
  },
  inactiveDot: {
    backgroundColor: colors.buttonColor,
  },
  imageSlider: {
    width: "100%",
    height: Metrix.VerticalSize(175),
  },
  middleTopDescriptionContainer:{
    paddingHorizontal : Metrix.HorizontalSize(15),
    marginTop : Metrix.VerticalSize(20)
  },
  linecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal : Metrix.HorizontalSize(20),
    marginTop:Metrix.VerticalSize(20)
  },
  circle: {
    width: Metrix.HorizontalSize(6),
    height: Metrix.HorizontalSize(6),
    borderRadius: Metrix.VerticalSize(3),
    backgroundColor: colors.black,
  },
  dottedLine: {
    flex: 1,
    borderWidth: 0.7,
    borderStyle: "dashed",
  },
  middleTopBottomContainer:{
    paddingHorizontal : Metrix.HorizontalSize(15),
    marginTop:Metrix.VerticalSize(20),
    gap : Metrix.VerticalSize(15)
  },
  inputContainer: {
    alignItems: "flex-start",
    width: Metrix.HorizontalSize(50),
    height: Metrix.VerticalSize(60),

},
input: {
    width: Metrix.HorizontalSize(30),
    height: Metrix.VerticalSize(40),
    fontSize: Metrix.FontRegular,
    fontFamily: fonts.InterBold,
    paddingLeft: 0,
},
label: {
    fontSize: Metrix.FontExtraSmall,
    fontWeight: fonts.InterRegular,
    color: "#5A5A5A",
    position: "relative",
    bottom: Metrix.VerticalSize(7)

},
separator: {
    fontSize: Metrix.normalize(22),
    fontWeight: fonts.InterBold,
    color: colors.buttonColor,
    marginBottom: Metrix.VerticalSize(10),
},
timerRow: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-around",
 
},
bottomContainer:{
marginTop : Metrix.VerticalSize(15),
gap : Metrix.VerticalSize(15)
},
myPost: {
  gap: Metrix.HorizontalSize(10),
  alignItems: "center",
},
postBox: {
  flexDirection: "row",
  alignItems: "center",
  gap: Metrix.HorizontalSize(12),
  borderWidth: 1,
  borderColor: "#E6E6E6",
  borderRadius: Metrix.LightRadius,
  width: Metrix.HorizontalSize(160),
  height: Metrix.VerticalSize(48),
  justifyContent: "center",
  alignItems: "center"
},
ownerMessage: {
    textAlign: 'center',
    fontSize: Metrix.FontRegular,
    fontFamily: fonts.InterMedium,
    color: colors.textGray,
    paddingVertical: Metrix.VerticalSize(10),
},
modal: {
  margin: 0,
  justifyContent: 'center',
  alignItems: 'center',
},
modalContainer: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  justifyContent: 'center',
  alignItems: 'center'
},
modalContent: {
  backgroundColor: colors.white,
  width: '90%',
  padding: Metrix.VerticalSize(20),
  borderRadius: Metrix.VerticalSize(10),
  position: 'relative'
},
closeButton: {
  position: 'absolute',
  right: Metrix.HorizontalSize(10),
  top: Metrix.VerticalSize(10)
},
closeIcon: {
  width: Metrix.HorizontalSize(24),
  height: Metrix.VerticalSize(24),
},
modalLogo: {
  width: Metrix.HorizontalSize(80),
  height: Metrix.VerticalSize(80),
  marginBottom: Metrix.VerticalSize(20),
},
modalTitle: {
  fontSize: Metrix.FontRegular,
  fontFamily: fonts.InterBold,
  color: colors.black,
  marginBottom: Metrix.VerticalSize(10)
},
modalText: {
  fontSize: Metrix.FontRegular,
  fontFamily: fonts.InterRegular,
  textAlign: 'center',
  marginVertical: Metrix.VerticalSize(15)
},
modalFooter: {
  fontSize: Metrix.FontSmall,
  fontFamily: fonts.InterRegular,
  color: colors.textGray,
  marginTop: Metrix.VerticalSize(15),
},
brandText: {
  color: colors.buttonColor,
  fontFamily: fonts.InterBold,
},
searchInputContainer: {
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  justifyContent : "space-around"
},
searchIcon: {
  width: Metrix.HorizontalSize(25),
  height: Metrix.VerticalSize(27),
  position: "absolute",
  left: Metrix.HorizontalSize(23),
  zIndex: 1
},
searchInput: {
  width: Metrix.HorizontalSize(300),
  height: Metrix.VerticalSize(60),
  backgroundColor: colors.inputBackgroundColor,
  borderColor: "#E6E6E6",
  borderWidth: 1,
  borderRadius: Metrix.LightRadius,
  paddingLeft: Metrix.HorizontalSize(45),
  fontSize: Metrix.FontRegular,
  fontFamily: fonts.InterSemiBold
},
filterLogo: {
  width: Metrix.HorizontalSize(20),
  height: Metrix.VerticalSize(15)
},
bidInput: {
  borderWidth: 1,
  borderColor: colors.borderColor,
  borderRadius: Metrix.VerticalSize(3),
  padding: Metrix.VerticalSize(10),
  marginVertical: Metrix.VerticalSize(15),
  width: '100%',
  color: colors.black,
  fontFamily: fonts.InterRegular,
  fontSize: Metrix.FontSmall
},
bidInputError: {
  borderColor: colors.redColor
},
errorText: {
  color: colors.redColor,
  fontFamily: fonts.InterRegular,
  fontSize: Metrix.FontSmall,
  marginBottom: Metrix.VerticalSize(5)
},
});

export default styles;
