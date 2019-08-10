//var sql = require('mysql2');
var models  = require('../models');
module.exports = {

	getSubTipo_OT :  function (req, res, next){
		var datossubtipoot = null;
		
		models.sequelize.query(`SELECT UTI_SubTipo_OT.IdSubTipo_OT, UTI_Tipo_OT.NombreTipoOT, UTI_SubTipo_OT.Descripcion,
			UTI_SubTipo_OT.ActivoSubTipo_OT, UTI_SubTipo_OT.Peso, UTI_SubTipo_OT.CodigoTecnico, UTI_SubTipo_OT.CodigoTecnico1 FROM 
			UTI_SubTipo_OT inner join UTI_Tipo_OT ON UTI_SubTipo_OT.IdTipo_OT = UTI_Tipo_OT.IdTipo_OT
			WHERE UTI_SubTipo_OT.IdSubTipo_OT > 0`, { type: models.sequelize.QueryTypes.SELECT}).then(allSubTipo_OT =>{
			datossubtipoot = JSON.parse(JSON.stringify(allSubTipo_OT));
	
			res.render('pantallas/OTsubtipo', 
				{isAuthenticated : req.isAuthenticated(),
				user : req.user,
				datossubtipoot : datossubtipoot}
			);
				
		}).catch(Error => {
			console.log('Error para el registro: ' + Error);
		});

	},

	getEditSubTipo_OT :  function (req, res, next){
		var subtipootsel = req.params.IdSubTipo_OT;
		var opcion = req.params.opcion;
		var datoSubTipo_OT = null;
		var datostipoot = null;
		var tecnicoslist = null;
		
		if(opcion==2){
			models.UTI_SubTipo_OT.findAll({ where: {IdSubTipo_OT: subtipootsel } }).then(onesubtipoot => {
				if (onesubtipoot.length>0){
					//console.log('USUARIO: ' + users[0].dataValues.CodigoUsuario);
					datoSubTipo_OT = JSON.parse(JSON.stringify(onesubtipoot));
					
					models.sequelize.query(`SELECT IdTipo_OT, NombreTipoOT from dbo.UTI_Tipo_OT 
						WHERE IdTipo_OT>0 AND ActivoTipo_OT='A'`, { type: models.sequelize.QueryTypes.SELECT}).then(allTipo_OT =>{
						datostipoot = JSON.parse(JSON.stringify(allTipo_OT));
						
						models.sequelize.query(`SELECT UTI_Tecnico.CodigoTecnico, UTI_Tecnico.NombreTecnico + ' ' + UTI_Tecnico.ApellidoTecnico AS NombreTecnico 
							FROM UTI_Tecnico WHERE UTI_Tecnico.ActivoTecnico='A' ORDER BY UTI_Tecnico.NombreTecnico + ' ' + UTI_Tecnico.ApellidoTecnico`, 
							{ type: models.sequelize.QueryTypes.SELECT}).then(alltecnicos =>{
								tecnicoslist = JSON.parse(JSON.stringify(alltecnicos));
															
							res.render('pantallas/addsubtipoot', 
								{isAuthenticated : req.isAuthenticated(),
								user : req.user,
								datoSubTipo_OT : datoSubTipo_OT,
								datostipoot : datostipoot, 
								operacion : opcion,
								tecnicoslist : tecnicoslist
								}
							);

						}).catch(Error => {
							console.log('Error para el registro: ' + Error);
						});
							
					}).catch(Error => {
						console.log('Error para el registro: ' + Error);
					});
						
				}
			}).catch(Error => {
				console.log('Error para el registro: ' + Error);
			});
		}
		else{
			models.sequelize.query(`SELECT IdTipo_OT, NombreTipoOT from dbo.UTI_Tipo_OT 
				WHERE IdTipo_OT>0 AND ActivoTipo_OT='A'`, { type: models.sequelize.QueryTypes.SELECT}).then(allTipo_OT =>{
				datostipoot = JSON.parse(JSON.stringify(allTipo_OT));
				
				models.sequelize.query(`SELECT UTI_Tecnico.CodigoTecnico, UTI_Tecnico.NombreTecnico + ' ' + UTI_Tecnico.ApellidoTecnico AS NombreTecnico 
					FROM UTI_Tecnico WHERE UTI_Tecnico.ActivoTecnico='A' ORDER BY UTI_Tecnico.NombreTecnico + ' ' + UTI_Tecnico.ApellidoTecnico`, 
					{ type: models.sequelize.QueryTypes.SELECT}).then(alltecnicos =>{
						tecnicoslist = JSON.parse(JSON.stringify(alltecnicos));
				
					res.render('pantallas/addsubtipoot', 
						{isAuthenticated : req.isAuthenticated(),
						user : req.user,
						datostipoot : datostipoot,
						operacion : opcion,
						tecnicoslist : tecnicoslist
						}
					);

				}).catch(Error => {
					console.log('Error para el registro: ' + Error);
				});
					
			}).catch(Error => {
				console.log('Error para el registro: ' + Error);
			});
							
		}
	},

	postEditSubTipo_OT :  function (req, res, next){
		var opcion = req.params.opcion;
		var respuesta = {res: false};
		var menerror = null;		
		
		if (opcion==2){
			models.UTI_SubTipo_OT.update(
				{
					IdTipo_OT: req.body.IdTipo_OT,
					Descripcion: req.body.Descripcion,
					ActivoSubTipo_OT: req.body.ActivoSubTipo_OT,
					Peso: req.body.Peso,
					CodigoTecnico : req.body.CodigoTecnico,
					CodigoTecnico1 : req.body.CodigoTecnico1
				},
				{
					where: { IdSubTipo_OT:  req.body.IdSubTipo_OT }
				}
			).then(datosingresados =>{
				//res.json({ datosingresados: datosingresados });
				respuesta.res=true;
				res.redirect('/pantallas/OTsubtipo');
			}).catch(Error => {
				console.log('Error para el registro: ' + Error);
				menerror = JSON.stringify(Error);
				menerror = JSON.parse(menerror);
				res.json({ respuesta: respuesta, menerror : menerror});				
			});
		}else{
			models.UTI_SubTipo_OT.create(
				{
					IdTipo_OT: req.body.IdTipo_OT,
					Descripcion: req.body.Descripcion,
					ActivoSubTipo_OT: req.body.ActivoSubTipo_OT,
					Peso: req.body.Peso,
					CodigoTecnico : req.body.CodigoTecnico,
					CodigoTecnico1 : req.body.CodigoTecnico1					
				}
			).then(datosingresados =>{
				//res.json({ datosingresados: datosingresados });
				respuesta.res=true;
				res.redirect('/pantallas/OTsubtipo');
			}).catch(Error => {
				console.log('Error para el registro: ' + Error);
				menerror = JSON.stringify(Error);
				menerror = JSON.parse(menerror);
				res.json({ respuesta: respuesta, menerror : menerror});				
			});
		}

	},

	postDelSubTipo_OT :  function (req, res, next){
		var subtipootsel = req.params.IdSubTipo_OT;
		var respuesta = {res: false};
		var menerror = null;
		console.log(subtipootsel);

		models.UTI_SubTipo_OT.destroy(
			{ where: { IdSubTipo_OT: subtipootsel }	}).then(datosborrados =>{
				//res.json({ datosingresados: datosingresados });
			console.log('Sub Tipo OT borrado');
			respuesta.res =true;
			res.json({ respuesta: respuesta });
		}).catch(Error => {
			console.log('Error para el registro: ' + Error);
			menerror = JSON.stringify(Error);
			menerror = JSON.parse(menerror);
			res.json({ respuesta: respuesta, menerror : menerror});			
		});

	},

	postDisableSubTipo_OT :  function (req, res, next){
		var subtipootsel = req.params.IdSubTipo_OT;
		var respuesta = {res: false};
		var menerror = null;
		console.log(subtipootsel);

		models.UTI_SubTipo_OT.update( { ActivoSubTipo_OT: 'I' },
			{ where: { IdSubTipo_OT: subtipootsel } }
		).then(datosingresados =>{
			console.log('Sub Tipo OT Inactivado');
			respuesta.res =true;
			res.json({ respuesta: respuesta });
		}).catch(Error => {
			console.log('Error para el registro: ' + Error);
			menerror = JSON.stringify(Error);
			menerror = JSON.parse(menerror);
			res.json({ respuesta: respuesta, menerror : menerror});				
		});

	}

};