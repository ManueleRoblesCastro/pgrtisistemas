var models  = require('../models');

module.exports = {
	
	getOTstableror : function (req, res, next){
		//console.log(req.user);
		var menusel = req.params.menu.trim();
		var varmenuselect = null;
		var datosxtablero = null;
		var AnioSel = req.user.JsonAnioFiltro.toString().trim();
						
		models.sequelize.query(`SELECT TOP(1) CodigoMenu, NombreMenu, AyudaMenu, CodigoMenuSuperior, ColorSemantic, IconoSemantic
			FROM UTI_SIS_MenusOperacion WHERE CodigoMenu='${menusel}'`, 
			{ type: models.sequelize.QueryTypes.SELECT}).then(datomenuselect =>{
			varmenuselect = JSON.parse(JSON.stringify(datomenuselect));
				
			models.sequelize.query(`SELECT UTI_OT.IdOT,
				UTI_Prioridad.NombrePrioridad, 
				UTI_Estados.NombreEstado,
				UTI_OT.Peso,
				CONVERT(varchar(25), UTI_OT.FechaOT, 120) AS FechaOT, 
				UTI_OT.Resumen, 
				UTI_Tipo_OT.NombreTipoOT + '--> ' + UTI_SubTipo_OT.Descripcion + '--> ' + ISNULL(UTI_Categoria_OT.Descripcion,'') AS Clasificacion,
				UTI_LugarSolicitud.NombreLugar + '-->' +  UTI_Unidad.NombreUnidad + '--> ' + UTI_HUM_Empleadosdepurados.NombresEmpleado + ' ' + UTI_HUM_Empleadosdepurados.ApellidosEmpleado AS UEmpleado,
				CONVERT(varchar(10), UTI_OT.FechaResolEsp, 120) AS FechaResolEsp,  
				(SELECT TOP(1) ISNULL(CONVERT(varchar(25),UTI_CambioEstadoOT.Fecha, 120), '')
				FROM UTI_CambioEstadoOT 
				WHERE UTI_CambioEstadoOT.IdEstadoNuevo=5 AND UTI_CambioEstadoOT.IdOT = UTI_OT.IdOT ) AS FechaResolucion,
				UTI_OT.IdEstado, 
				UTI_Tecnico.NombreTecnico + ' ' + UTI_Tecnico.ApellidoTecnico AS Tecnico
				FROM UTI_Otrabajo AS UTI_OT 
				INNER JOIN UTI_Prioridad ON UTI_OT.IdPrioridad = UTI_Prioridad.IdPrioridad 
				LEFT OUTER JOIN UTI_Unidad ON UTI_OT.IdUnidad = UTI_Unidad.IdUnidad 
				INNER JOIN UTI_HUM_Empleadosdepurados ON UTI_OT.IdMarca = UTI_HUM_Empleadosdepurados.IdMarca
				LEFT OUTER JOIN UTI_Tipo_OT ON UTI_OT.IdTipo_OT = UTI_Tipo_OT.IdTipo_OT 
				LEFT OUTER JOIN UTI_SubTipo_OT ON UTI_OT.IdSubTipo_OT = UTI_SubTipo_OT.IdSubTipo_OT 
				LEFT OUTER JOIN UTI_Categoria_OT ON UTI_OT.IdCategoria_OT = UTI_Categoria_OT.IdCategoria_OT 
				INNER JOIN UTI_Estados ON UTI_OT.IdEstado = UTI_Estados.IdEstado
				INNER JOIN UTI_Tecnico ON UTI_OT.CodigoTecnico = UTI_Tecnico.CodigoTecnico
				LEFT OUTER JOIN UTI_LugarSolicitud ON UTI_OT.IdLugar = UTI_LugarSolicitud.IdLugar
				WHERE YEAR(UTI_OT.FechaOT) `+ AnioSel +  
				` ORDER BY UTI_OT.IdOT DESC`, 
				{ type: models.sequelize.QueryTypes.SELECT}).then(detallextablero =>{				
					//console.log(varmeenusuperior);
					datosxtablero = JSON.parse(JSON.stringify(detallextablero));
					
					//console.log('Menu: ' + varmenuselect[0])
					res.render('pantallas/tableroresumen', {
						isAuthenticated : req.isAuthenticated(),
						user : req.user,
						datosxtablero : datosxtablero,
						menuactual: { menu : menusel, datamenuselect : varmenuselect[0]
						}
					});
						
			}).catch(Error => {
				console.log('Error para el registro: ' + Error);
			});							
				
		}).catch(Error => {
			console.log('Error para el registro: ' + Error);
		});				
		
	}	

};