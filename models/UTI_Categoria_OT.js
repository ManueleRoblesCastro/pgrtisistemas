 'use strict';
//module.exports = (sequelize, DataTypes) => {
module.exports = function(sequelize, Sequelize) {

  var UTI_Categoria_OT = sequelize.define('UTI_Categoria_OT', {

    IdCategoria_OT: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      get() {
        return this.getDataValue('IdCategoria_OT');
      },
      set(val) {
        this.setDataValue('IdCategoria_OT', val);
      }
    },
    IdSubTipo_OT: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'UTI_SubTipo_OT',
        key: 'IdSubTipo_OT'
      },
      get() {
        return this.getDataValue('IdSubTipo_OT');
      },
      set(val) {
        this.setDataValue('IdSubTipo_OT', val);
      }
    },
    Descripcion: {
      type: Sequelize.STRING(150),
      allowNull: true,
      get() {
        return this.getDataValue('Descripcion');
      },
      set(val) {
        this.setDataValue('Descripcion', val);
      }
    },
    ActivoCategoria_OT: {
      type: Sequelize.CHAR(1),
      allowNull: true,
      get() {
        return this.getDataValue('ActivoCategoria_OT');
      },
      set(val) {
        this.setDataValue('ActivoCategoria_OT', val);
      }
    },
    Peso: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: '0',
      get() {
        return this.getDataValue('Peso');
      },
      set(val) {
        this.setDataValue('Peso', val);
      }
    },
    CodigoTecnico: {
      type: Sequelize.STRING(10),
      allowNull: false,
      references: {
        model: 'UTI_Tecnico',
        key: 'CodigoTecnico'
      },
      get() {
        return this.getDataValue('CodigoTecnico');
      },
      set(val) {
        this.setDataValue('CodigoTecnico', val);
      }
    },
    CodigoTecnico1: {
      type: Sequelize.STRING(10),
      allowNull: false,
      references: {
        model: 'UTI_Tecnico',
        key: 'CodigoTecnico'
      },
      get() {
        return this.getDataValue('CodigoTecnico1');
      },
      set(val) {
        this.setDataValue('CodigoTecnico1', val);
      }
    }        
        
  },  
  {
    timestamps: false,
    freezeTableName: true,
    tableName: 'UTI_Categoria_OT'
  },
  {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
  });
  return UTI_Categoria_OT;
};