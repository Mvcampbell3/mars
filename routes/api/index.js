const router = require("express").Router();
const nasaAPI = require('../../utils/axios');
const userRoutes = require('./userRoutes');

router.use('/users', userRoutes)

router.get('/photos/:rover/:sol/:camera', (req, res) => {
  const { rover, sol, camera } = req.params;
  nasaAPI.getRoverPictures(rover, [camera], sol)
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