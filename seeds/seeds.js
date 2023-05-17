const sequelize = require('../config/connection');
const { User, Thought } = require('../models');

const userData = require('./userData.json');
const thoughtData = require('./thoughtData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

    await Thought.bulkCreate(thoughtData,{
      individualHooks: true,
      returning: true,
    });


  process.exit(0);
};

seedDatabase();