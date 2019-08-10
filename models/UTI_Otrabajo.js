'use strict';
var moment = require('moment');
//module.exports = (sequelize, DataTypes) => {
module.exports = function(sequelize, Sequelize) {

  var UTI_Otrabajo = sequelize.define('UTI_Otrabajo', {
        
    IdOT: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      get() {
        return this.getDataValue('IdOT');
      },
      set(val) {
        this.setDataValue('IdOT', val);
      }
    },
    FechaOT: {
      type: Sequelize.DATE,
      allowNull: false,
      get() {
        return this.getDataValue('FechaOT');
        //return moment.utc(this.getDataValue('FechaOT')).format('YYYY-MM-DD hh:mm');
      },
      set(val) {
        this.setDataValue('FechaOT', val);
        //this.setDataValue('FechaOT', moment(val).format('YYYY-MM-DD hh:mm'));
      }
    },
    IdMarca: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'UTI_HUM_Empleadosdepurados',
        key: 'IdMarca'
      },
      get() {
        return this.getDataValue('IdMarca');
      },
      set(val) {
        this.setDataValue('IdMarca', val);
      }
    },
    IdUnidad: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'UTI_Unidad',
        key: 'IdUnidad'
      },
      get() {
        return this.getDataValue('IdUnidad');
      },
      set(val) {
        this.setDataValue('IdUnidad', val);
      }
    },
    IdLugar: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'UTI_LugarSolicitud',
        key: 'IdLugar'
      },
      get() {
        return this.getDataValue('IdLugar');
      },
      set(val) {
        this.setDataValue('IdLugar', val);
      }
    },
    CodigoActivoFijo: {
      type: Sequelize.STRING(21),
      allowNull: true,
      references: {
        model: 'UTI_FIJ_ActivosFijos',
        key: 'CodigoActivoFijo'
      },
      get() {
        return this.getDataValue('CodigoActivoFijo');
      },
      set(val) {
        this.setDataValue('CodigoActivoFijo', val);
      }
    },
    Resumen: {
      type: Sequelize.STRING(250),
      allowNull: true,
      get() {
        return this.getDataValue('Resumen');
      },
      set(val) {
        this.setDataValue('Resumen', val);
      }
    },
    IdPrioridad: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'UTI_Prioridad',
        key: 'IdPrioridad'
      },
      get() {
        return this.getDataValue('IdPrioridad');
      },
      set(val) {
        this.setDataValue('IdPrioridad', val);
      }
    },
    IdEstado: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'UTI_Estados',
        key: 'IdEstado'
      },
      get() {
        return this.getDataValue('IdEstado');
      },
      set(val) {
        this.setDataValue('IdEstado', val);
      }
    },
    IdTipo_OT: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: '0',
      references: {
        model: 'UTI_Tipo_OT',
        key: 'IdTipo_OT'
      },
      get() {
        return this.getDataValue('IdTipo_OT');
      },
      set(val) {
        this.setDataValue('IdTipo_OT', val);
      }
    },
    IdSubTipo_OT: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: '0',
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
    IdCategoria_OT: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: '0',
      references: {
        model: 'UTI_Categoria_OT',
        key: 'IdCategoria_OT'
      },
      get() {
        return this.getDataValue('IdCategoria_OT');
      },
      set(val) {
        this.setDataValue('IdCategoria_OT', val);
      }
    },
    codigo_dispositivo: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: '0',
      references: {
        model: 'UTI_Dispositivo',
        key: 'codigo_dispositivo'
      },
      get() {
        return this.getDataValue('codigo_dispositivo');
      },
      set(val) {
        this.setDataValue('codigo_dispositivo', val);
      }
    },
    CodigoTecnico: {
      type: Sequelize.STRING(10),
      allowNull: true,
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
    FechaResolEsp: {
      type: Sequelize.DATEONLY,
      allowNull: true,
      get() {
        //return this.getDataValue('FechaResolEsp');
        return moment.utc(this.getDataValue('FechaResolEsp')).format('YYYY-MM-DD');
      },
      set(val) {
        this.setDataValue('FechaResolEsp', val);
      }
    },
    FechaResolucion: {
      type: Sequelize.DATE,
      allowNull: true,
      get() {
        return this.getDataValue('FechaResolucion');
      },
      set(val) {
        this.setDataValue('FechaResolucion', val);
      }
    },
    DetalleSolucion: {
      type: Sequelize.STRING(250),
      allowNull: true,
      get() {
        return this.getDataValue('DetalleSolucion');
      },
      set(val) {
        this.setDataValue('DetalleSolucion', val);
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
    Reasignar: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: '0',
      get() {
        return this.getDataValue('Reasignar');
      },
      set(val) {
        this.setDataValue('Reasignar', val);
      }
    },
    IdMarca1: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: '0',
      get() {
        return this.getDataValue('IdMarca1');
      },
      set(val) {
        this.setDataValue('IdMarca1', val);
      }
    },
    IdUnidad1: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: '0',
      get() {
        return this.getDataValue('IdUnidad1');
      },
      set(val) {
        this.setDataValue('IdUnidad1', val);
      }
    },
    IdLugar1: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: '0',
      get() {
        return this.getDataValue('IdLugar1');
      },
      set(val) {
        this.setDataValue('IdLugar1', val);
      }
    }   
  },  
  {
    timestamps: false,
    freezeTableName: true,
    tableName: 'UTI_Otrabajo', 
    hasTrigger: true
  },
  {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
  });
  return UTI_Otrabajo;
};