/* require dependencies */
const { sequelize } = require("../database");
const { Model, DataTypes } = require("sequelize");

/* init model */
class Reply extends Model {};

Reply.init(
    /* model attributes */
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    /* model options */
    {
        sequelize,
        modelName: "reply"
    }
);

module.exports = Reply;