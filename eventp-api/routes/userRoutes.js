const express = require('express');
const router = express.Router();
const UserDetailService = require('../service/UserDetailService');

router.get('/', UserDetailService.getAllUsers);
router.get('/:id', UserDetailService.getUserById);
router.get('/:username', UserDetailService.getUserByUsername);
router.post('/', UserDetailService.createUser);
router.put('/:id', UserDetailService.updateUser);
router.delete('/:id', UserDetailService.deleteUser);

module.exports = router;