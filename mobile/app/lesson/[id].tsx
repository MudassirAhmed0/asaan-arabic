import { View, Animated, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useCallback, useRef } from 'react';
import { colors } from '../../src/constants/theme';
import { useLessonContent, useStartLesson, useCompleteLesson } from '../../src/hooks/useLessons';
import { useLessonFlowStore } from '../../src/stores/lesson';
import { useProgressStore } from '../../src/stores/progress';
import { ProgressBar } from '../../src/components/lesson/ProgressBar';
import { LessonEntryCard } from '../../src/components/lesson/LessonEntryCard';
import { WordIntroduction } from '../../src/components/lesson/WordIntroduction';
import { MidLessonEncouragement } from '../../src/components/lesson/MidLessonEncouragement';
import { ActivityMatch } from '../../src/components/lesson/ActivityMatch';
import { ActivityQuickFire } from '../../src/components/lesson/ActivityQuickFire';
import { ActivityFillMeaning } from '../../src/components/lesson/ActivityFillMeaning';
import { ActivitySpotInQuran } from '../../src/components/lesson/ActivitySpotInQuran';
import { LessonComplete } from '../../src/components/lesson/LessonComplete';
import { Text } from '../../src/components/ui/Text';
import type { LessonActivity, WordWithDetails } from '../../src/types';

export default function LessonFlowScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { data: content, isLoading, error } = useLessonContent(id);
  const startLessonMutation = useStartLesson();
  const completeLessonMutation = useCompleteLesson();
  const completionTriggered = useRef(false);

  const {
    attemptId,
    currentStepIndex,
    steps,
    score,
    totalQuestions,
    initFlow,
    nextStep,
    prevStep,
    addScore,
    reset,
  } = useLessonFlowStore();

  const canGoBack = useLessonFlowStore((s) => s.canGoBack);
  const currentStep = steps[currentStepIndex] ?? null;
  const progress = steps.length > 1 ? currentStepIndex / (steps.length - 1) : 0;

  const totalWordsLearned = useProgressStore((s) => s.totalWordsLearned);
  const incrementWords = useProgressStore((s) => s.incrementWords);
  const advanceLesson = useProgressStore((s) => s.advanceLesson);
  const setProgress = useProgressStore((s) => s.setProgress);

  // Step transition animation
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const prevStepRef = useRef(currentStepIndex);

  useEffect(() => {
    if (prevStepRef.current !== currentStepIndex && steps.length > 0) {
      const direction = currentStepIndex > prevStepRef.current ? 1 : -1;
      prevStepRef.current = currentStepIndex;

      fadeAnim.setValue(0.3);
      slideAnim.setValue(direction * 16);

      Animated.parallel([
        Animated.spring(fadeAnim, {
          toValue: 1,
          useNativeDriver: true,
          damping: 20,
          stiffness: 300,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          damping: 20,
          stiffness: 300,
        }),
      ]).start();
    }
  }, [currentStepIndex, steps.length]);

  // Capture pre-completion word count to avoid double-counting
  const preCompletionWordsRef = useRef<number | null>(null);

  // Trigger completion API when reaching the complete step
  useEffect(() => {
    if (
      currentStep?.type === 'complete' &&
      attemptId &&
      id &&
      !completionTriggered.current
    ) {
      // Snapshot words BEFORE incrementing so LessonComplete can animate correctly
      if (preCompletionWordsRef.current === null) {
        preCompletionWordsRef.current = totalWordsLearned;
      }

      completionTriggered.current = true;
      const scorePercent =
        totalQuestions > 0
          ? Math.round((score / totalQuestions) * 100)
          : undefined;

      completeLessonMutation
        .mutateAsync({ lessonId: id, attemptId, score: scorePercent })
        .then((result) => {
          incrementWords(result.wordsInLesson);
          advanceLesson();
          setProgress({
            currentStreak: result.currentStreak,
            longestStreak: result.longestStreak,
          });
        })
        .catch(() => {
          // Show completion screen anyway — progress syncs on next app open
        });
    }
  }, [currentStep?.type, attemptId, id]);

  const handleBack = useCallback(() => {
    prevStep();
  }, [prevStep]);

  const handleClose = useCallback(() => {
    if (currentStep?.type === 'entry' || currentStep?.type === 'complete') {
      reset();
      router.back();
      return;
    }

    Alert.alert(
      'Exit Lesson?',
      'Your progress in this lesson will be lost.',
      [
        { text: 'Stay', style: 'cancel' },
        {
          text: 'Exit',
          style: 'destructive',
          onPress: () => {
            reset();
            router.back();
          },
        },
      ],
    );
  }, [currentStep, reset, router]);

  const handleStart = useCallback(async () => {
    if (!content || !id) return;

    try {
      const result = await startLessonMutation.mutateAsync(id);
      initFlow({
        lessonId: id,
        attemptId: result.attemptId,
        wordCount: content.words.length,
        activityCount: content.activities.length,
      });
      nextStep();
    } catch {
      Alert.alert('Error', 'Failed to start lesson. Please try again.');
    }
  }, [content, id, startLessonMutation, initFlow, nextStep]);

  const handleContinueAfterComplete = useCallback(() => {
    reset();
    router.back();
  }, [reset, router]);

  const handleActivityComplete = useCallback(
    (correct: boolean) => {
      addScore(correct);
      nextStep();
    },
    [addScore, nextStep],
  );

  const handleMatchComplete = useCallback(
    (_allCorrect: boolean) => {
      addScore(true);
      nextStep();
    },
    [addScore, nextStep],
  );

  const handleQuickFireComplete = useCallback(
    (roundScore: number, total: number) => {
      for (let i = 0; i < total; i++) {
        addScore(i < roundScore);
      }
      nextStep();
    },
    [addScore, nextStep],
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  if (error || !content) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text variant="body" color={colors.error}>
          Failed to load lesson
        </Text>
      </SafeAreaView>
    );
  }

  // Before flow has started — show entry card
  if (steps.length === 0 || currentStep?.type === 'entry') {
    return (
      <SafeAreaView style={styles.container}>
        <ProgressBar progress={0} onClose={handleClose} />
        <LessonEntryCard
          lessonNumber={content.lesson.orderIndex}
          title={content.lesson.title}
          subtitle={content.lesson.subtitle}
          wordCount={content.lesson.wordCount}
          wordPreviews={content.words.map((w) => w.transliteration)}
          onStart={handleStart}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ProgressBar
        progress={progress}
        onClose={handleClose}
        onBack={handleBack}
        showBack={canGoBack()}
      />

      <Animated.View
        style={[
          styles.animatedContent,
          { opacity: fadeAnim, transform: [{ translateX: slideAnim }] },
        ]}
      >
      {currentStep?.type === 'word' && (
        <WordIntroduction
          word={content.words[currentStep.wordIndex]}
          onContinue={nextStep}
        />
      )}

      {currentStep?.type === 'mid-message' && content.midLessonMessage && (
        <MidLessonEncouragement
          message={content.midLessonMessage}
          wordCount={content.lesson.wordCount}
          activityCount={content.activities.length}
          onContinue={nextStep}
        />
      )}

      {currentStep?.type === 'activity' && (
        <ActivityRenderer
          activity={content.activities[currentStep.activityIndex]}
          words={content.words}
          onComplete={handleActivityComplete}
          onMatchComplete={handleMatchComplete}
          onQuickFireComplete={handleQuickFireComplete}
        />
      )}

      {currentStep?.type === 'complete' && (
        <LessonComplete
          wordsInLesson={content.lesson.wordCount}
          totalWordsLearned={
            (preCompletionWordsRef.current ?? totalWordsLearned) +
            content.lesson.wordCount
          }
          celebrationStat={content.celebrationStat}
          activityScore={score}
          activityTotal={totalQuestions}
          onContinue={handleContinueAfterComplete}
        />
      )}
      </Animated.View>
    </SafeAreaView>
  );
}

