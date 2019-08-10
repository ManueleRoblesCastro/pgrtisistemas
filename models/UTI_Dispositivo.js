'use strict';
//module.exports = (sequelize, DataTypes) => {
module.exports = function(sequelize, Sequelize) {

  var UTI_Dispositivo = sequelize.define('UTI_Dispositivo', {
      
    codigo_dispositivo: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      get() {
        return this.getDataValue('codigo_dispositivo');
      },
      set(val) {
        this.setDataValue('codigo_dispositivo', val);
      }
    },
    nombre: {
      type: Sequelize.STRING(100),
      allowNull: true,
      get() {
        return this.getDataValue('nombre');
      },
      set(val) {
        this.setDataValue('nombre', val);
      }
    },
    descripcion: {
      type: Sequelize.STRING(100),
      allowNull: true,
      get() {
        return this.getDataValue('descripcion');
      },
      set(val) {
        this.setDataValue('descripcion', val);
      }
    }      
      
  },  
  {
    timestamps: false,
    freezeTableName: true,
    tableName: 'UTI_Dispositivo'
  },
  {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
  });
  return UTI_Dispositivo;
};