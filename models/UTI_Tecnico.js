'use strict';
//module.exports = (sequelize, DataTypes) => {
module.exports = function(sequelize, Sequelize) {

  var UTI_Tecnico = sequelize.define('UTI_Tecnico', {
    CodigoTecnico : {
      type: Sequelize.STRING(10),
      primaryKey: true,
      get() {
        return this.getDataValue('CodigoTecnico');
      },
      set(val) {
        this.setDataValue('CodigoTecnico', val.toUpperCase());
      }
    },
    IdArea: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'UTI_Area',
        key: 'IdArea'
      },
      get() {
        return this.getDataValue('IdArea');
      },
      set(val) {
        this.setDataValue('IdArea', val);
      }
    },
    IdRol: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'UTI_Rol',
        key: 'IdRol'
      },
      get() {
        return this.getDataValue('IdRol');
      },
      set(val) {
        this.setDataValue('IdRol', val);
      }
    },
    NombreTecnico : {
      type: Sequelize.STRING(60),
      allowNull: false,
      get() {
        return this.getDataValue('NombreTecnico');
      },
      set(val) {
        this.setDataValue('NombreTecnico', val.toUpperCase());
      }
    },
    ApellidoTecnico : {
      type: Sequelize.STRING(60),
      allowNull: false,
      get() {
        return this.getDataValue('ApellidoTecnico');
      },
      set(val) {
        this.setDataValue('ApellidoTecnico', val.toUpperCase());
      }
    },
    ActivoTecnico : {
      type: Sequelize.STRING(1),
      allowNull: false,
      get() {
        return this.getDataValue('ActivoTecnico');
      },
      set(val) {
        this.setDataValue('ActivoTecnico', val);
      }
    },        
    ClaveTecnico : {
      type: Sequelize.STRING(10),
      allowNull: true,
      get() {
        return this.getDataValue('ClaveTecnico');
      },
      set(val) {
        this.setDataValue('ClaveTecnico', val);
      }      
    },    
    CodigoTecnicoSupervisor : {
      type: Sequelize.STRING(10),
      allowNull: false,
      get() {
        return this.getDataValue('CodigoTecnicoSupervisor');
      },
      set(val) {
        this.setDataValue('CodigoTecnicoSupervisor', val.toUpperCase());
      }
    },
    CorreoE : {
      type: Sequelize.STRING(50),
      allowNull: false,
      get() {
        return this.getDataValue('CorreoE');
      },
      set(val) {
        this.setDataValue('CorreoE', val);
      }
    }    
  }, 
  {
    timestamps: false,
    freezeTableName: true,
    tableName: 'UTI_Tecnico'
  },
  {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
  });
  return UTI_Tecnico;
};