import { View, Image, StyleSheet } from 'react-native';
import { forwardRef } from 'react';
import { Text } from '../ui/Text';
import { colors, spacing } from '../../constants/theme';

// ── Types ──

type CardVariant = 'lesson' | 'practice' | 'review' | 'words';

interface ShareCardProps {
  variant: CardVariant;
  // Lesson complete
  wordCount?: number;
  ayahStat?: string;
  // Practice
  score?: number;
  total?: number;
  totalVocab?: number;
  // Review
  weekNumber?: number;
  recallPercent?: number;
}

// ── Color Schemes ──

const SCHEMES = {
  lesson: { bg: '#042f2e', text: '#FFFFFF', accent: '#D4A843', secondary: 'rgba(255,255,255,0.6)' },
  practice: { bg: '#F5F0EB', text: '#042f2e', accent: '#0D7377', secondary: '#5B6370' },
  review: { bg: '#0D7377', text: '#FFFFFF', accent: '#D4A843', secondary: 'rgba(255,255,255,0.7)' },
  words: { bg: '#042f2e', text: '#FFFFFF', accent: '#D4A843', secondary: 'rgba(255,255,255,0.6)' },
};

// ── Content Renderers ──

function LessonContent({ wordCount, ayahStat, scheme }: { wordCount: number; ayahStat: string; scheme: typeof SCHEMES.lesson }) {
  return (
    <>
      <Text style={[styles.contextLabel, { color: scheme.secondary }]}>Lesson Complete</Text>
      <Text style={[styles.bigNumber, { color: scheme.accent }]}>{wordCount}</Text>
      <Text style={[styles.bigLabel, { color: scheme.text }]}>Qur'anic words learned</Text>
      <View style={[styles.divider, { backgroundColor: scheme.accent }]} />
      <Text style={[styles.stat, { color: scheme.secondary }]}>{ayahStat}</Text>
    </>
  );
}

function PracticeContent({ score, total, totalVocab, scheme }: { score: number; total: number; totalVocab: number; scheme: typeof SCHEMES.practice }) {
  return (
    <>
      <Text style={[styles.contextLabel, { color: scheme.secondary }]}>Practice Score</Text>
      <Text style={[styles.bigNumber, { color: scheme.accent }]}>{score}/{total}</Text>
      <Text style={[styles.bigLabel, { color: scheme.text }]}>correct answers</Text>
      <View style={[styles.divider, { backgroundColor: scheme.accent }]} />
      <Text style={[styles.stat, { color: scheme.secondary }]}>{totalVocab} Qur'anic words in my vocabulary</Text>
    </>
  );
}

function ReviewContent({ score, total, weekNumber, recallPercent, scheme }: { score: number; total: number; weekNumber: number; recallPercent: number; scheme: typeof SCHEMES.review }) {
  return (
    <>
      <Text style={[styles.contextLabel, { color: scheme.secondary }]}>Weekly Review</Text>
      <Text style={[styles.bigNumber, { color: scheme.accent }]}>{score}/{total}</Text>
      <Text style={[styles.bigLabel, { color: scheme.text }]}>Week {weekNumber}</Text>
      <View style={[styles.divider, { backgroundColor: scheme.accent }]} />
      <Text style={[styles.stat, { color: scheme.secondary }]}>{recallPercent}% recall rate</Text>
    </>
  );
}

function WordsContent({ wordCount, scheme }: { wordCount: number; scheme: typeof SCHEMES.words }) {
  return (
    <>
      <Text style={[styles.contextLabel, { color: scheme.secondary }]}>My Vocabulary</Text>
      <Text style={[styles.bigNumber, { color: scheme.accent }]}>{wordCount}</Text>
      <Text style={[styles.bigLabel, { color: scheme.text }]}>Qur'anic words I know</Text>
      <View style={[styles.divider, { backgroundColor: scheme.accent }]} />
      <Text style={[styles.stat, { color: scheme.secondary }]}>Building understanding, one word at a time</Text>
    </>
  );
}

// ── Main Component ──

export const ShareCard = forwardRef<View, ShareCardProps>(function ShareCard(props, ref) {
  const { variant } = props;
  const scheme = SCHEMES[variant];

  return (
    <View ref={ref} style={[styles.card, { backgroundColor: scheme.bg }]} collapsable={false}>
      {/* Top: Icon + Brand */}
      <View style={styles.topSection}>
        <Image
          source={require('../../../assets/icon.png')}
          style={styles.icon}
        />
        <Text style={[styles.brandName, { color: scheme.text }]}>Asaan Arabic</Text>
      </View>

      {/* Middle: Content */}
      <View style={styles.content}>
        {variant === 'lesson' && (
          <LessonContent
            wordCount={props.wordCount ?? 0}
            ayahStat={props.ayahStat ?? ''}
            scheme={scheme}
          />
        )}
        {variant === 'practice' && (
          <PracticeContent
            score={props.score ?? 0}
            total={props.total ?? 0}
            totalVocab={props.totalVocab ?? 0}
            scheme={scheme}
          />
        )}
        {variant === 'review' && (
          <ReviewContent
            score={props.score ?? 0}
            total={props.total ?? 0}
            weekNumber={props.weekNumber ?? 0}
            recallPercent={props.recallPercent ?? 0}
            scheme={scheme}
          />
        )}
        {variant === 'words' && (
          <WordsContent
            wordCount={props.wordCount ?? 0}
            scheme={scheme}
          />
        )}
      </View>

      {/* Bottom: Handle + Tagline */}
      <View style={styles.bottomSection}>
        <Text style={[styles.handle, { color: scheme.secondary }]}>@asaanarabic.app</Text>
        <Text style={[styles.tagline, { color: scheme.accent, opacity: 0.8 }]}>Samajh ke Parho</Text>
      </View>
    </View>
  );
});


const styles = StyleSheet.create({
  card: {
    width: 360,
    height: 640,
    paddingHorizontal: 32,
    paddingVertical: 40,
    justifyContent: 'space-between',
  },

  // Top
  topSection: {
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 12,
  },
  brandName: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },

  // Content
  content: {
    alignItems: 'center',
    gap: 8,
  },
  contextLabel: {
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 4,
  },
  bigNumber: {
    fontSize: 80,
    fontWeight: '800',
    lineHeight: 88,
  },
  bigLabel: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  divider: {
    width: 40,
    height: 3,
    borderRadius: 2,
    marginVertical: 12,
  },
  stat: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: spacing.md,
  },

  // Bottom
  bottomSection: {
    alignItems: 'center',
    gap: 4,
  },
  handle: {
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
  },
});
