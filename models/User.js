/* require dependencies */
const { sequelize } = require("../database");
const { Model, DataTypes } = require("sequelize");

/* init model */
class User extends Model {};

User.init(
    /* model attributes */
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true
        },
        first_name: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        hashed_password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    /* model options */
    {
        sequelize,
        modelName: "User"
    }
);

module.exports = User;