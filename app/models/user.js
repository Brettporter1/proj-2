
module.exports = function (sequelize, Sequelize) {

    const User = sequelize.define("User", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstname: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                // length must be at least 1
                len: [1]
            }
        },
        lastname: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                // length must be at least 1
                len: [1]
            }
        },
         email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            // minimum length of 6
            len: [6]
        },
    });
    //     weight: {
    //         type: Sequelize.INTEGER,
    //         allowNull: false,
    //         // weight max 550, min 80
    //         validate: {
    //             isInt: true,
    //             min: 80,
    //             max: 550
    //         }
    //     },
    //     height: {
    //         type: Sequelize.INTEGER,
    //         allowNull: false,
    //         validate: {
    //             isInt: true
    //         }
    //     },
    //     // storing gender as integer for array selection, value = integer
    //     gender: {
    //         type: Sequelize.STRING,
    //         allowNull: false
    //     }
    // });

    User.associate = function (models) {
        User.hasMany(models.Form, {
            onDelete: "cascade"
        });
    };
    return User;

}