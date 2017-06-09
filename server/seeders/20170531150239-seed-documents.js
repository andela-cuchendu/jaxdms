
module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Documents', [{
      title: 'title1',
      content: 'content1',
      creator: 'admin',
      access: -1,
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'title2',
      content: 'content2',
      creator: 'chibujax',
      access: -2,
      UserId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'title3',
      content: 'content3',
      creator: 'user',
      access: 2,
      UserId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Documents', null, {
      returning: true
    });
  }
};