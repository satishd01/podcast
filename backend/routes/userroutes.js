const express = require('express');
const router = express.Router();
const userController = require('../controller/usercontroller'); 

router.post('/userinfo', userController.createUserInfo);

router.get('/userinfo', userController.getAllUserInfo);

router.get('/userinfo/:id', userController.getUserInfoById);

router.delete('/userinfo/:id', userController.deleteUserInfo);

router.put('/userinfo/:id', userController.updateUserInfo);


module.exports = router;
