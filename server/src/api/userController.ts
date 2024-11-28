import { Router, Request, Response } from 'express';
import { userDB, addUser } from '../utils/database';
import { User } from '../models/user';
import crypto from 'crypto';

const router = Router();

/**
 * Hashes a password using SHA-256.
 * @param password - The plain text password.
 * @returns The hashed password in hexadecimal format.
 */
const hashPassword = (password: string): string => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

/**
 * Get all users.
 *
 * @param req - Express request object
 * @param res - Express response object
 */
router.get('/', (req, res) => {
  userDB.find({}, (err: Error | null, users: User[]) => {
    if (err) {
      return res.status(500).send('Error fetching users');
    }
    res.json(users);
  });
});

/**
 * Get user by ID.
 *
 * @param req - Express request object
 * @param res - Express response object
 */
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

/**
 * Create a new user.
 *
 * @param req - Express request object
 * @param res - Express response object
 */
router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = hashPassword(password);
    const { id } = await addUser({ name, email, password: hashedPassword });
    res.status(201).json({ id, name, email });
  } catch (error) {
    res.status(500).send('Error creating user');
  }
});

/**
 * User login.
 *
 * @param req - Express request object
 * @param res - Express response object
 */
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await new Promise<User | null>((resolve, reject) => {
      userDB.findOne({ email }, (err, doc) => {
        if (err) return reject(err);
        resolve(doc);
      });
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const hashedPassword = hashPassword(password);
    if (hashedPassword !== user.password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({ userId: user.id });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export const userController = router;