const express = require('express');
const router = express.Router();
const UserDetailService = require('../service/UserDetailService');

router.get('/users', UserDetailService.getAllUsers);
router.get('/users/:id', UserDetailService.getUserById);
router.post('/users', UserDetailService.createUser);
router.put('/users/:id', UserDetailService.updateUser);
router.delete('/users/:id', UserDetailService.deleteUser);

module.exports = router;