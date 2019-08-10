'use strict';
//module.exports = (sequelize, DataTypes) => {
module.exports = function(sequelize, Sequelize) {

  var UTI_LugarSolicitud = sequelize.define('UTI_LugarSolicitud', {
      
    IdLugar: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      get() {
        return this.getDataValue('IdLugar');
      },
      set(val) {
        this.setDataValue('IdLugar', val);
      }
    },
    NombreLugar: {
      type: Sequelize.STRING(60),
      allowNull: false,
      get() {
        return this.getDataValue('NombreLugar');
      },
      set(val) {
        this.setDataValue('NombreLugar', val);
      }
    },
    DescripcionLugar: {
      type: Sequelize.STRING(200),
      allowNull: true,
      get() {
        return this.getDataValue('DescripcionLugar');
      },
      set(val) {
        this.setDataValue('DescripcionLugar', val);
      }
    },
    ActivoLugar: {
      type: Sequelize.CHAR(1),
      allowNull: false,
      get() {
        return this.getDataValue('ActivoLugar');
      },
      set(val) {
        this.setDataValue('ActivoLugar', val);
      }
    },
    CodigoProcuraduriaAuxiliar: {
      type: Sequelize.STRING(4),
      allowNull: true,
      get() {
        return this.getDataValue('CodigoProcuraduriaAuxiliar');
      },
      set(val) {
        this.setDataValue('CodigoProcuraduriaAuxiliar', val);
      }
    }      
      
  },  
  {
    timestamps: false,
    freezeTableName: true,
    tableName: 'UTI_LugarSolicitud'
  },
  {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
  });
  return UTI_LugarSolicitud;
};