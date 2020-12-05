import axios from 'axios';

const nasaAPI = {
  getRoverPictures: () => {

  },
  getRoverManifest: (rover) => {
    return axios.get(`/api/manifest/${rover}`)
  }
}

export default nasaAPI;