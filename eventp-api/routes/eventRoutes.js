const express = require('express');
const router = express.Router();
const EventDetailService = require('../service/EventDetailService');

router.get('/events', EventDetailService.getAllEvents);
router.get('/events/:id', EventDetailService.getEventById);
router.post('/events', EventDetailService.createEvent);
router.put('/events/:id', EventDetailService.updateEvent);
router.delete('/events/:id', EventDetailService.deleteEvent);

module.exports = router;