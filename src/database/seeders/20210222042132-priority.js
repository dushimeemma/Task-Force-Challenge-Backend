module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Priorities',
      [
        {
          status: 'LOW',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          status: 'MIDDLE',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          status: 'HIGH',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Priorities', null, {});
  },
};