function ActivityRenderer({
  activity,
  words,
  onComplete,
  onMatchComplete,
  onQuickFireComplete,
}: {
  activity: LessonActivity;
  words: WordWithDetails[];
  onComplete: (correct: boolean) => void;
  onMatchComplete: (allCorrect: boolean) => void;
  onQuickFireComplete: (score: number, total: number) => void;
}) {
  const payload = activity.payload as Record<string, unknown>;

  switch (activity.type) {
    case 'MATCH': {
      const rawPairs = (payload.pairs as Array<{ arabic: string; meaning: string }>) ?? [];
      const pairs = rawPairs.map((p) => {
        const word = words.find((w) => w.arabic === p.arabic);
        return { ...p, transliteration: word?.transliteration };
      });
      return (
        <ActivityMatch
          key={activity.id}
          pairs={pairs}
          onComplete={onMatchComplete}
        />
      );
    }

    case 'QUICK_FIRE': {
      const rounds =
        (payload.rounds as Array<{
          arabic: string;
          options: string[];
          correctIndex: number;
        }>) ?? [];
      return (
        <ActivityQuickFire
          key={activity.id}
          rounds={rounds}
          onComplete={onQuickFireComplete}
        />
      );
    }

    case 'FILL_MEANING': {
      const p = payload as {
        arabic: string;
        prompt: string;
        options: string[];
        correctIndex: number;
      };
      return (
        <ActivityFillMeaning
          key={activity.id}
          arabic={p.arabic}
          prompt={p.prompt}
          options={p.options}
          correctIndex={p.correctIndex}
          onComplete={onComplete}
        />
      );
    }

    case 'SPOT_IN_QURAN': {
      // Find the word and its first ayah highlight
      const wordOrderIndex = (payload as { wordOrderIndex?: number }).wordOrderIndex;
      const word = words.find(
        (w) => w.orderIndex === wordOrderIndex,
      );
      if (!word || !word.ayahHighlights?.[0]) {
        // Fallback: skip this activity
        onComplete(true);
        return null;
      }
      return (
        <ActivitySpotInQuran
          key={activity.id}
          targetWord={word.arabic}
          targetMeaning={word.meaning}
          ayah={word.ayahHighlights[0]}
          onComplete={onComplete}
        />
      );
    }

    default:
      return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  animatedContent: {
    flex: 1,
  },
  centered: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
