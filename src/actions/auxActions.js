import {
    CONFIRM_PROFILE_UPDATE_FOR_CHAT
  } from './types';

  export const confirmProfileUpdateForChat = (payload) => ({
    type: CONFIRM_PROFILE_UPDATE_FOR_CHAT,
    payload
  });