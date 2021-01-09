import { ADD_PHOTOS } from "../constants/action_types";
import { ADD_NUMBER } from "../constants/action_types";

export const addPhotos = (payload) => {
  console.log('photo action add', payload)
  return { type: ADD_PHOTOS, payload }
}

export const addNumber = (payload) => {
  return { type: ADD_NUMBER, payload }
}