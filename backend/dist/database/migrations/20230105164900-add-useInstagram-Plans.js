"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface) => {
        return queryInterface.addColumn("Plans", "useInstagram", {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true
        });
    },
    down: (queryInterface) => {
        return queryInterface.removeColumn("Plans", "useInstagram");
    }
};
