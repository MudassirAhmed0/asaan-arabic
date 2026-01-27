import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { lessonsApi } from '../api/lessons';

export function useLessonList() {
  return useQuery({
    queryKey: ['lessons'],
    queryFn: lessonsApi.listLessons,
  });
}

export function useLessonContent(lessonId: string) {
  return useQuery({
    queryKey: ['lessons', lessonId],
    queryFn: () => lessonsApi.getLessonContent(lessonId),
    enabled: !!lessonId,
  });
}

export function useStartLesson() {
  return useMutation({
    mutationFn: (lessonId: string) => lessonsApi.startLesson(lessonId),
  });
}

export function useCompleteLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      lessonId,
      attemptId,
      score,
    }: {
      lessonId: string;
      attemptId: string;
      score?: number;
    }) => lessonsApi.completeLesson(lessonId, { attemptId, score }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
}
