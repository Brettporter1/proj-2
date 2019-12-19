module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // length must be at least 1
        len: [1]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      // minimum length of 6
      len: [6]
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // weight max 550, min 80
      validate: {
        isInt: true,
        min: 80,
        max: 550
      }
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true
      }
    },
    // storing gender as integer for array selection, value = integer
    gender: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  User.associate = function(models) {
    User.hasMany(models.Form, {
      onDelete: "cascade"
    });
  };
  return User;
};
