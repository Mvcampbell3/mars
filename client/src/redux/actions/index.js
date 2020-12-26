import { ADD_PHOTOS } from "../constants/action_types";

export const addPhotos = (payload) => {
  return { type: ADD_PHOTOS, payload }
}