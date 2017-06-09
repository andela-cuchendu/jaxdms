module.exports = (sequelize, DataTypes) => {
  const Documents = sequelize.define('Documents', {
    title: {
      type: DataTypes.STRING,
      trim: true,
      required: true
    },
    creator: {
      type: DataTypes.STRING,
      trim: true,
      required: true
    },    
    content: {
      type: DataTypes.STRING,
      trim: true
    },
    access: {
      type: DataTypes.INTEGER,
      default: 1
    }
  }, {
    classMethods: {
      associate: (models) => {
        Documents.belongsTo(models.Users, {
          foreignKey: 'UserId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Documents;
};