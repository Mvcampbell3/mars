import axios from 'axios';

const nasaAPI = {
  getRoverPictures: (rover, sol, cameras) => {
    return axios.get(`/api/photos/${rover}/${[cameras]}/${sol}`)
  },
  getRoverManifest: (rover) => {
    return axios.get(`/api/manifest/${rover}`)
  }
}

export default nasaAPI;