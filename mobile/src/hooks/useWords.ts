import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { wordsApi } from '../api/words';

export function useReviewWords() {
  return useQuery({
    queryKey: ['words', 'review'],
    queryFn: wordsApi.getReview,
  });
}

export function useCompleteReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: wordsApi.completeReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['words', 'review'] });
    },
  });
}
