import { ADD_PHOTOS, ADD_NUMBER } from "../constants/action_types";


const initialState = {
  photos: [],
  number: 0,
  seletecdRover: ''
};

const rootReducer = (state = initialState, action) => {
  console.log("action", action)
  switch (action.type) {
    case ADD_PHOTOS:
      const { photos } = state;
      const new_photos = action.payload;
      return { ...state, photos: [...photos, ...new_photos] }
    case ADD_NUMBER:
      const { number } = state;
      const add_num = action.payload;
      return { ...state, number: number + add_num }
    default:
      return state;
  }
}

export default rootReducer;