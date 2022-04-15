/* require dependencies */
const { sequelize } = require("../database");
const { Model, DataTypes } = require("sequelize");

/* init model */
class Flair extends Model {};

Flair.init(
    /* model attributes */
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        value: {
            type: DataTypes.ENUM("bug", "question", "feature", "announcement", "misc"),
            allowNull: false,
        }
    },
    /* model options */
    {
        sequelize,
        modelName: "flair",
        indexes: [{
            unique: true,
            fields: ["id", "value"]
        }]
    }
);

module.exports = Flair;