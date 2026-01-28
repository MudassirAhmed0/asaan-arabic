import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { wordsApi } from '../api/words';
import type { WordStatus } from '../types';

export function useLearnedWords(search?: string, status?: WordStatus) {
  return useQuery({
    queryKey: ['words', 'learned', search, status],
    queryFn: () => wordsApi.getLearnedWords({ search, status }),
  });
}

export function useWordDetail(wordId: string) {
  return useQuery({
    queryKey: ['words', 'detail', wordId],
    queryFn: () => wordsApi.getWordDetail(wordId),
    enabled: !!wordId,
  });
}

export function useUpdateWordStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ wordId, status }: { wordId: string; status: WordStatus }) =>
      wordsApi.updateWordStatus(wordId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['words', 'learned'] });
      queryClient.invalidateQueries({ queryKey: ['words', 'detail'] });
      queryClient.invalidateQueries({ queryKey: ['words', 'practice'] });
    },
  });
}

export function usePractice(count?: number, status?: WordStatus) {
  return useQuery({
    queryKey: ['words', 'practice', count, status],
    queryFn: () => wordsApi.getPractice(count, status),
    staleTime: 0,
    placeholderData: (prev) => prev,
  });
}

export function useSubmitQuizResults() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: wordsApi.submitQuizResults,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['words', 'learned'] });
      queryClient.invalidateQueries({ queryKey: ['words', 'practice'] });
    },
  });
}
