const axios = require('axios');

const nasaAPI = {
  getRoverPictures(rover, cameras, sol) {
    let reqURL = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}`;
    if (cameras.length > 0) {
      cameras.forEach(camera => {
        if (camera !== 'all') {
          reqURL += `&camera=${camera}`;
        }
      })
    }
    reqURL += `&api_key=${process.env.NASA_KEY}`;
    return axios.get(reqURL)
  },
  getRoverManifest(rover) {
    let reqURL = `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${process.env.NASA_KEY}`
    return axios.get(reqURL)
  }
}

module.exports = nasaAPI;