const Datastore = require('nedb');
const path = require('path');

// Initialize NeDB for users
const userDB = new Datastore({
  filename: path.join(__dirname, '../../data/users.db'),
  autoload: true,
});

// Define the users to be added
const users = [
  { id: 1, name: 'Kaiser', email: 'a76936@ualg.pt' },
  { id: 2, name: 'Mongo', email: 'mongol@mongo.com' },
  { id: 3, name: 'Estebe', email: 'baguetao@gmail.com' },
];

// Function to add users to the database
const addUsers = () => {
  users.forEach(user => {
    userDB.insert(user, (err, newUser) => {
      if (err) {
        console.error('Error adding user:', err);
      } else {
        console.log(`User added with ID: ${newUser.id}`);
      }
    });
  });
};

// Run the function
addUsers();