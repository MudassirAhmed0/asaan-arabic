import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { challengesApi } from '../api/challenges';

export function useTodayChallenge() {
  return useQuery({
    queryKey: ['challenges', 'today'],
    queryFn: challengesApi.getTodayChallenge,
  });
}

export function useSubmitAttempt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      challengeId,
      answer,
    }: {
      challengeId: string;
      answer?: number;
    }) => challengesApi.submitAttempt(challengeId, answer),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['challenges', 'today'] });
    },
  });
}
