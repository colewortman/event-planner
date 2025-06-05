const pool = require('../config/db');

class EventUserRepository {
    // Get all users for a specific event
    static async getUsersByEventId(eventId) {
        const result = await pool.query(
            'SELECT user_detail_id FROM eventp.eventuser WHERE event_detail_id = $1',
            [eventId]
        );
        return result.rows;
    }

    // Get all events for a specific user
    static async getEventsByUserId(userId) {
        const result = await pool.query(
            'SELECT event_detail_id FROM eventp.eventuser WHERE user_detail_id = $1',
            [userId]
        );
        return result.rows;
    }

    // Add a user to an event
    static async addUserToEvent(eventId, userId) {
        const result = await pool.query(
            'INSERT INTO eventp.eventuser (event_detail_id, user_detail_id) VALUES ($1, $2) RETURNING *',
            [eventId, userId]
        );
        return result.rows[0];
    }

    // Remove a user from an event
    static async removeUserFromEvent(eventId, userId) {
        const result = await pool.query(
            'DELETE FROM eventp.eventuser WHERE event_detail_id = $1 AND user_detail_id = $2 RETURNING *',
            [eventId, userId]
        );
        return result.rows[0];
    }
}

module.exports = EventUserRepository;