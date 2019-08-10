'use strict';
//module.exports = (sequelize, DataTypes) => {
module.exports = function(sequelize, Sequelize) {

  var UTI_Estados = sequelize.define('UTI_Estados', {
      
    IdEstado: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      get() {
        return this.getDataValue('IdEstado');
      },
      set(val) {
        this.setDataValue('IdEstado', val);
      }
    },
    NombreEstado: {
      type: Sequelize.STRING(50),
      allowNull: false,
      get() {
        return this.getDataValue('NombreEstado');
      },
      set(val) {
        this.setDataValue('NombreEstado', val);
      }
    },
    DescripcionEstado: {
      type: Sequelize.STRING(200),
      allowNull: true,
      get() {
        return this.getDataValue('DescripcionEstado');
      },
      set(val) {
        this.setDataValue('DescripcionEstado', val);
      }
    },
    ActivoEstado: {
      type: Sequelize.CHAR(1),
      allowNull: false,
      get() {
        return this.getDataValue('ActivoEstado');
      },
      set(val) {
        this.setDataValue('ActivoEstado', val);
      }
    }      
  },  
  {
    timestamps: false,
    freezeTableName: true,
    tableName: 'UTI_Estados'
  },
  {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
  });
  return UTI_Estados;
};