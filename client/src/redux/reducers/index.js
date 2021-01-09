import {
  ADD_PHOTOS,
  REPLACE_PHOTOS,
  SELECT_ROVER,
  SET_AVAILABLE_CAMERAS,
  SET_LOADING,
  SET_MANIFEST_SOLS,
  SET_MAX_SOL,
  SET_SELECTED_CAMERA,
  SET_SELECTED_SOL,
  SET_TOTAL_PICTURES
} from "../constants/action_types";


const initialState = {
  photos: [],
  selectedRover: '',
  loading: false,
  maxSol: '',
  selectedSol: '',
  availableCameras: [],
  totalPictures: 0,
  manifestSols: [],
  selectedCamera: '',
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload }
    case ADD_PHOTOS:
      const { photos } = state;
      const new_photos = action.payload;
      return { ...state, photos: [...photos, ...new_photos] }
    case REPLACE_PHOTOS:
      return { ...state, photos: action.payload }
    case SELECT_ROVER:
      return { ...state, selectedRover: action.payload }
    case SET_MAX_SOL:
      return { ...state, maxSol: action.payload }
    case SET_SELECTED_SOL:
      return { ...state, selectedSol: action.payload }
    case SET_AVAILABLE_CAMERAS:
      return { ...state, availableCameras: action.payload }
    case SET_TOTAL_PICTURES:
      return { ...state, totalPictures: action.payload }
    case SET_MANIFEST_SOLS:
      return { ...state, manifestSols: action.payload }
    case SET_SELECTED_CAMERA:
      return { ...state, selectedCamera: action.payload }
    default:
      console.log('default reducer ran', action.type)
      return state;
  }
}

export default rootReducer;