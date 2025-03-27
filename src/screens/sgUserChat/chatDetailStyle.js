import { StyleSheet } from 'react-native';
import { Metrix } from '../../config';
import fonts from '../../config/Fonts';
import colors from '../../config/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerInfo: {
    marginTop: 10,
  },
  headerTitle: {
    fontSize: Metrix.FontLarge,
    fontFamily: fonts.InterBold,
    marginBottom: 10,
  },
  productInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  productImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  productTitle: {
    fontSize: Metrix.FontSmall,
    fontFamily: fonts.InterMedium,
  },
  productPrice: {
    fontSize: Metrix.FontSmall,
    fontFamily: fonts.InterBold,
    color: colors.buttonColor,
  },
  messagesList: {
    padding: 15,
  },
  messageContainer: {
    maxWidth: '80%',
    marginVertical: 5,
    padding: 12,
    borderRadius: 12,
  },
  senderMessage: {
    alignSelf: 'flex-end',
    backgroundColor: colors.buttonColor,
  },
  receiverMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#F5F5F5',
  },
  messageText: {
    fontSize: Metrix.FontSmall,
    fontFamily: fonts.InterRegular,
  },
  senderText: {
    color: '#fff',
  },
  receiverText: {
    color: '#000',
  },
  messageTime: {
    fontSize: Metrix.FontExtraSmall,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  senderTime: {
    color: '#fff',
  },
  receiverTime: {
    color: '#888',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    fontSize: Metrix.FontSmall,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.buttonColor,
    justifyContent: 'center',
    alignItems: 'center',
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
}); 