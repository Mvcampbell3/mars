import { ADD_PHOTOS } from "../constants/action_types";

const initialState = {
  photos: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PHOTOS:
      return Object.assign({}, state, {
        photos: state.photos.concat(action.payload)
      });
    default:
      return state;
  }
}

export default rootReducer;