const express = require('express');
const router = express.Router();
const EventDetailService = require('../service/EventDetailService');

router.get('/', EventDetailService.getAllEvents);
router.get('/:id', EventDetailService.getEventById);
router.post('/', EventDetailService.createEvent);
router.put('/:id', EventDetailService.updateEvent);
router.delete('/:id', EventDetailService.deleteEvent);

module.exports = router;