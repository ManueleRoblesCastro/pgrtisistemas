'use strict';
//module.exports = (sequelize, DataTypes) => {
module.exports = function(sequelize, Sequelize) {

  var UTI_Tipo_OT = sequelize.define('UTI_Tipo_OT', {
    
    IdTipo_OT: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      get() {
        return this.getDataValue('IdTipo_OT');
      },
      set(val) {
        this.setDataValue('IdTipo_OT', val);
      }
    },
    NombreTipoOT: {
      type: Sequelize.STRING,
      allowNull: true,
      get() {
        return this.getDataValue('NombreTipoOT');
      },
      set(val) {
        this.setDataValue('NombreTipoOT', val);
      }
    },
    ActivoTipo_OT: {
      type: Sequelize.CHAR(1),
      allowNull: true,
      get() {
        return this.getDataValue('ActivoTipo_OT');
      },
      set(val) {
        this.setDataValue('ActivoTipo_OT', val);
      }
    }
  },  
  {
    timestamps: false,
    freezeTableName: true,
    tableName: 'UTI_Tipo_OT'
  },
  {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
  });
  return UTI_Tipo_OT;
};