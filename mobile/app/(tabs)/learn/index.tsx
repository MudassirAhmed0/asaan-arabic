import { View, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Text } from '../../../src/components/ui/Text';
import { colors, spacing } from '../../../src/constants/theme';
import { useAuthStore } from '../../../src/stores/auth';

export default function LearnScreen() {
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/welcome');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="h1">Learn</Text>
        <Text variant="body" color={colors.textSecondary}>
          Your Quranic vocabulary journey
        </Text>
      </View>
      <View style={styles.content}>
        <Text variant="body" color={colors.textTertiary} align="center">
          Lesson list coming soon
        </Text>
      </View>
      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text variant="body" color={colors.error || '#D32F2F'}>
          Log out
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    alignItems: 'center',
    paddingVertical: spacing.md,
    marginBottom: spacing.lg,
  },
});
