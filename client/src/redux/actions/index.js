import {
  ADD_PHOTOS,
  REPLACE_PHOTOS,
  SELECT_ROVER,
  SET_LOADING,
  SET_MAX_SOL,
  SET_SELECTED_SOL,
  SET_AVAILABLE_CAMERAS,
  SET_TOTAL_PICTURES,
  SET_MANIFEST_SOLS,
  SET_SELECTED_CAMERA
} from "../constants/action_types";

export const addPhotos = payload => {
  console.log('photo action add', payload)
  return { type: ADD_PHOTOS, payload }
}

export const replacePhotos = payload => {
  return { type: REPLACE_PHOTOS, payload }
}

export const selectRover = payload => {
  return { type: SELECT_ROVER, payload }
}

export const setLoading = payload => {
  return { type: SET_LOADING, payload }
}

export const setMaxSol = payload => {
  return { type: SET_MAX_SOL, payload }
}

export const setSelectedSol = payload => {
  return { type: SET_SELECTED_SOL, payload }
}

export const setAvailableCameras = payload => {
  return { type: SET_AVAILABLE_CAMERAS, payload }
}

export const setTotalPictures = payload => {
  return { type: SET_TOTAL_PICTURES, payload }
}

export const setManifestSols = payload => {
  return { type: SET_MANIFEST_SOLS, payload }
}

export const setSelectedCamera = payload => {
  return { type: SET_SELECTED_CAMERA, payload }
}