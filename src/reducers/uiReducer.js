import {
  UPDATE_STEP,
  CREATE_TRANSACTION,
} from '../actions/types';
const initialState = {
  step: CREATE_TRANSACTION,
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
