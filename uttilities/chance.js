const Chance = require('chance');
const chance = new Chance();

const generateRandomUserData = () => {

  const username = chance.first().toLowerCase(); 
  const email = `${username}@gmail.com`;
  return {
    firstname: username,
    lastname: chance.last().toLowerCase(),
    email: email,
    password: chance.string({ length: 8, alpha: true, numeric: true }),
  };
};

module.exports = {
  generateRandomUserData,
};
