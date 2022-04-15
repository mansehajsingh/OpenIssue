/* require dependencies */
const { sequelize } = require("../database");
const { Model, DataTypes } = require("sequelize");

/* init model */
class Issue extends Model {};

Issue.init(
    /* model attributes */
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },
    /* model options */
    {
        sequelize,
        modelName: "issue"
    }
);

module.exports = Issue;