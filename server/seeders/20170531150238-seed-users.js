const bcrypt = require('bcrypt');

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Users', [{
      username: 'admin',
      firstname: 'admin',
      lastname: 'admin',
      email: 'admin@admin.com',
      password: bcrypt.hashSync('password123',10),
      role: 3,
      loggedin: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'chibujax',
      firstname: 'jax',
      lastname: 'jax',
      email: 'chibujax@jax.com',
      password: bcrypt.hashSync('password123',10),
      role: 1,
      loggedin: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'facilitator',
      firstname: 'faci',
      lastname: 'tilator',
      email: 'facilitator@facilitator.com',
      password: bcrypt.hashSync('password123',10),
      role: 2,
      loggedin: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('Users', null, {
      returning: true
    });
  }
};