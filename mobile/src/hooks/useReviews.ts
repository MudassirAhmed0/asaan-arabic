import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewsApi } from '../api/reviews';

export function useCurrentReview() {
  return useQuery({
    queryKey: ['reviews', 'current'],
    queryFn: reviewsApi.getCurrent,
    staleTime: 0,
  });
}

export function useSubmitReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reviewsApi.submit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['words', 'learned'] });
      queryClient.invalidateQueries({ queryKey: ['words', 'practice'] });
    },
  });
}

export function useReviewHistory() {
  return useQuery({
    queryKey: ['reviews', 'history'],
    queryFn: reviewsApi.getHistory,
  });
}
