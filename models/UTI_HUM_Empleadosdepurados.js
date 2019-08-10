'use strict';
//module.exports = (sequelize, DataTypes) => {
module.exports = function(sequelize, Sequelize) {

  var UTI_HUM_Empleadosdepurados = sequelize.define('UTI_HUM_Empleadosdepurados', {
    IdMarca: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      get() {
        return this.getDataValue('IdMarca');
      },
      set(val) {
        this.setDataValue('IdMarca', val);
      }
    },
    ApellidosEmpleado: {
      type: Sequelize.STRING(150),
      allowNull: false,
      get() {
        return this.getDataValue('ApellidosEmpleado');
      },
      set(val) {
        this.setDataValue('ApellidosEmpleado', val);
      }
    },
    NombresEmpleado: {
      type: Sequelize.STRING(150),
      allowNull: false,
      get() {
        return this.getDataValue('NombresEmpleado');
      },
      set(val) {
        this.setDataValue('NombresEmpleado', val);
      }
    },
    NombreUnidad: {
      type: Sequelize.STRING(250),
      allowNull: true,
      get() {
        return this.getDataValue('NombreUnidad');
      },
      set(val) {
        this.setDataValue('NombreUnidad', val);
      }
    },
    DUIEmpleado: {
      type: Sequelize.STRING(10),
      allowNull: true,
      get() {
        return this.getDataValue('DUIEmpleado');
      },
      set(val) {
        this.setDataValue('DUIEmpleado', val);
      }
    }
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: 'UTI_HUM_Empleadosdepurados'
  },
  {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
  });
  return UTI_HUM_Empleadosdepurados;
};