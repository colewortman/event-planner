const UserDetailRepository = require('../repository/UserDetailRepository');

class UserDetailService {

  // Get all users from the database
  static async getAllUsers(req, res) {
    console.log('Fetching all users ', req, res);
    try {
      const users = await UserDetailRepository.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving users', error });
    }
  }

  // Lookup a user by their ID
  static async getUserById(req, res) {
    const userId = req.params.id;
    try {
      const user = await UserDetailRepository.getUserById(userId);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving user', error });
    }
  }

  // Lookup a user by their username
  static async getUserByUsername(req, res) {
    const username = req.params.username;
    try {
      const user = await UserDetailRepository.getUserByUsername(username);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving user', error });
    }
  }

  // Create a new user
  static async createUser(req, res) {
    const newUser = req.body;
    try {
      const createdUser = await UserDetailRepository.createUser(newUser);
      res.status(201).json(createdUser);
    } catch (error) {
      res.status(500).json({ message: 'Error creating user', error });
    }
  }

  // Update an existing user
  static async updateUser(req, res) {
    const userId = req.params.id;
    const updatedUser = req.body;
    try {
      const user = await UserDetailRepository.updateUser(userId, updatedUser);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating user', error });
    }
  }

  // Delete a user
  static async deleteUser(req, res) {
    const userId = req.params.id;
    try {
      const deletedUser = await UserDetailRepository.deleteUser(userId);
      if (deletedUser) {
        res.status(200).json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error });
    }
  }
}

module.exports = UserDetailService;