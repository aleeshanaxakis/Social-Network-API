const connection = require('../config/connection');
const { User, Thought, Reaction } = require('../models');
const { getRandomUsername, getRandomEmail, getRandomThought } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Delete collections if they exist
  await Promise.all([
    User.deleteMany({}),
    Thought.deleteMany({}),
    Reaction.deleteMany({}),
  ]);

  // Seed users
  const users = [];
  for (let i = 0; i < 10; i++) {
    users.push({
      username: getRandomUsername(),
      email: getRandomEmail(),
    });
  }
  const userSeedData = await User.insertMany(users);

  // Seed thoughts and reactions
  const thoughts = [];
  for (let i = 0; i < 20; i++) {
    const thoughtText = getRandomThought();
    const userId = userSeedData[Math.floor(Math.random() * userSeedData.length)]._id;

    const reactions = [];
    for (let j = 0; j < 5; j++) {
      reactions.push({
        reactionBody: `Reaction ${j + 1}`,
        username: getRandomUsername(),
      });
    }

    thoughts.push({
      thoughtText,
      username: getRandomUsername(),
      reactions,
      user: userId,
    });
  }

  await Thought.insertMany(thoughts);

  console.info('Seeding complete! 🌱');
  process.exit(0);
});