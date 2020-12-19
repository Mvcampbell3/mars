const router = require('express').Router();
const userController = require('../../../controllers/userController');

router.get('/', userController.findAllUsers);
router.post('/create', userController.createUser);
router.delete('/delete/:id', userController.deleteUser);
router.post('/login', userController.loginUser);
router.post('/verify', userController.checkUserToken)

module.exports = router;