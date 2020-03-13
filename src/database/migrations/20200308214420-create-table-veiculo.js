'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('veiculo', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      placa: {
        type: Sequelize.STRING,
        allowNull: false
      },
      capacidade_carga: {
        type: Sequelize.STRING,
        allowNull: true
      },
      consumo_medio: {
        type: Sequelize.STRING,
        allowNull: true
      },
      tipo_combustivel: {
        type: Sequelize.STRING,
        allowNull: true
      },
      num_max_paradas: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      tempo_max_horas: {
        type: Sequelize.STRING,
        allowNull: true
      },
      distancia_max: {
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      tipo_viagem: {
        type: Sequelize.STRING,
        allowNull: true
      },
      pessoa_id: {
        type: Sequelize.INTEGER,
        references: { model: 'pessoa', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
