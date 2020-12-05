const router = require("express").Router();
const nasaAPI = require('../../utils/axios');

router.get('/', (req, res) => {
  nasaAPI.getRoverPictures('opportunity', ['fhaz', 'rhaz'], 45)
    .then(result => {
      res.json(result.data);
    })
    .catch(err => {
      res.json(err)
    })
})

router.get('/manifest/:rover', (req, res) => {
  nasaAPI.getRoverManifest(req.params.rover)
    .then(result => {
      res.json(result.data);
    })
    .catch(err => {
      res.json(err)
    })
})

module.exports = router;