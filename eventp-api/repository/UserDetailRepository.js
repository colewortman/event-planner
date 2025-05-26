const pool = require('../config/db');

class UserDetailRepository {
    // Get all users from the database
    static async getAllUsers() {
        const result = await pool.query('SELECT * FROM eventp.user_detail ORDER BY user_detail_id ASC');
        return result.rows;
    }

    // Lookup a user by their ID
    static async getUserById(userId) {
        const result = await pool.query('SELECT * FROM eventp.user_detail WHERE user_detail_id = $1', [userId]);
        return result.rows[0];
    }

    // Create a new user
    static async createUser(newUser) {
        const { user_detail_username, user_detail_password, user_detail_email } = newUser;
        result = await pool.query(
            'INSERT INTO eventp.user_detail (user_detail_username, user_detail_password, user_detail_email) VALUES ($1, $2, $3) RETURNING *',
            [user_detail_username, user_detail_password, user_detail_email]
        );
        return result.rows[0];
    }

    // Update an existing user
    static async updateUser(userId, updatedUser) {
        const { user_detail_username, user_detail_password, user_detail_email } = updatedUser;
        result = await pool.query(
            'UPDATE eventp.user_detail SET user_detail_username = $1, user_detail_password = $2, user_detail_email = $3 WHERE user_detail_id = $4 RETURNING *',
            [user_detail_username, user_detail_password, user_detail_email, userId]
        );
        return result.rows[0];
    }

    // Delete a user
    static async deleteUser(userId) {
        const result = await pool.query('DELETE FROM eventp.user_detail WHERE user_detail_id = $1 RETURNING *', [userId]);
        return result.rows[0];
    }
}

module.exports = UserDetailRepository;