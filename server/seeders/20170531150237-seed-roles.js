module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Roles', [{
        title: 'admin',
        access: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'facilitator',
        access: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'fellow',
        access: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'public',
        access: -1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'private',
        access: -2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Roles', null, {
      returning: true
    });
  }
};