import { Platform } from 'react-native';
import Purchases, { LOG_LEVEL } from 'react-native-purchases';

const REVENUECAT_API_KEY =
  Platform.OS === 'ios'
    ? process.env.EXPO_PUBLIC_RC_IOS_KEY!
    : process.env.EXPO_PUBLIC_RC_ANDROID_KEY!;
const ENTITLEMENT_ID = 'AsaanArabic Pro';

let isConfigured = false;

export async function initRevenueCat(userId: string): Promise<void> {
  if (isConfigured) return;

  Purchases.setLogLevel(LOG_LEVEL.DEBUG);

  Purchases.configure({
    apiKey: REVENUECAT_API_KEY,
    appUserID: userId,
  });

  isConfigured = true;
}

export async function checkEntitlement(): Promise<boolean> {
  if (!isConfigured) return false;

  try {
    const customerInfo = await Purchases.getCustomerInfo();
    return !!customerInfo.entitlements.active[ENTITLEMENT_ID];
  } catch {
    return false;
  }
}

export async function restorePurchases(): Promise<boolean> {
  const customerInfo = await Purchases.restorePurchases();
  return !!customerInfo.entitlements.active[ENTITLEMENT_ID];
}

export async function getRevenueCatUserId(): Promise<string | null> {
  if (!isConfigured) return null;
  try {
    const customerInfo = await Purchases.getCustomerInfo();
    return customerInfo.originalAppUserId;
  } catch {
    return null;
  }
}

export function resetRevenueCat(): void {
  if (!isConfigured) return;
  isConfigured = false;
}

export function getPlatform(): 'IOS' | 'ANDROID' {
  return Platform.OS === 'ios' ? 'IOS' : 'ANDROID';
}
