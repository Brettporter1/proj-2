module.exports = function(sequelize, DataTypes) {
  let Form = sequelize.define("Form", {
    hours: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true
      }
    },
    // this code is just placeholder for form questions to come
    hours: {
      text: DataTypes.STRING,
      description: DataTypes.TEXT
    }
  });

  Form.associate = function(models) {
    Form.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Form;
};
