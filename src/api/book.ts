import { post, get } from '@/utils/request';

export const getQuestion = () => {
    return get('/');
  };

// returns the database question and answers, get it from request.ts