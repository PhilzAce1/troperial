import { UPDATE_STEP } from './types';

export const setStep = (step) => {
  return {
    type: UPDATE_STEP,
    payload: step,
  };
};
