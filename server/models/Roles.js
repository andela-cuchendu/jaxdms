module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    title: {
      type: DataTypes.STRING,
      trim: true,
      required: true,
    },
    access: {
      type: DataTypes.INTEGER,
      default: 1,
    },
  }, {
    classMethods: {},
  });
  return Roles;
};
