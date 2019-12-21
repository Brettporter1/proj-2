module.exports = function (sequelize, Sequelize) {
  var Form = sequelize.define("Form", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        isInt: true
      }
    },
    alc_percentage: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        isInt: true
      }
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false
    },
  });

  Form.associate = function (models) {
    Form.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Form;
};