import {
  UPDATE_STEP
} from '../actions/types';
const initialState = {
  step: null,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_STEP:
      return {
        ...state,
        step: action.payload,
      };
    default:
      return state;
  }
}
