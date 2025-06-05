const EventUserRepository = require('../repository/EventUserRepository');

class EventUserService {
    // Get all users for a specific event
    static async getUsersByEventId(req, res) {
        try {
            const eventId = req.params.eventId;
            const users = await EventUserRepository.getUsersByEventId(eventId);
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get all events for a specific user
    static async getEventsByUserId(req, res) {
        try {
            const userId = req.params.userId;
            const events = await EventUserRepository.getEventsByUserId(userId);
            res.status(200).json(events);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Add a user to an event
    static async addUserToEvent(req, res) {
        try {
            const { event_detail_id, user_detail_id } = req.body;
            const newEntry = await EventUserRepository.addUserToEvent(event_detail_id, user_detail_id);
            res.status(201).json(newEntry);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Remove a user from an event
    static async removeUserFromEvent(req, res) {
        try {
            const { event_detail_id, user_detail_id } = req.body;
            const removedEntry = await EventUserRepository.removeUserFromEvent(event_detail_id, user_detail_id);
            res.status(200).json(removedEntry);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = EventUserService;