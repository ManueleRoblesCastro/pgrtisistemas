'use strict';
//module.exports = (sequelize, DataTypes) => {
module.exports = function(sequelize, Sequelize) {

  var UTI_FIJ_ActivosFijos = sequelize.define('UTI_FIJ_ActivosFijos', {
      
  CodigoActivoFijo: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
      get() {
        return this.getDataValue('CodigoActivoFijo');
      },
      set(val) {
        this.setDataValue('CodigoActivoFijo', val);
      }
    },
    NombreActivoFijo: {
      type: Sequelize.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('NombreActivoFijo');
      },
      set(val) {
        this.setDataValue('NombreActivoFijo', val);
      }
    },
    DescripcionActivoFijo: {
      type: Sequelize.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('DescripcionActivoFijo');
      },
      set(val) {
        this.setDataValue('DescripcionActivoFijo', val);
      }
    }
      
  },  
  {
    timestamps: false,
    freezeTableName: true,
    tableName: 'UTI_FIJ_ActivosFijos'
  },
  {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
  });
  return UTI_FIJ_ActivosFijos;
};