import axios from 'axios';

const nasaAPI = {
  getRoverPictures: (rover, sol, cameras) => {
    return axios.get(`/api/photos/${rover}/${[cameras]}/${sol}`)
  },
  getRoverManifest: (rover) => {
    return axios.get(`/api/manifest/${rover}`)
  }
}

const serverAPI = {
  loginUser: (email, password) => {
    return axios.post('/api/users/login', { email, password })
  },
  createUser: (email, password) => {
    return axios.post('api/users/create', { email, password })
  }
}

export {
  serverAPI
}

export default nasaAPI;