import axios from 'axios';

const nasaReactAPI = {
  getRoverPictures: () => {

  },
  getRoverManifest: (rover) => {
    return axios.get(`/api/manifest/${rover}`)
  }
}

export default nasaReactAPI;