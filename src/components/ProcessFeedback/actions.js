import { 
  SHOW_PROCESS_FEEDBACK,
  CLOSE_PROCESS_FEEDBACK,
} from './constants';

export const showProcessFeedback = (settings) => {
  return {
    type: SHOW_PROCESS_FEEDBACK,
    settings,
  };
}

export const closeProcessFeedback = () => {
  return {
    type: CLOSE_PROCESS_FEEDBACK
  }
}