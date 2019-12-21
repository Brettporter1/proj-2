const Sequelize = require('sequelize');
const db = require('./index').sequelize;

const Alc = db.define('alc', {
    kind:{
        type: Sequelize.STRING
    },
    name:{
        type: Sequelize.STRING
    },
    percentage:{
        type: Sequelize.INTEGER
    }
});

module.exports = Alc