import { api } from './client';
import type {
  LessonListItem,
  LessonContentResponse,
  LessonStartResponse,
  LessonCompleteResponse,
} from '../types';

export const lessonsApi = {
  listLessons: async (): Promise<LessonListItem[]> => {
    const { data } = await api.get('/lessons');
    return data;
  },

  getLessonContent: async (lessonId: string): Promise<LessonContentResponse> => {
    const { data } = await api.get(`/lessons/${lessonId}`);
    return data;
  },

  startLesson: async (lessonId: string): Promise<LessonStartResponse> => {
    const { data } = await api.post(`/lessons/${lessonId}/start`);
    return data;
  },

  completeLesson: async (
    lessonId: string,
    body: { attemptId: string; score?: number },
  ): Promise<LessonCompleteResponse> => {
    const { data } = await api.post(`/lessons/${lessonId}/complete`, body);
    return data;
  },
};
