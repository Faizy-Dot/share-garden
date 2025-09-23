# ShareGarden Deep Linking Setup

This document explains how deep linking is configured in the ShareGarden app to allow users to share product links that open directly in the app.

## Overview

Deep linking allows users to tap on a shared link and be taken directly to a specific product in the ShareGarden app. This is implemented using both custom URL schemes and Universal Links (iOS) / App Links (Android).

## URL Schemes

The app supports the following URL formats:

- **Custom Scheme**: `sharegarden://product/{productId}`
- **Web URLs**: `https://sharegarden.com/product/{productId}` or `https://www.sharegarden.com/product/{productId}`

## Implementation Details

### 1. React Navigation Configuration

The deep linking is configured in `App.jsx` using React Navigation's linking prop:

```javascript
linking={{
  prefixes: ['sharegarden://', 'https://sharegarden.com', 'https://www.sharegarden.com'],
  config: {
    screens: {
      SgTabs: {
        screens: {
          Items: {
            screens: {
              ProductDetail: 'product/:id',
            },
          },
        },
      },
    },
  },
}}
```

### 2. Android Configuration

In `android/app/src/main/AndroidManifest.xml`, intent filters are added to handle both custom schemes and web URLs:

```xml
<!-- Deep linking for custom scheme -->
<intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="sharegarden" />
</intent-filter>

<!-- Deep linking for web URLs -->
<intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="https" android:host="sharegarden.com" />
    <data android:scheme="https" android:host="www.sharegarden.com" />
</intent-filter>
```

### 3. iOS Configuration

In `ios/AwesomeProject/Info.plist`, URL schemes and associated domains are configured:

```xml
<!-- URL Scheme for deep linking -->
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleURLName</key>
        <string>sharegarden</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>sharegarden</string>
        </array>
    </dict>
</array>

<!-- Associated Domains for Universal Links -->
<key>com.apple.developer.associated-domains</key>
<array>
    <string>applinks:sharegarden.com</string>
    <string>applinks:www.sharegarden.com</string>
</array>
```

### 4. ProductDetail Screen Updates

The `ProductDetail.js` screen has been updated to handle both route parameters and deep link parameters:

```javascript
const ProductDetail = ({ route, navigation }) => {
  // Handle both route params and deep link params
  const { item, id } = route.params;
  const productId = id || (item ? item.id : null);
  
  // Use productId for all API calls and operations
}
```

### 5. Share Functionality

The share functions across the app create appropriate deep links using the hosted web URLs:

**Product Sharing:**
```javascript
const webLink = `https://sharegardendeeplink-s3xe.vercel.app/product.html?id=${productId}`;
const result = await Share.share({
  message: shareMessage,
  title: displayData.title,
  url: webLink,
});
```

**SGTip Sharing:**
```javascript
const webLink = `https://sharegardendeeplink-s3xe.vercel.app/sgtip.html?id=${sgtipId}`;
const result = await Share.share({
  message: shareMessage,
  title: sgtipData.title,
  url: webLink,
});
```

**Ad Sharing:**
```javascript
const webLink = `https://sharegardendeeplink-s3xe.vercel.app/index.html?type=ad&id=${adId}`;
const result = await Share.share({
  message: shareMessage,
  title: ad.title,
  url: webLink,
});
```

## Web Fallback

Web pages are hosted at `https://sharegardendeeplink-s3xe.vercel.app/` as fallbacks for users who don't have the app installed:

- `index.html` - Main deeplink page (handles all content types)
- `product.html` - Product-specific deeplink page  
- `sgtip.html` - SGTip-specific deeplink page

These pages:
1. Attempt to open the app automatically
2. Provide manual buttons to open the app
3. Offer download links for users without the app
4. Handle both iOS and Android app store redirects
5. Display content previews when possible

## Testing Deep Links

### Android
```bash
adb shell am start -W -a android.intent.action.VIEW -d "sharegarden://product/123" com.awesomeproject
```

### iOS Simulator
```bash
xcrun simctl openurl booted "sharegarden://product/123"
```

### Web Testing
Visit: `https://sharegarden.com/product/123` (when hosted)

## Production Setup

For production, you'll need to:

1. **Host the web fallback page** on your domain (sharegarden.com)
2. **Set up Universal Links** for iOS:
   - Create an `apple-app-site-association` file on your domain
   - Configure associated domains in your Apple Developer account
3. **Set up App Links** for Android:
   - Create a `/.well-known/assetlinks.json` file on your domain
   - Verify the domain in Google Search Console
4. **Update app store URLs** in the web fallback page
5. **Test thoroughly** on both platforms

## Troubleshooting

### Common Issues

1. **Deep links not working on Android**: Ensure `android:autoVerify="true"` is set in intent filters
2. **Universal Links not working on iOS**: Check associated domains configuration and apple-app-site-association file
3. **App not opening**: Verify URL schemes match exactly between manifest/plist and navigation config

### Debug Tips

1. Use `adb logcat` to see Android intent handling
2. Check iOS Console app for Universal Link logs
3. Test with `npx uri-scheme` package for quick testing

## Security Considerations

1. Validate product IDs before fetching data
2. Implement proper authentication for sensitive products
3. Consider rate limiting for deep link requests
4. Sanitize URLs to prevent injection attacks 