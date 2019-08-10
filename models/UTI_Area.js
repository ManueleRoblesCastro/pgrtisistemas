'use strict';
//module.exports = (sequelize, DataTypes) => {
module.exports = function(sequelize, Sequelize) {

  var UTI_Area = sequelize.define('UTI_Area', {
    IdArea : {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      get() {
        return this.getDataValue('IdArea');
      },
      set(val) {
        this.setDataValue('IdArea', val);
      }
    },
    NombreArea : {
      type: Sequelize.STRING(50),
      allowNull: false,
      get() {
        return this.getDataValue('NombreArea');
      },
      set(val) {
        this.setDataValue('NombreArea', val.toUpperCase());
      }
    },
    DescripcionArea : {
      type: Sequelize.STRING(200),
      allowNull: false,
      get() {
        return this.getDataValue('DescripcionArea');
      },
      set(val) {
        this.setDataValue('DescripcionArea', val.toUpperCase());
      }
    },   
    ActivoArea : {
      type: Sequelize.STRING(1),
      allowNull: false,
      get() {
        return this.getDataValue('ActivoArea');
      },
      set(val) {
        this.setDataValue('ActivoArea', val);
      }
    }
  },  
  {
    timestamps: false,
    freezeTableName: true,
    tableName: 'UTI_Area'
  },
  {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
  });
  return UTI_Area;
};