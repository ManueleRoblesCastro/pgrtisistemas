'use strict';
//module.exports = (sequelize, DataTypes) => {
module.exports = function(sequelize, Sequelize) {

  var UTI_Rol = sequelize.define('UTI_Rol', {
    IdRol : {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      get() {
        return this.getDataValue('IdRol');
      },
      set(val) {
        this.setDataValue('IdRol', val);
      }
    },
    NombreRol : {
      type: Sequelize.STRING(10),
      allowNull: false,
      get() {
        return this.getDataValue('NombreRol');
      },
      set(val) {
        this.setDataValue('NombreRol', val.toUpperCase());
      }
    }, 
    DescripcionRol : {
      type: Sequelize.STRING(200),
      allowNull: false,
      get() {
        return this.getDataValue('DescripcionRol');
      },
      set(val) {
        this.setDataValue('DescripcionRol', val.toUpperCase());
      }
    },   
    ActivoRol : {
      type: Sequelize.STRING(1),
      allowNull: false,
      get() {
        return this.getDataValue('ActivoRol');
      },
      set(val) {
        this.setDataValue('ActivoRol', val);
      }
    }
  },  
  {
    timestamps: false,
    freezeTableName: true,
    tableName: 'UTI_Rol'
  },
  {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
  });
  return UTI_Rol;
};