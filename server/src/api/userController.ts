import { Router } from 'express';
import { userDB, addUser } from '../utils/database';
import { User } from '../models/user';

const router = Router();

// Get all users
router.get('/', (req, res) => {
  userDB.find({}, (err: Error | null, users: User[]) => {
    if (err) {
      return res.status(500).send('Error fetching users');
    }
    res.json(users);
  });
});

// Get user by ID
router.get('/:id', (req, res) => {
  userDB.findOne({ id: parseInt(req.params.id) }, (err: Error | null, user: User) => {
    if (err) {
      return res.status(500).send('Error fetching user');
    }
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  });
});

export const userController = router;