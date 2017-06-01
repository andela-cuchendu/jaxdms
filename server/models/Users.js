module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      sparse: true,
      trim: true
    },
    username: {
      type: DataTypes.STRING,
      sparse: true,
      unique: true,
      required: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.NUMERIC,
      default: 1
    },
    loggedin: {
      type: DataTypes.BOOLEAN,
      default: false
    }
  }, {
    classMethods: {
      associate: (models) => {
        Users.hasMany(models.Documents, {
          foreignKey: 'UserId',
          as: 'UserIDocuments'
        });
      }
    }
  });
  return Users;
};