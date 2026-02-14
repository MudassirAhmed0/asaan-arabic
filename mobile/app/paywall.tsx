import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import RevenueCatUI from 'react-native-purchases-ui';
import { useEffect } from 'react';
import { usePremiumStore } from '../src/stores/premium';

export default function PaywallScreen() {
  const router = useRouter();
  const { checkPremiumStatus, syncPurchaseToBackend } = usePremiumStore();

  useEffect(() => {
    presentPaywall();
  }, []);

  async function presentPaywall() {
    try {
      const result = await RevenueCatUI.presentPaywall();

      if (result === 'PURCHASED' || result === 'RESTORED') {
        await checkPremiumStatus();

        if (result === 'PURCHASED') {
          await syncPurchaseToBackend('premium');
        }
      }
    } catch (e: any) {
      if (e?.userCancelled) {
        // User dismissed — do nothing
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    }

    router.back();
  }

  return null;
}
