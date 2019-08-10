//var sql = require('mysql2');
var models  = require('../models');

module.exports = {

	getConsultaot :  function (req, res, next){
		var strconsultaot='';
		var unidadeslist = null, datosconsultaot=null;
		var AnioSel = req.user.JsonAnioFiltro.toString().trim();	
		
		strconsultaot=`SELECT dbo.UTI_Otrabajo.IdOT,
		dbo.GLO_FU_FormatoFechaHora(dbo.UTI_Otrabajo.FechaOT) AS FechaOT, 
		 dbo.UTI_Otrabajo.IdEstado, dbo.UTI_Estados.NombreEstado, dbo.UTI_Otrabajo.IdMarca, 
         dbo.UTI_HUM_Empleadosdepurados.ApellidosEmpleado + ' ' + dbo.UTI_HUM_Empleadosdepurados.NombresEmpleado AS NombreEmpleado, 
         dbo.UTI_Otrabajo.IdUnidad, dbo.UTI_Unidad.NombreUnidad + ' -> ' + dbo.UTI_LugarSolicitud.NombreLugar AS NombreUnidad, dbo.UTI_Otrabajo.CodigoActivoFijo, dbo.UTI_FIJ_ActivosFijos.NombreActivoFijo + ' ' + dbo.UTI_Otrabajo.CodigoActivoFijo AS NombreActivoFijo, 
         dbo.UTI_Otrabajo.Resumen, dbo.UTI_Otrabajo.CodigoTecnico, dbo.UTI_Tecnico.ApellidoTecnico + ' ' + dbo.UTI_Tecnico.NombreTecnico AS NombreTecnico, 
         dbo.GLO_FU_FormatoFechaHora(dbo.UTI_Otrabajo.FechaResolucion) AS FechaResolucion 
		 FROM dbo.UTI_Otrabajo INNER JOIN
	     dbo.UTI_HUM_Empleadosdepurados ON dbo.UTI_Otrabajo.IdMarca = dbo.UTI_HUM_Empleadosdepurados.IdMarca INNER JOIN
	     dbo.UTI_Unidad ON dbo.UTI_Otrabajo.IdUnidad = dbo.UTI_Unidad.IdUnidad INNER JOIN
	     dbo.UTI_FIJ_ActivosFijos ON dbo.UTI_Otrabajo.CodigoActivoFijo = dbo.UTI_FIJ_ActivosFijos.CodigoActivoFijo INNER JOIN
	     dbo.UTI_Tecnico ON dbo.UTI_Otrabajo.CodigoTecnico = dbo.UTI_Tecnico.CodigoTecnico INNER JOIN
	     dbo.UTI_Estados ON dbo.UTI_Otrabajo.IdEstado = dbo.UTI_Estados.IdEstado  INNER JOIN 
		 dbo.UTI_LugarSolicitud ON dbo.UTI_Otrabajo.IdLugar = dbo.UTI_LugarSolicitud.IdLugar
		 WHERE YEAR(UTI_Otrabajo.FechaOT) `+ AnioSel;
		
		models.UTI_Unidad.findAll({attributes: ['IdUnidad','NombreUnidad']}).then(allunidades =>{
			unidadeslist = JSON.parse(JSON.stringify(allunidades));
										
			models.sequelize.query(strconsultaot, 
				{ type: models.sequelize.QueryTypes.SELECT}).then(datosqueryot =>{
					datosconsultaot = JSON.parse(JSON.stringify(datosqueryot));
			
				res.render('pantallas/OTconsulta', {
					isAuthenticated : req.isAuthenticated(),
					user : req.user,
					unidadeslist : unidadeslist,
					datosconsultaot : datosconsultaot
					}
				);
				
			}).catch(Error => {
				console.log('Error para el registro: ' + Error);
			});//query ot							
															
		}).catch(Error => {
			console.log('Error para el registro: ' + Error);
		});//allunidades

	},
	
	getTrazaot :function (req, res, next){
		var validOT = req.params.IdOTvalue;
		var strconsultatraza='';
		var datostrazaot=null;	
		
		strconsultatraza=`SELECT [dbo].[UTI_Estados].[NombreEstado] AS [NombreEstadoNuevo]
		,[dbo].[GLO_FU_FormatoFechaHora]([dbo].[UTI_CambioEstadoOT].[Fecha]) AS [Fecha]
		,[dbo].[UTI_CambioEstadoOT].[CodigoTecnico]
		+ ' (' + [dbo].[UTI_Tecnico].[ApellidoTecnico] + ' ' + [dbo].[UTI_Tecnico].[NombreTecnico] + ')' AS TecnicoAsignado
		,UPPER([dbo].[UTI_CambioEstadoOT].[Comentario]) AS [Comentario]
		FROM [dbo].[UTI_CambioEstadoOT] INNER JOIN [dbo].[UTI_Estados]
		ON [dbo].[UTI_CambioEstadoOT].[IdEstadoNuevo] = [dbo].[UTI_Estados].[IdEstado]
		INNER JOIN [dbo].[UTI_Tecnico]
		ON [dbo].[UTI_CambioEstadoOT].[CodigoTecnico] = [dbo].[UTI_Tecnico].[CodigoTecnico]
		WHERE ISNULL([dbo].[UTI_CambioEstadoOT].[IdEstadoAnterior],0) <> [dbo].[UTI_CambioEstadoOT].[IdEstadoNuevo]
		AND [dbo].[UTI_CambioEstadoOT].[IdOT] = ${validOT}
		ORDER BY [IdOT], [IdCambioEstado]`;
		
		models.sequelize.query(strconsultatraza, 
			{ type: models.sequelize.QueryTypes.SELECT}).then(datosqueryot =>{
				datostrazaot = JSON.parse(JSON.stringify(datosqueryot));
		
			res.json(
					{datostrazaot : datostrazaot}
			);
			
		}).catch(Error => {
			console.log('Error para el registro: ' + Error);
		});//query ot							
															
	}
	

};