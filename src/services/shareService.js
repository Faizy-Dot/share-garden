import { Share, Alert, Linking, Platform } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

class ShareService {
  // ✅ Format share message
  formatShareMessage(sgTipData, sgTipId) {
    const authorName = sgTipData.author
      ? `${sgTipData.author.firstName} ${sgTipData.author.lastName}`
      : 'Share Garden User';

    return `🌱 Check out this amazing SGTip by ${authorName}!\n\n"${sgTipData.title || 'Amazing tip'}"\n\n${sgTipData.description || ''}\n\n#ShareGarden #SGTip #GardeningTips\n\n${this.getShareUrl(
      sgTipId
    )}`;
  }

  // ✅ Generate share URL (deep link)
  getShareUrl(sgTipId) {
    return `https://sharegardendeeplink-s3xe.vercel.app/sgtip.html?id=${sgTipId}`;
  }

  // ✅ Share with native share dialog
  async shareSGTip(sgTipData, sgTipId) {
    try {
      const shareContent = {
        title: sgTipData.title || 'Check out this SGTip!',
        message: this.formatShareMessage(sgTipData, sgTipId),
        url: this.getShareUrl(sgTipId), // iOS uses this
      };

      const result = await Share.share(shareContent);
      console.log('result from shareService==>>', result);
      return result;
    } catch (error) {
      console.error('Error sharing SGTip:', error);
      throw error;
    }
  }

  // ✅ Share to specific platform
  async shareToPlatform(platform, sgTipData, sgTipId) {
    const shareUrl = this.getShareUrl(sgTipId);
    const shareText = this.formatShareMessage(sgTipData, sgTipId);

    switch (platform) {
      case 'whatsapp':
        return this.shareToWhatsApp(shareText);
      case 'facebook':
        return this.shareToFacebook(shareUrl);
      case 'twitter':
        return this.shareToTwitter(shareText, shareUrl);
      case 'instagram':
        return this.shareToInstagram(shareText);
      case 'copy':
        return this.copyToClipboard(shareText);
      default:
        return this.shareSGTip(sgTipData, sgTipId);
    }
  }

  // ✅ WhatsApp
  async shareToWhatsApp(shareText) {
    const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(shareText)}`;
    try {
      const canOpen = await Linking.canOpenURL(whatsappUrl);
      if (canOpen) {
        await Linking.openURL(whatsappUrl);
        return { action: 'shared', activityType: 'whatsapp' };
      } else {
        throw new Error('WhatsApp not installed');
      }
    } catch (error) {
      console.error('Error sharing to WhatsApp:', error);
      throw error;
    }
  }

  // ✅ Facebook
  async shareToFacebook(shareUrl) {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}`;
    try {
      const canOpen = await Linking.canOpenURL(facebookUrl);
      if (canOpen) {
        await Linking.openURL(facebookUrl);
        return { action: 'shared', activityType: 'facebook' };
      } else {
        throw new Error('Cannot open Facebook');
      }
    } catch (error) {
      console.error('Error sharing to Facebook:', error);
      throw error;
    }
  }

  // ✅ Twitter
  async shareToTwitter(shareText, shareUrl) {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}&url=${encodeURIComponent(shareUrl)}`;
    try {
      const canOpen = await Linking.canOpenURL(twitterUrl);
      if (canOpen) {
        await Linking.openURL(twitterUrl);
        return { action: 'shared', activityType: 'twitter' };
      } else {
        throw new Error('Cannot open Twitter');
      }
    } catch (error) {
      console.error('Error sharing to Twitter:', error);
      throw error;
    }
  }

  // ✅ Instagram (copy text, then open app)
  async shareToInstagram(shareText) {
    try {
      await Clipboard.setString(shareText);

      Alert.alert(
        'Copied to Clipboard',
        'The SGTip content has been copied. Paste it in Instagram!',
        [
          {
            text: 'Open Instagram',
            onPress: () => {
              const instagramUrl = 'instagram://';
              Linking.canOpenURL(instagramUrl).then((supported) => {
                if (supported) {
                  Linking.openURL(instagramUrl);
                } else {
                  Alert.alert('Instagram not installed');
                }
              });
            },
          },
          { text: 'OK', style: 'cancel' },
        ]
      );

      return { action: 'shared', activityType: 'instagram' };
    } catch (error) {
      console.error('Error sharing to Instagram:', error);
      throw error;
    }
  }

  // ✅ Copy link
  async copyToClipboard(shareText) {
    try {
      await Clipboard.setString(shareText);

      Alert.alert('Copied to Clipboard', 'SGTip link has been copied.', [
        { text: 'OK' },
      ]);

      return { action: 'shared', activityType: 'clipboard' };
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      throw error;
    }
  }

  // ✅ Share options popup
  showShareOptions(sgTipData, sgTipId, onShareComplete) {
    Alert.alert('Share SGTip', 'Choose how you want to share this SGTip:', [
      {
        text: 'Native Share',
        onPress: () =>
          this.shareSGTip(sgTipData, sgTipId).then(onShareComplete),
      },
      {
        text: 'WhatsApp',
        onPress: () =>
          this.shareToPlatform('whatsapp', sgTipData, sgTipId).then(
            onShareComplete
          ),
      },
      {
        text: 'Facebook',
        onPress: () =>
          this.shareToPlatform('facebook', sgTipData, sgTipId).then(
            onShareComplete
          ),
      },
      {
        text: 'Twitter',
        onPress: () =>
          this.shareToPlatform('twitter', sgTipData, sgTipId).then(
            onShareComplete
          ),
      },
      {
        text: 'Instagram',
        onPress: () =>
          this.shareToPlatform('instagram', sgTipData, sgTipId).then(
            onShareComplete
          ),
      },
      {
        text: 'Copy Link',
        onPress: () =>
          this.shareToPlatform('copy', sgTipData, sgTipId).then(
            onShareComplete
          ),
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  }
}

// ✅ Singleton
const shareService = new ShareService();
export default shareService;
