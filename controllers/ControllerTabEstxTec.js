var models  = require('../models');
var dateFormat = require('dateformat');
//var nodemailer = require('nodemailer');

module.exports = {
	
	getOTsxesttec : function (req, res, next){
		//console.log(req.user);
		var varmenuselect = null;
		var datostableroxtecest = null;
		var menusel = req.params.menu.trim();
		var estadoid = 0;
		var codigotecnicoin = req.user.CodigoTecnico.trim();
		var AnioSel = req.user.JsonAnioFiltro.toString().trim();
		
		if (menusel=='UTIMEOT01'){ estadoid =1;	}
		if (menusel=='UTIMEOT02'){ estadoid =3;	}
		if (menusel=='UTIMEOT03'){ estadoid =4;	}
		if (menusel=='UTIMEOT04'){ estadoid =5;	}
		if (menusel=='UTIMEOT05'){ estadoid =6;	}
					
		models.sequelize.query(`SELECT TOP(1) CodigoMenu, NombreMenu, AyudaMenu, CodigoMenuSuperior, ColorSemantic, IconoSemantic
			FROM UTI_SIS_MenusOperacion WHERE CodigoMenu='${menusel}'`, 
			{ type: models.sequelize.QueryTypes.SELECT}).then(datomenuselect =>{
			varmenuselect = JSON.parse(JSON.stringify(datomenuselect));
				
			models.sequelize.query(`SELECT UTI_Otrabajo.IdOT, CONVERT(varchar(25), UTI_Otrabajo.FechaOT, 120) AS FechaOT, UTI_Otrabajo.Resumen, UTI_Otrabajo.DetalleSolucion, UTI_Otrabajo.Peso, UTI_Unidad.NombreUnidad, CONVERT(varchar(25), UTI_Otrabajo.FechaResolucion, 120) AS FechaResolucion,  
				 UTI_Otrabajo.CodigoActivoFijo, UTI_FIJ_ActivosFijos.NombreActivoFijo, UTI_Dispositivo.nombre AS Dispositivo, UTI_Prioridad.NombrePrioridad, UTI_Otrabajo.IdEstado, UTI_Otrabajo.CodigoTecnico,
				 UTI_HUM_Empleadosdepurados.NombresEmpleado + ' ' + UTI_HUM_Empleadosdepurados.ApellidosEmpleado AS Empleado, CONVERT(varchar(10), UTI_Otrabajo.FechaResolEsp, 120) AS FechaResolEsp,
				 UTI_Otrabajo.Reasignar	
				 FROM UTI_Otrabajo INNER JOIN
				 UTI_Prioridad ON UTI_Otrabajo.IdPrioridad = UTI_Prioridad.IdPrioridad LEFT OUTER JOIN
				 UTI_Dispositivo ON UTI_Otrabajo.codigo_dispositivo = UTI_Dispositivo.codigo_dispositivo LEFT OUTER JOIN
				 UTI_LugarSolicitud ON UTI_Otrabajo.IdLugar = UTI_LugarSolicitud.IdLugar LEFT OUTER JOIN
				 UTI_Unidad ON UTI_Otrabajo.IdUnidad = UTI_Unidad.IdUnidad LEFT OUTER JOIN
				 UTI_FIJ_ActivosFijos ON UTI_Otrabajo.CodigoActivoFijo = UTI_FIJ_ActivosFijos.CodigoActivoFijo
				 INNER JOIN UTI_HUM_Empleadosdepurados ON UTI_Otrabajo.IdMarca = UTI_HUM_Empleadosdepurados.IdMarca
				 WHERE UTI_Otrabajo.CodigoTecnico = '${codigotecnicoin}' AND UTI_Otrabajo.IdEstado = ${estadoid} AND YEAR(UTI_Otrabajo.FechaOT) `+ AnioSel, 
				{ type: models.sequelize.QueryTypes.SELECT}).then(detallextablero =>{				
					//console.log(varmeenusuperior);
					datostableroxtecest = JSON.parse(JSON.stringify(detallextablero));
					
					res.render('pantallas/tableroxestado', {
						isAuthenticated : req.isAuthenticated(),
						user : req.user,
						datostableroxtecest : datostableroxtecest,
						menuactual: { menu : menusel, datamenuselect : varmenuselect[0]
						}
					});
						
			}).catch(Error => {
				console.log('Error para el registro: ' + Error);
			});							
				
		}).catch(Error => {
			console.log('Error para el registro: ' + Error);
		});
		
	},
	
	postOTchangest :  function (req, res, next){
		var IdOT_p = req.params.IdOT;
		var idestado_p = req.params.codigoestado;
		var respuesta = {res: false};
		var menerror = null;
		//var fechaYMD = dateFormat(fechaactual, 'yyyy/mm/dd');
		var fechaYMDHM = dateFormat(new Date(new Date().setHours(new Date().getHours() - 6)).toString(), 'yyyy-mm-dd HH:MM');
		var varFechaResolucionChk = req.body.FechaResolucionChk;
		var varFechaResolucionSel =  req.body.FechaResolucionSel;
					
		//console.log(varFechaResolucionChk + ' ' + varFechaResolucionSel);
		//false 2018-05-03 15:47:27
		if (varFechaResolucionChk){
			fechaYMDHM =varFechaResolucionSel;
		}

		//console.log('***IdMarcaReasig ' + req.body.IdMarcaReasig + '***IdUnidadReasig ' + req.body.IdUnidadReasig + '***IdLugarReasig ' + req.body.IdLugarReasig );
		
		if(parseInt(idestado_p)==5){
			models.UTI_Otrabajo.update( { 
				IdEstado: idestado_p,
				FechaResolucion : fechaYMDHM,
				DetalleSolucion: req.body.DetalleSolucion,
				IdMarca1 : req.body.IdMarcaReasig,
				IdUnidad1 : req.body.IdUnidadReasig,
				IdLugar1 : req.body.IdLugarReasig
				},
				{ where: { IdOT: IdOT_p } }
			).then(datosingresados =>{
							
				models.sequelize.query(`select UTI_Otrabajo.IdOT, UTI_HUM_Empleadosdepurados.CorreoElectronicoUsuario from UTI_Otrabajo 
					INNER JOIN UTI_HUM_Empleadosdepurados ON UTI_Otrabajo.IdMarca = UTI_HUM_Empleadosdepurados.IdMarca
					where  UTI_Otrabajo.IdOT = ${IdOT_p}`, 
					{ type: models.sequelize.QueryTypes.SELECT}).then(datosempleados =>{
				
					datosempleados = JSON.parse(JSON.stringify(datosempleados));						
					if(datosempleados.length>0){						
						if (datosempleados[0].CorreoElectronicoUsuario.length > 0 ){
							console.log('OT Actualizada Email '+ datosempleados[0].CorreoElectronicoUsuario);
							respuesta.res =true;
							res.json({ respuesta: respuesta });
						}
						else{
							console.log('OT Actualizada');
							respuesta.res =true;
							res.json({ respuesta: respuesta });							
						}
					}
				}).catch(Error => {
					console.log('Error para el registro: ' + Error);
				});
				/*console.log('OT Actualizada');
				respuesta.res =true;
				res.json({ respuesta: respuesta });*/			
			}).catch(Error => {
				console.log('Error para el registro: ' + Error);
				menerror = JSON.stringify(Error);
				menerror = JSON.parse(menerror);
				res.json({ respuesta: respuesta, menerror : menerror});				
			});				
		}else{
			models.UTI_Otrabajo.update( { 
				IdEstado: idestado_p,
				FechaResolucion : fechaYMDHM,
				DetalleSolucion: req.body.DetalleSolucion },
				{ where: { IdOT: IdOT_p } }
			).then(datosingresados =>{
				console.log('OT Actualizada');
				respuesta.res =true;
				res.json({ respuesta: respuesta });
			}).catch(Error => {
				console.log('Error para el registro: ' + Error);
				menerror = JSON.stringify(Error);
				menerror = JSON.parse(menerror);
				res.json({ respuesta: respuesta, menerror : menerror});				
			});			
		}

	},

	getOTsxesttecreas : function (req, res, next){
		//console.log(req.user);
		var empleadoslist = null, unidadeslist = null, lugareslist =null;	

		models.UTI_HUM_Empleadosdepurados.findAll({attributes: ['IdMarca',
			[ models.sequelize.fn('CONCAT', 
				models.UTI_HUM_Empleadosdepurados.sequelize.col('NombresEmpleado'), ' ' , 
				models.UTI_HUM_Empleadosdepurados.sequelize.col('ApellidosEmpleado')), 
				'NombreEmpleado' 
			] 
		]}).then(allempleados =>{
			empleadoslist = JSON.parse(JSON.stringify(allempleados));

			models.UTI_Unidad.findAll({attributes: ['IdUnidad','NombreUnidad']}).then(allunidades =>{
				unidadeslist = JSON.parse(JSON.stringify(allunidades));
				
				models.UTI_LugarSolicitud.findAll({attributes: ['IdLugar','NombreLugar']}).then(alllugares =>{
					lugareslist = JSON.parse(JSON.stringify(alllugares));
													
					res.json({
						empleadoslist : empleadoslist,
						unidadeslist : unidadeslist,
						lugareslist : lugareslist
					});
									
				}).catch(Error => {
					console.log('Error para el registro: ' + Error);
				});							
					
			}).catch(Error => {
				console.log('Error para el registro: ' + Error);
			});				
		}).catch(Error => {
			console.log('Error para el registro: ' + Error);
		});					
		
	},

	getOTsxesttecreasinfo : function (req, res, next){
		var IdOT_p = req.params.IdOT;
		var datosreasignacion = null;

		models.sequelize.query(`SELECT '* EMPLEADO: ' + UTI_HUM_Empleadosdepurados.NombresEmpleado + ' ' + UTI_HUM_Empleadosdepurados.ApellidosEmpleado AS NombreEmpleado, '* UNIDAD: ' + UTI_Unidad.NombreUnidad AS Unidad, '* UBICACION: ' + UTI_LugarSolicitud.NombreLugar AS Ubicacion FROM  UTI_Otrabajo INNER JOIN
		 UTI_HUM_Empleadosdepurados ON UTI_Otrabajo.IdMarca1 = UTI_HUM_Empleadosdepurados.IdMarca INNER JOIN
		 UTI_Unidad ON UTI_Otrabajo.IdUnidad1 = UTI_Unidad.IdUnidad INNER JOIN
		 UTI_LugarSolicitud ON UTI_Otrabajo.IdLugar1 = UTI_LugarSolicitud.IdLugar
		WHERE (UTI_Otrabajo.IdOT = ${IdOT_p})`, 
			{ type: models.sequelize.QueryTypes.SELECT}).then(datosdevueltos =>{
			datosreasignacion = JSON.parse(JSON.stringify(datosdevueltos));
			
			res.json({
				datosreasignacion : datosreasignacion
			});

		}).catch(Error => {
			console.log('Error para el registro: ' + Error);
		});					
		
	}
};