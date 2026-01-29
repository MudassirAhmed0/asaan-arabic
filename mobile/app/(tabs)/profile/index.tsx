import {
  View,
  ScrollView,
  Pressable,
  Switch,
  StyleSheet,
  Alert,
  TextInput,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Text } from '../../../src/components/ui/Text';
import { Card } from '../../../src/components/ui/Card';
import { colors, spacing, borderRadius } from '../../../src/constants/theme';
import { useAuthStore } from '../../../src/stores/auth';
import { useProgressStore } from '../../../src/stores/progress';
import { usePreferencesStore } from '../../../src/stores/preferences';
import { usersApi } from '../../../src/api/users';

export default function ProfileScreen() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const { totalWordsLearned, currentStreak, longestStreak, currentLessonIndex } =
    useProgressStore();
  const { soundEnabled, hapticsEnabled, setPreferences } = usePreferencesStore();

  const [nameModalVisible, setNameModalVisible] = useState(false);
  const [editName, setEditName] = useState(user?.name ?? '');
  const [saving, setSaving] = useState(false);

  const handleToggle = async (key: 'soundEnabled' | 'hapticsEnabled', value: boolean) => {
    const prev = key === 'soundEnabled' ? soundEnabled : hapticsEnabled;
    setPreferences({ [key]: value });
    try {
      await usersApi.updateProfile({ [key]: value });
    } catch {
      setPreferences({ [key]: prev });
    }
  };

  const handleSaveName = async () => {
    const trimmed = editName.trim();
    if (!trimmed || trimmed === user?.name) {
      setNameModalVisible(false);
      return;
    }
    setSaving(true);
    try {
      await usersApi.updateProfile({ name: trimmed });
      useAuthStore.getState().setUser({ ...user!, name: trimmed });
      setNameModalVisible(false);
    } catch {
      Alert.alert('Error', 'Could not update name. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Your progress is saved and will be here when you return.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log Out', style: 'destructive', onPress: logout },
      ],
    );
  };

  const openNameModal = () => {
    setEditName(user?.name ?? '');
    setNameModalVisible(true);
  };

  const lessonsCompleted = Math.max(0, currentLessonIndex - 1);
  const totalLessons = 10;
  const progressPercent = lessonsCompleted / totalLessons;

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : null;

  const avatarLetter = (user?.name?.[0] ?? user?.phone?.[3] ?? '?').toUpperCase();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text variant="h2">Profile</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile header */}
        <Pressable style={styles.profileHeader} onPress={openNameModal}>
          <View style={styles.avatar}>
            <Text variant="h1" color={colors.textOnPrimary}>
              {avatarLetter}
            </Text>
          </View>
          {user?.name ? (
            <>
              <Text variant="h2" align="center">
                {user.name}
              </Text>
              {user.phone && (
                <Text variant="caption" color={colors.textSecondary} align="center">
                  {user.phone}
                </Text>
              )}
            </>
          ) : (
            <>
              {user?.phone && (
                <Text variant="h3" align="center">
                  {user.phone}
                </Text>
              )}
              <Text variant="caption" color={colors.primary} align="center">
                Tap to add your name
              </Text>
            </>
          )}
        </Pressable>

        {/* Stats card — 3 columns */}
        <Card style={styles.statsCard}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text variant="h1" color={colors.primary}>
                {totalWordsLearned}
              </Text>
              <Text variant="caption" color={colors.textSecondary}>
                words I know
              </Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <View style={styles.statValueRow}>
                <Ionicons name="flame" size={20} color={colors.accent} />
                <Text variant="h1" color={colors.accent}>
                  {currentStreak}
                </Text>
              </View>
              <Text variant="caption" color={colors.textSecondary}>
                day streak
              </Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <View style={styles.statValueRow}>
                <Ionicons name="trophy" size={18} color={colors.primary} />
                <Text variant="h1" color={colors.primary}>
                  {longestStreak}
                </Text>
              </View>
              <Text variant="caption" color={colors.textSecondary}>
                best streak
              </Text>
            </View>
          </View>
        </Card>

        {/* Your Journey */}
        <View style={styles.sectionHeader}>
          <Text variant="caption" color={colors.textTertiary} style={styles.sectionLabel}>
            YOUR JOURNEY
          </Text>
        </View>
        <Card style={styles.settingsCard} padded={false}>
          <View style={styles.settingRow}>
            <Text variant="body">Lessons completed</Text>
            <Text variant="bodyBold" color={colors.primary}>
              {lessonsCompleted} of {totalLessons}
            </Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${progressPercent * 100}%` }]} />
          </View>
          {memberSince && (
            <>
              <View style={styles.settingDivider} />
              <View style={styles.settingRow}>
                <Text variant="body">Member since</Text>
                <Text variant="body" color={colors.textSecondary}>
                  {memberSince}
                </Text>
              </View>
            </>
          )}
        </Card>

        {/* Settings */}
        <View style={styles.sectionHeader}>
          <Text variant="caption" color={colors.textTertiary} style={styles.sectionLabel}>
            SETTINGS
          </Text>
        </View>
        <Card style={styles.settingsCard} padded={false}>
          <View style={styles.settingRow}>
            <Text variant="body">Sound Effects</Text>
            <Switch
              value={soundEnabled}
              onValueChange={(v) => handleToggle('soundEnabled', v)}
              trackColor={{ false: colors.border, true: colors.primaryLight }}
              thumbColor={colors.surface}
            />
          </View>
          <View style={styles.settingDivider} />
          <View style={styles.settingRow}>
            <Text variant="body">Haptic Feedback</Text>
            <Switch
              value={hapticsEnabled}
              onValueChange={(v) => handleToggle('hapticsEnabled', v)}
              trackColor={{ false: colors.border, true: colors.primaryLight }}
              thumbColor={colors.surface}
            />
          </View>
        </Card>

        {/* Account */}
        <View style={styles.sectionHeader}>
          <Text variant="caption" color={colors.textTertiary} style={styles.sectionLabel}>
            ACCOUNT
          </Text>
        </View>
        <Card style={styles.settingsCard} padded={false}>
          <Pressable style={styles.settingRow} onPress={openNameModal}>
            <Text variant="body">Edit Name</Text>
            <View style={styles.settingValue}>
              <Text variant="body" color={colors.textSecondary}>
                {user?.name ?? 'Add name'}
              </Text>
              <Ionicons name="chevron-forward" size={16} color={colors.textTertiary} />
            </View>
          </Pressable>
          <View style={styles.settingDivider} />
          <View style={styles.settingRow}>
            <Text variant="body">App Version</Text>
            <Text variant="body" color={colors.textSecondary}>
              1.0.0
            </Text>
          </View>
        </Card>

        {/* Logout */}
        <Pressable
          style={({ pressed }) => [styles.logoutButton, pressed && styles.pressed]}
          onPress={handleLogout}
        >
          <Text variant="bodyBold" color={colors.error}>
            Log Out
          </Text>
        </Pressable>
      </ScrollView>

      {/* Edit name modal */}
      <Modal visible={nameModalVisible} transparent animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setNameModalVisible(false)}>
          <Pressable style={styles.nameModalContent} onPress={(e) => e.stopPropagation()}>
            <Text variant="h3" style={styles.modalTitle}>
              Edit Name
            </Text>
            <TextInput
              style={styles.nameInput}
              value={editName}
              onChangeText={setEditName}
              placeholder="Your name"
              placeholderTextColor={colors.textTertiary}
              autoFocus
              maxLength={255}
            />
            <View style={styles.nameActions}>
              <Pressable
                style={[styles.nameButton, styles.nameCancelButton]}
                onPress={() => setNameModalVisible(false)}
              >
                <Text variant="bodyBold" color={colors.textSecondary}>
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                style={[styles.nameButton, styles.nameSaveButton]}
                onPress={handleSaveName}
                disabled={saving}
              >
                <Text variant="bodyBold" color={colors.textOnPrimary}>
                  {saving ? 'Saving...' : 'Save'}
                </Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
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
    paddingVertical: spacing.md,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  profileHeader: {
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  statsCard: {
    marginBottom: spacing.lg,
    padding: spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xs,
  },
  statValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.borderLight,
  },
  sectionHeader: {
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  sectionLabel: {
    fontWeight: '600',
    letterSpacing: 1,
  },
  settingsCard: {
    marginBottom: spacing.sm,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    minHeight: 52,
  },
  settingValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  settingDivider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginLeft: spacing.lg,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: colors.borderLight,
    marginHorizontal: spacing.lg,
    borderRadius: 2,
    marginBottom: spacing.md,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  logoutButton: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
    marginTop: spacing.lg,
  },
  pressed: {
    opacity: 0.6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
  },
  modalTitle: {
    marginBottom: spacing.lg,
  },
  nameModalContent: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    marginHorizontal: spacing.lg,
    padding: spacing.lg,
  },
  nameInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 16,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  nameActions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  nameButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
  },
  nameCancelButton: {
    backgroundColor: colors.surfaceAlt,
  },
  nameSaveButton: {
    backgroundColor: colors.primary,
  },
});
