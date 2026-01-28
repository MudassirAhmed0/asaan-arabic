import {
  View,
  ScrollView,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Text } from '../../src/components/ui/Text';
import { Card } from '../../src/components/ui/Card';
import { AudioButton } from '../../src/components/lesson/AudioButton';
import { colors, spacing, borderRadius, typography } from '../../src/constants/theme';
import { useWordDetail, useUpdateWordStatus } from '../../src/hooks/useWords';

export default function WordDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { data: word, isLoading } = useWordDetail(id);
  const updateStatus = useUpdateWordStatus();

  const handleToggleStatus = () => {
    if (!word?.progress) return;
    const newStatus =
      word.progress.status === 'NEEDS_REVISION' ? 'LEARNED' : 'NEEDS_REVISION';
    updateStatus.mutate({ wordId: id, status: newStatus });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  if (isLoading || !word) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      </SafeAreaView>
    );
  }

  const needsRevision = word.progress?.status === 'NEEDS_REVISION';
  const hasIntro = !!word.introduction;
  const hasInfo = word.frequency > 0 || (word.isUrduCognate && word.urduCognateNote);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <Text variant="caption" color={colors.textSecondary}>
          Lesson {word.lesson.orderIndex}: {word.lesson.title}
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero — Arabic word + audio + transliteration + meaning */}
        <View style={styles.heroSection}>
          <Text style={styles.arabicWord}>{word.arabic}</Text>
          <AudioButton
            audioUrl={word.audioUrl}
            arabicText={word.arabic}
            size="icon"
          />
          <Text variant="h2" color={colors.textSecondary}>
            {word.transliteration}
          </Text>
          <Text variant="h3" color={colors.primary}>
            {word.meaning}
          </Text>
        </View>

        {/* Revision status */}
        {word.progress && needsRevision && (
          <View style={styles.revisionBanner}>
            <View style={styles.revisionLabelRow}>
              <Ionicons name="flag" size={16} color={colors.warning} />
              <Text variant="bodyBold" color={colors.warning}>
                Flagged for revision
              </Text>
            </View>
            <Text variant="caption" color={colors.textTertiary} style={styles.revisionHint}>
              This word was flagged because you got it wrong in practice. It will be prioritised in your next session.
            </Text>
            <Pressable
              style={({ pressed }) => [
                styles.clearButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={handleToggleStatus}
            >
              <Ionicons name="checkmark-circle" size={18} color={colors.success} />
              <Text variant="bodyBold" color={colors.success}>
                I've got this now
              </Text>
            </Pressable>
          </View>
        )}

        {word.progress && !needsRevision && (
          <Pressable
            style={({ pressed }) => [
              styles.flagButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleToggleStatus}
          >
            <Ionicons name="flag-outline" size={16} color={colors.textTertiary} />
            <Text variant="caption" color={colors.textTertiary}>
              I need to practice this
            </Text>
          </Pressable>
        )}

        {/* About this word — introduction + word info merged */}
        {(hasIntro || hasInfo) && (
          <Card style={styles.section}>
            {hasIntro && (
              <>
                <Text variant="caption" color={colors.primary} style={styles.sectionLabel}>
                  {word.introduction!.style.replace('_', ' ')}
                </Text>
                <Text variant="h3" style={styles.introHeadline}>
                  {word.introduction!.headline}
                </Text>
                <Text variant="body" color={colors.textSecondary}>
                  {word.introduction!.body}
                </Text>
              </>
            )}
            {hasIntro && hasInfo && <View style={styles.divider} />}
            {hasInfo && (
              <>
                {word.frequency > 0 && (
                  <View style={styles.infoRow}>
                    <Text variant="caption" color={colors.textTertiary}>
                      Frequency in Quran
                    </Text>
                    <Text variant="bodyBold">{word.frequency}x</Text>
                  </View>
                )}
                {word.isUrduCognate && word.urduCognateNote && (
                  <View style={styles.infoRow}>
                    <Text variant="caption" color={colors.textTertiary}>
                      Urdu Connection
                    </Text>
                    <Text variant="body" style={styles.infoValue}>
                      {word.urduCognateNote}
                    </Text>
                  </View>
                )}
              </>
            )}
          </Card>
        )}

        {/* In the Quran */}
        {word.ayahHighlights.length > 0 && (
          <Card style={styles.section}>
            <Text variant="caption" color={colors.primary} style={styles.sectionLabel}>
              IN THE QURAN
            </Text>
            {word.ayahHighlights.map((ayah) => (
              <View key={ayah.id} style={styles.ayahItem}>
                <Text style={styles.ayahArabic}>{ayah.arabicText}</Text>
                <Text variant="body" color={colors.textSecondary}>
                  {ayah.translation}
                </Text>
                <Text variant="small" color={colors.textTertiary}>
                  {ayah.surahName} ({ayah.surahNum}:{ayah.ayahNum})
                </Text>
              </View>
            ))}
          </Card>
        )}

        {/* Your Progress */}
        {word.progress && (
          <Card style={styles.section}>
            <Text variant="caption" color={colors.primary} style={styles.sectionLabel}>
              YOUR PROGRESS
            </Text>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text variant="h2" color={colors.success}>
                  {word.progress.timesCorrect}
                </Text>
                <Text variant="caption" color={colors.textSecondary}>
                  Correct
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text variant="h2" color={colors.error}>
                  {word.progress.timesIncorrect}
                </Text>
                <Text variant="caption" color={colors.textSecondary}>
                  Incorrect
                </Text>
              </View>
            </View>
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  heroSection: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
    gap: spacing.xs,
  },
  arabicWord: {
    ...typography.arabicLarge,
    fontSize: 48,
    lineHeight: 72,
    color: colors.primary,
  },
  revisionBanner: {
    backgroundColor: colors.warningLight,
    borderWidth: 1,
    borderColor: colors.warning,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  revisionLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  revisionHint: {
    lineHeight: 18,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.sm,
    backgroundColor: colors.successLight,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.success,
    marginTop: spacing.xs,
  },
  flagButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
  },
  section: {
    marginBottom: spacing.md,
    padding: spacing.lg,
  },
  sectionLabel: {
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  introHeadline: {
    marginBottom: spacing.sm,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  infoValue: {
    flex: 1,
    textAlign: 'right',
  },
  ayahItem: {
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  ayahArabic: {
    ...typography.arabicMedium,
    color: colors.text,
    textAlign: 'right',
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.xl,
  },
  statItem: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  buttonPressed: {
    opacity: 0.8,
  },
});
