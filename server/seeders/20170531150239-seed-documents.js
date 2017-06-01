
module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Documents', [{
      title: 'title1',
      content: 'content1',
      access: -1,
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'title2',
      content: 'content2',
      access: -2,
      UserId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'title3',
      content: 'content3',
      access: -3,
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