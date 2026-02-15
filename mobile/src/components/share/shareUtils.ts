import { Platform, Linking } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import type { RefObject } from 'react';
import type { View } from 'react-native';

const CAPTURE_OPTIONS = {
  format: 'png' as const,
  quality: 1,
  width: 1080,  // 360 * 3 = Instagram Stories width
  height: 1920, // 640 * 3 = Instagram Stories height
};

export async function captureAndShare(ref: RefObject<View | null>): Promise<void> {
  try {
    const uri = await captureRef(ref, CAPTURE_OPTIONS);

    // Try Instagram Stories first
    const instagramUrl = Platform.select({
      ios: `instagram-stories://share?source_application=asaan-arabic&backgroundImage=${encodeURIComponent(uri)}`,
      android: 'instagram-stories://share',
    });

    const canOpen = instagramUrl ? await Linking.canOpenURL(instagramUrl) : false;
    if (canOpen && instagramUrl) {
      await Linking.openURL(instagramUrl);
    } else {
      await Sharing.shareAsync(uri, { mimeType: 'image/png' });
    }
  } catch {
    // Fallback to general share
    try {
      const uri = await captureRef(ref, CAPTURE_OPTIONS);
      await Sharing.shareAsync(uri, { mimeType: 'image/png' });
    } catch {
      // User cancelled
    }
  }
}
