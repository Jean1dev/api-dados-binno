'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('rota', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      rota_calculada: {
        type: Sequelize.STRING,
        allowNull: false
      },
      criado_por: {
        type: Sequelize.INTEGER,
        references: { model: 'pessoa', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false
      },
      enviado_para: {
        type: Sequelize.INTEGER,
        references: { model: 'pessoa', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false
      },
      confimada: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      observacoes: {
        type: Sequelize.STRING,
        allowNull: true
      },
      finalizada: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      }

    })
  },

  down: (queryInterface, Sequelize) => {
    
  }
};
