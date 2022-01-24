const { Park } = require("../models");

const parkdata = [
  {
    park_name: "Donec posuere metus vitae ipsum.",
  },
  {
    park_name: "Morbi non quam nec dui luctus rutrum.",
  },
  {
    park_name:
      "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.",
  },
  {
    park_name: "Nunc purus.",
  },
  {
    park_name: "Pellentesque eget nunc.",
  },
  {
    park_name: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
  },
  {
    park_name: "In hac habitasse platea dictumst.",
  },
  {
    park_name: "Morbi non quam nec dui luctus rutrum.",
  },
  {
    park_name: "Duis ac nibh.",
  },
  {
    park_name: "Curabitur at ipsum ac tellus semper interdum.",
  },
  {
    park_name: "In hac habitasse platea dictumst.",
  },
  {
    park_name: "Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.",
  },
  {
    park_name: "Donec dapibus.",
  },
  {
    park_name: "Nulla tellus.",
  },
  {
    park_name:
      "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.",
  },
  {
    park_name:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam.",
  },
  {
    park_name: "In hac habitasse platea dictumst.",
  },
  {
    park_name: "Etiam justo.",
  },
  {
    park_name: "Nulla ut erat id mauris vulputate elementum.",
  },
  {
    park_name:
      "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
  },
];

const seedParks = () => Park.bulkCreate(parkdata);

module.exports = seedParks;
