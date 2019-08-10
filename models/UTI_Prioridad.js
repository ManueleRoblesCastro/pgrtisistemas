'use strict';
//module.exports = (sequelize, DataTypes) => {
module.exports = function(sequelize, Sequelize) {

  var UTI_Prioridad = sequelize.define('UTI_Prioridad', {
        
    IdPrioridad: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      get() {
        return this.getDataValue('IdPrioridad');
      },
      set(val) {
        this.setDataValue('IdPrioridad', val);
      }
    },
    NombrePrioridad: {
      type: Sequelize.STRING(50),
      allowNull: false,
      get() {
        return this.getDataValue('NombrePrioridad');
      },
      set(val) {
        this.setDataValue('NombrePrioridad', val);
      }
    },
    ActivoPrioridad: {
      type: Sequelize.CHAR(1),
      allowNull: true,
      get() {
        return this.getDataValue('ActivoPrioridad');
      },
      set(val) {
        this.setDataValue('ActivoPrioridad', val);
      }
    }        
        
  },  
  {
    timestamps: false,
    freezeTableName: true,
    tableName: 'UTI_Prioridad'
  },
  {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
  });
  return UTI_Prioridad;
};