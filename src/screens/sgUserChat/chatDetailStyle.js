import { StyleSheet } from 'react-native';
import { Metrix } from '../../config';
import fonts from '../../config/Fonts';
import colors from '../../config/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  header: {


  },
  productInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Metrix.HorizontalSize(10)
  },
  productImage: {
    width: Metrix.HorizontalSize(64),
    height: Metrix.HorizontalSize(64),
    borderRadius: Metrix.HorizontalSize(32),
    borderWidth: 1,
    borderColor: colors.buttonColor
  },
  infoText: {
    fontSize: Metrix.FontMedium,
    fontFamily: fonts.InterSemiBold
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: Metrix.VerticalSize(15),
    justifyContent: "space-between"
  },

  navbarContainer: {
    backgroundColor: colors.white,
    gap: Metrix.VerticalSize(15),
    padding: Metrix.VerticalSize(15),
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA"

  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#EAEAEA',
    backgroundColor: '#fff',
    justifyContent: "space-between"
  },
  chatUserImage: {
    width: Metrix.HorizontalSize(42),
    height: Metrix.HorizontalSize(42),
    borderRadius: Metrix.VerticalSize(21),
  },
  chatUserName: {
    fontSize: Metrix.FontRegular,
    fontWeight: fonts.InterBold,
  },

  messagesList: {
    padding: Metrix.VerticalSize(10),
    backgroundColor: colors.white,
    flex: 1,
    borderTopLeftRadius: Metrix.VerticalSize(24),
    borderTopRightRadius: Metrix.VerticalSize(24),

  },
  messageContainer: {
    padding: Metrix.VerticalSize(8),
  },
  senderMessage: {
    alignSelf: 'flex-end',
  },
  receiverMessage: {
    alignSelf: 'flex-start',
  },

  senderText: {
    color: '#fff',
    backgroundColor: colors.buttonColor,
    fontSize: Metrix.FontExtraSmall,
    fontFamily: fonts.InterLight,
    padding: Metrix.VerticalSize(7),
    borderRadius: Metrix.VerticalSize(16),
    textAlign: "center"
  },
  receiverText: {
    color: '#000',
    backgroundColor: '#F5F5F5',
    fontSize: Metrix.FontExtraSmall,
    fontFamily: fonts.InterLight,
    padding: Metrix.VerticalSize(7),
    borderRadius: Metrix.VerticalSize(16),
    textAlign: "center"

  },
  messageTime: {
    fontSize: Metrix.normalize(10),
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  senderTime: {
    color: '#A8A7B0',
  },
  receiverTime: {
    color: '#A8A7B0',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    backgroundColor: colors.white,
    marginHorizontal: Metrix.HorizontalSize(15)
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: Metrix.VerticalSize(20.5),
    fontSize: Metrix.FontExtraSmall,
    height: Metrix.VerticalSize(41),
    paddingLeft: Metrix.HorizontalSize(10)

  },
  sendButton: {
    position: "absolute",
    right : Metrix.HorizontalSize(20)
  },
  sendIcon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
  scrollButton: {
    position: 'absolute',
    bottom: 80, // Adjust based on your input container height
    right: 20,
    backgroundColor: '#007AFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sendButtonDisabled: {
    opacity: 0.7
  },


  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 50,
  },
  emptyMessageText: {
    fontFamily: fonts.InterRegular,
    fontSize: Metrix.FontRegular,
    color: colors.lightGrey,
    textAlign: 'center',
  },
}); 