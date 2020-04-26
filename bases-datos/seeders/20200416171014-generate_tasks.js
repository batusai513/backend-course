'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'tasks',
      [
        {
          id: 1,
          description: 'Curso de ejemplo',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          description: 'Curso de ejempl0 cosas del curso que van en la base de datos',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          description: 'mas cosas de ejemplo para la base de datos',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tasks', null, {});
  },
};
