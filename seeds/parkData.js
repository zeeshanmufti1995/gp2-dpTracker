const { Park } = require('../models');

const parkdata = [
  {
    park_name: 'Minnehaha Off-Leash Recreational Area',
  },
  {
    park_name: 'Elm Creek Off Leash Dog Park',
  },
  {
    park_name: 'Carlson Dog Park',
  },
  {
    park_name: 'Rice Creek Off-Leash Dog Area',
  },
  {
    park_name: 'High Bridge Dog Park',
  },
  {
    park_name: 'Gateway Dog Park - Off-Leash Dog Area',
  },
  {
    park_name: 'Battle Creek Dog Park',
  },
  {
    park_name: 'Woodview Off Leash Dog Area',
  },
  {
    park_name: 'Plymouth Dog Area',
  },
  {
    park_name: 'Unleashed Hounds and Hops',
  },
];

const seedPark = () => Park.bulkCreate(parkdata);

module.exports = seedPark;
