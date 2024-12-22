const Datastore = require('nedb');
const path = require('path');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10; // Number of hashing rounds for bcrypt

/**
 * Initializes NeDB datastore for users.
 * @type {Datastore}
 */
const userDB = new Datastore({
  filename: path.join(__dirname, '../../data/users.db'),
  autoload: true,
});

/**
 * Represents a user.
 * @typedef {Object} User
 * @property {number} id - Unique identifier for the user.
 * @property {string} name - Name of the user.
 * @property {string} email - Email of the user.
 * @property {string} password - Hashed password of the user.
 */

/**
 * Array of users to be added.
 * @type {User[]}
 */
const users = [
  {
    id: 1,
    name: 'DAW',
    email: 'DAW@ualg.pt',
    password: 'plainPassword1',
  },
  {
    id: 2,
    name: 'Kaiser',
    email: 'Kaiser@ualg.pt',
    password: 'plainPassword2',
  },
  {
    id: 3,
    name: 'a76936',
    email: 'a76936@ualg.pt',
    password: 'plainPassword3',
  },
];

/**
 * Hashes a plain text password.
 * @param {string} plainPassword - The plain text password to hash.
 * @returns {Promise<string>} The hashed password.
 */
const hashPassword = async (plainPassword) => {
  try {
    const hashed = await bcrypt.hash(plainPassword, SALT_ROUNDS);
    return hashed;
  } catch (err) {
    console.error('Error hashing password:', err);
    throw err;
  }
};

/**
 * Adds users to the database with hashed passwords.
 */
const addUsers = async () => {
  for (const user of users) {
    try {
      const hashedPassword = await hashPassword(user.password);
      const userToInsert = {
        id: user.id,
        name: user.name,
        email: user.email,
        password: hashedPassword,
      };
      
      userDB.insert(userToInsert, (err, newUser) => {
        if (err) {
          console.error('Error adding user:', err);
        } else {
          console.log(`User added with ID: ${newUser.id}`);
        }
      });
    } catch (error) {
      console.error(`Failed to add user ${user.name}:`, error);
    }
  }
};

// Run the function
addUsers();