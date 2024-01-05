const usernames = [
    // usernames
];

const emails = [
    //emails
]

const thoughts = [
    //thoughts
]

// Function to generate random usernames
const getRandomUsername = () => usernames[Math.floor(Math.random() * usernames.length)];

// Function to generate random emails
const getRandomEmail = () => emails[Math.floor(Math.random() * emails.length)];

// Function to generate random thoughts
const getRandomThought = () => thoughts[Math.floor(Math.random() * thoughts.length)];

module.exports = {
  getRandomUsername,
  getRandomEmail,
  getRandomThought,
};