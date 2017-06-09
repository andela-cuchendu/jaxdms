module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Documents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        trim: true,
        required: true
      },
      creator: {
        type: Sequelize.STRING,
        trim: true,
        required: true
      },      
      content: {
        type: Sequelize.STRING(5000),
        allowNull: false
      },
      access: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      UserId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'UserId'
        }
      }
    }),
  down: (queryInterface /* , Sequelize */ ) =>
    queryInterface.dropTable('Documents')
};