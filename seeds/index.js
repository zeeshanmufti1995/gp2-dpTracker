const sequelize = require('../config/connection');
const seedPark = require('./parkData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedPark();

  process.exit(0);
};

seedAll();