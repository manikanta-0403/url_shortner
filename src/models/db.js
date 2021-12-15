
const { Sequelize, DataTypes } = require('sequelize');

const db = new Sequelize({

    dialect: 'postgres',
    database: 'shorturldb',
    username: 'postgres',
    password: '03032016'
})

const URLs = db.define('urls', {

    id: {
        primaryKey: true,
        type: DataTypes.BIGINT
    },
    shortCode: {
        type: DataTypes.STRING(7),
        unique: true
    },
    link:{
        type: DataTypes.TEXT,
        allowNull: false
    }
})
module.exports =  {
    db,
    URLs
}

