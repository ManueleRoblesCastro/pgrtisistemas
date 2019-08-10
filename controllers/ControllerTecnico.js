//var sql = require('mysql2');
var models  = require('../models');
module.exports = {

	getTecnicos :  function (req, res, next){
		
		models.sequelize.query(`SELECT UTI_Tecnico.CodigoTecnico, UTI_Area.NombreArea, UTI_Rol.NombreRol, 
			UTI_Tecnico.NombreTecnico, UTI_Tecnico.ApellidoTecnico, UTI_Tecnico.ActivoTecnico, 
			UTI_Tecnico.IdArea, UTI_Tecnico.IdRol, UTI_Tecnico.CorreoE FROM UTI_Tecnico INNER JOIN
	        UTI_Area ON UTI_Tecnico.IdArea = UTI_Area.IdArea INNER JOIN
	        UTI_Rol ON UTI_Tecnico.IdRol = UTI_Rol.IdRol`, 
			{ type: models.sequelize.QueryTypes.SELECT}).then(datostecnicos =>{
			//res.json({ datosingresados: datosingresados });
			res.render('pantallas/tecnicos', 
				{isAuthenticated : req.isAuthenticated(),
				user : req.user,
				datostecnicos : datostecnicos}
			);
		}).catch(Error => {
			console.log('Error para el registro: ' + Error);
		});		

	},

	getEditTecnicos :  function (req, res, next){
		var tecnicosel = req.params.codigotecnico;
		var tecnicos = null;
		var tecnicoselect = null;
		var tecareas = null;
		var tecroles = null;

		models.UTI_Area.findAll().then(allareas =>{
			if (allareas.length>0){ 
				tecareas = JSON.parse(JSON.stringify(allareas));
				
				models.UTI_Rol.findAll().then(allroles =>{
					if (allroles.length>0){ 
						tecroles = JSON.parse(JSON.stringify(allroles));
						
						models.UTI_Tecnico.findAll({attributes: 
							[
								'CodigoTecnico', 
								[
									models.sequelize.fn('CONCAT', models.UTI_Tecnico.sequelize.col('NombreTecnico'), ' ' , models.UTI_Tecnico.sequelize.col('ApellidoTecnico')), 'NombreCompleto'
								] 
							]}).then(alltecnicos =>{
							//res.json({ datosingresados: datosingresados });
							if(alltecnicos.length>0){
								tecnicos = JSON.parse(JSON.stringify(alltecnicos));
		
								models.UTI_Tecnico.findAll({ where: {CodigoTecnico: tecnicosel } }).then(onetecnico => {
		
									if (onetecnico.length>0){
										//console.log('USUARIO: ' + users[0].dataValues.CodigoUsuario);
										tecnicoselect = JSON.parse(JSON.stringify(onetecnico));
										
										res.render('pantallas/edittecnicos', 
											{isAuthenticated : req.isAuthenticated(),
											user : req.user,
											tecnicoselect : tecnicoselect,
											tecnicos : tecnicos,
											tecareas : tecareas,
											tecroles : tecroles
											}
										);
										
									}
								}).catch(Error => {
									console.log('Error para el registro: ' + Error);
								});
							}								
						}).catch(Error => {
							console.log('Error para el registro: ' + Error);
						});									
					}
				}).catch(Error => {
					console.log('Error para el registro: ' + Error);
				});
			}
		}).catch(Error => {
			console.log('Error para el registro: ' + Error);
		});		

	},

	postEditTecnicos :  function (req, res, next){

		var opcion = req.params.opcion;
		if (opcion==1){
			models.UTI_Tecnico.update(
				{
					IdArea: req.body.IdArea,
					IdRol: req.body.IdRol,
					NombreTecnico: req.body.NombreTecnico,
					ApellidoTecnico: req.body.ApellidoTecnico,
					CodigoTecnicoSupervisor: req.body.CodigoTecnicoSupervisor,
					ActivoTecnico: req.body.ActivoTecnico,
					CorreoE: req.body.CorreoE
				},
				{
					where: { CodigoTecnico: req.body.CodigoTecnico }
				}
			).then(datosingresados =>{
				//res.json({ datosingresados: datosingresados });
				res.redirect('/pantallas/tecnicos');

			}).catch(Error => {
				console.log('Error para el registro: ' + Error);
			});
		}

		if (opcion==2){

			models.UTI_Tecnico.create(
				{
					CodigoTecnico: req.body.CodigoTecnico,
					IdArea: req.body.IdArea,
					IdRol: req.body.IdRol,
					NombreTecnico: req.body.NombreTecnico,
					ApellidoTecnico: req.body.ApellidoTecnico,
					ActivoTecnico: req.body.ActivoTecnico,
					ClaveTecnico: req.body.CodigoTecnico,
					CodigoTecnicoSupervisor: req.body.CodigoTecnicoSupervisor,
					CorreoE: req.body.CorreoE
				}
			).then(datosingresados =>{
				//res.json({ datosingresados: datosingresados });
				res.redirect('/pantallas/tecnicos');

			}).catch(Error => {
				console.log('Error para el registro: ' + Error);
			});
		}		

	},

	getTecnico :  function (req, res, next){

		var tecnicos = null;
		var tecareas = null;
		var tecroles = null;

		models.UTI_Area.findAll().then(allareas =>{
			if (allareas.length>0){ 
				tecareas = JSON.parse(JSON.stringify(allareas));
				
				models.UTI_Rol.findAll().then(allroles =>{
					if (allroles.length>0){ 
						tecroles = JSON.parse(JSON.stringify(allroles));
						
						models.UTI_Tecnico.findAll({attributes: 
							[
								'CodigoTecnico', 
								[
									models.sequelize.fn('CONCAT', models.UTI_Tecnico.sequelize.col('NombreTecnico'), ' ' , models.UTI_Tecnico.sequelize.col('ApellidoTecnico')), 'NombreCompleto'
								] 
							]}).then(alltecnicos =>{
							//res.json({ datosingresados: datosingresados });
							if(alltecnicos.length>0){
								tecnicos = JSON.parse(JSON.stringify(alltecnicos));
				
								res.render('pantallas/addtecnicos', 
									{isAuthenticated : req.isAuthenticated(),
									user : req.user,
									tecnicos : tecnicos,
									tecareas : tecareas,
									tecroles : tecroles
									}
								);										
							}								
						}).catch(Error => {
							console.log('Error para el registro: ' + Error);
						});									
					}
				}).catch(Error => {
					console.log('Error para el registro: ' + Error);
				});
			}
		}).catch(Error => {
			console.log('Error para el registro: ' + Error);
		});		

	},

	postDelTecnico :  function (req, res, next){
		var tecnicosel = req.body.CodigoTecnico;
		var respuesta = {res: false};

		models.UTI_Tecnico.destroy(
			{ where: { CodigoTecnico: tecnicosel }	}).then(datosborrados =>{
				//res.json({ datosingresados: datosingresados });
			console.log('Tecnico borrado');
			respuesta.res =true;
			res.json(respuesta);
		}).catch(Error => {
			console.log('Error para el registro: ' + Error);
		});

	},

	postDisableTecnico :  function (req, res, next){
		var tecnicosel = req.body.CodigoTecnico;
		var respuesta = {res: false};

		models.UTI_Tecnico.update(	{ ActivoTecnico: 'I' },
			{ where: { CodigoTecnico: tecnicosel } }
		).then(datosingresados =>{
			console.log('Tecnico Inactivado');
			respuesta.res =true;
			res.json(respuesta);
		}).catch(Error => {
			console.log('Error para el registro: ' + Error);
		});

	},
	
	getTecSubtipoCatOT :  function (req, res, next){
		
		var SubtipoCat_ot = req.params.IdSubTipocat_OT;
		var opcionsubticat = req.params.opcion;
		var codtecnico = req.params.codtecnico;

		models.sequelize.query('EXEC ST_PR_TecnicosxSubtipoCatOT :IdSubTipoCat_OT, :Opcion, :CodTecnico', 
		{replacements: { IdSubTipoCat_OT: SubtipoCat_ot, Opcion: opcionsubticat, CodTecnico: codtecnico }, type: models.sequelize.QueryTypes.SELECT })
			.then(datosretornados => {
				//console.log(datosretornados);
				res.json({ datosretornados: datosretornados });
		}).catch(Error => {
			console.log('Error para el registro: ' + Error);
		});			

	},
	
	postchangePwd :  function (req, res, next){
		var tecnicosel = req.body.txtCodTecnico;
		var tecnicopwd = req.body.IdPwdActual;
		var tecnicopwdnew = req.body.IdPwdNuevo;
		var respuesta = {res: false};
		
		console.log(tecnicosel + '-' +  tecnicopwd + '-' + tecnicopwdnew);		
		models.UTI_Tecnico.findAll({ where: {CodigoTecnico: tecnicosel, ClaveTecnico: tecnicopwd } }).then(onetecnico => {		
			if (onetecnico.length>0){
			//console.log('USUARIO: ' + users[0].dataValues.CodigoUsuario);

				models.UTI_Tecnico.update(	{ ClaveTecnico: tecnicopwdnew,  },
					{ where: { CodigoTecnico: tecnicosel, ClaveTecnico: tecnicopwd } }
				).then(datosingresados =>{
					console.log('Clave de Tecnico Actualizada');
					respuesta.res =true;				
					res.json(respuesta);
				}).catch(Error => {
					console.log('Error para el registro: ' + Error);
				});
				
			}else{
				res.json(respuesta);
			}
			
		}).catch(Error => {
			console.log('Error para el registro: ' + Error);
		});

	},

};