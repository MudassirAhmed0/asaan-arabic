import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function PaywallScreen() {
  const router = useRouter();

  useEffect(() => {
    // RevenueCat not configured yet — go back
    router.back();
  }, []);

  return null;
}
