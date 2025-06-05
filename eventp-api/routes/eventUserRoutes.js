const express = require('express');
const router = express.Router();
const EventUserService = require('../service/EventUserService');

router.get('/event/:eventId', EventUserService.getUsersByEventId);
router.get('/user/:userId', EventUserService.getEventsByUserId);
router.post('/add', EventUserService.addUserToEvent);
router.delete('/remove', EventUserService.removeUserFromEvent);

module.exports = router;