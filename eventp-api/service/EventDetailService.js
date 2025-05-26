const EventDetailRepository = require('../repository/EventDetailRepository.js');

class EventDetailService {

  // Get all events from the database
  static async getAllEvents(req, res) {
    console.log('Fetching all events ', req, res);
    try {
      const events = await EventDetailRepository.getAllEvents();
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving events', error });
    }
  }

  // Lookup an event by its ID
  static async getEventById(req, res) {
    const eventId = req.params.id;
    try {
      const event = await EventDetailRepository.getEventById(eventId);
      if (event) {
        res.status(200).json(event);
      } else {
        res.status(404).json({ message: 'Event not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving event', error });
    }
  }

  // Create a new event
  static async createEvent(req, res) {
    const newEvent = req.body;
    try {
      const createdEvent = await EventDetailRepository.createEvent(newEvent);
      res.status(201).json(createdEvent);
    } catch (error) {
      res.status(500).json({ message: 'Error creating event', error });
    }
  }

  // Update an existing event
  static async updateEvent(req, res) {
    const eventId = req.params.id;
    const updatedEvent = req.body;
    try {
      const event = await EventDetailRepository.updateEvent(eventId, updatedEvent);
      if (event) {
        res.status(200).json(event);
      } else {
        res.status(404).json({ message: 'Event not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating event', error });
    }
  }

  // Delete an event
  static async deleteEvent(req, res) {
    const eventId = req.params.id;
    try {
      const deletedEvent = await EventDetailRepository.deleteEvent(eventId);
      if (deletedEvent) {
        res.status(200).json({ message: 'Event deleted successfully' });
      } else {
        res.status(404).json({ message: 'Event not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting event', error });
    }
  }
}

module.exports = EventDetailService;