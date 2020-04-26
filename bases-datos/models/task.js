'use strict';
const socketClient = require('../realtime/client');

module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    'Task',
    {
      description: DataTypes.TEXT,
    },
    {}
  );
  Task.associate = function (models) {
    // associations can be defined here
    Task.belongsTo(models.User, {
      as: 'user',
    });

    Task.belongsToMany(models.Category, {
      as: 'categories',
      through: 'TaskCategories',
    });
  };

  Task.afterCreate(function onAfterCreate(task, options) {
    socketClient.emit('new_task', task);
  });
  return Task;
};
