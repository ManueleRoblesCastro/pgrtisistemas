'use strict';
//module.exports = (sequelize, DataTypes) => {
module.exports = function(sequelize, Sequelize) {

  var UTI_Unidad = sequelize.define('UTI_Unidad', {
      
    IdUnidad: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      get() {
        return this.getDataValue('IdUnidad');
      },
      set(val) {
        this.setDataValue('IdUnidad', val);
      }
    },
    NombreUnidad: {
      type: Sequelize.STRING(60),
      allowNull: false,
      get() {
        return this.getDataValue('NombreUnidad');
      },
      set(val) {
        this.setDataValue('NombreUnidad', val);
      }
    },
    DescripcionUnidad: {
      type: Sequelize.STRING(200),
      allowNull: true,
      get() {
        return this.getDataValue('DescripcionUnidad');
      },
      set(val) {
        this.setDataValue('DescripcionUnidad', val);
      }
    },
    ActivoUnidad: {
      type: Sequelize.CHAR(1),
      allowNull: false,
      get() {
        return this.getDataValue('ActivoUnidad');
      },
      set(val) {
        this.setDataValue('ActivoUnidad', val);
      }
    }
  },  
  {
    timestamps: false,
    freezeTableName: true,
    tableName: 'UTI_Unidad'
  },
  {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
  });
  return UTI_Unidad;
};