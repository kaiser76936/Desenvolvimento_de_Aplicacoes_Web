import { Router, Request, Response } from 'express';
import { userDB, addUser } from '../utils/database';
import { User } from '../models/user';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;//defines the number of hashing rounds bcrypt uses to generate a salt for hashing passwords
const router = Router();

/**
 * Hashes a password using bcrypt.
 * @param password - The plain text password.
 * @returns The hashed password.
 */
const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(password, salt);
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
      res.status(500).send('Error fetching users');
    } else {
      res.json(users);
    }
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
      res.status(500).send('Error fetching user');
    } else if (user) {
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
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const { id } = await addUser({ name, email, password: hashedPassword });
    res.status(201).json({ id, name, email });
  } catch (error) {
    console.error('Registration error:', error);
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
        if (err) reject(err);
        else resolve(doc);
      });
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({ userId: user.id });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Login failed');
  }
});

export const userController = router;
