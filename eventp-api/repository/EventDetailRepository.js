const pool = require('../config/db');

class EventDetailRepository {
    // Get all events from the database
    static async getAllEvents() {
        const result = await pool.query('SELECT * FROM eventp.event_detail ORDER BY event_detail_date DESC');
        return result.rows;
    }

    // Lookup an event by its ID
    static async getEventById(eventId) {
        const result = await pool.query('SELECT * FROM eventp.event_detail WHERE event_detail_id = $1', [eventId]);
        return result.rows[0];
    }

    // Create a new event
    static async createEvent(newEvent) {
        const { event_detail_created_by, event_detail_name, event_detail_description, event_detail_date, event_detail_time, event_detail_location, event_detail_capacity } = newEvent;
        const result = await pool.query(
            'INSERT INTO eventp.event_detail (event_detail_created_by, event_detail_name, event_detail_description, event_detail_date, event_detail_time, event_detail_location, event_detail_capacity) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [event_detail_created_by, event_detail_name, event_detail_description, event_detail_date, event_detail_time, event_detail_location, event_detail_capacity]
        );
        return result.rows[0];
    }

    // Update an existing event
    static async updateEvent(eventId, updatedEvent) {
        const { event_detail_created_by, event_detail_name, event_detail_description, event_detail_date, event_detail_time, event_detail_location, event_detail_capacity } = updatedEvent;
        const result = await pool.query(
            'UPDATE eventp.event_detail SET event_detail_created_by = $1, event_detail_name = $2, event_detail_description = $3, event_detail_date = $4, event_detail_time = $5, event_detail_location = $6, event_detail_capacity = $7 WHERE event_detail_id = $8 RETURNING *',
            [event_detail_created_by, event_detail_name, event_detail_description, event_detail_date, event_detail_time, event_detail_location, event_detail_capacity, eventId]
        );
        return result.rows[0];
    }

    // Delete an event
    static async deleteEvent(eventId) {
        const result = await pool.query('DELETE FROM eventp.event_detail WHERE event_detail_id = $1 RETURNING *', [eventId]);
        return result.rows[0];
    }
}

module.exports = EventDetailRepository;