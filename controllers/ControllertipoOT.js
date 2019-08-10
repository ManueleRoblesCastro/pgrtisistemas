//var sql = require('mysql2');
var models  = require('../models');
module.exports = {

	getTipo_OT :  function (req, res, next){
		var datostipoot = null;
		
		models.UTI_Tipo_OT.findAll({ where: { IdTipo_OT: { $gt: 0 } }}).then(allTipo_OT =>{
			datostipoot = JSON.parse(JSON.stringify(allTipo_OT));
			res.render('pantallas/OTtipo', 
				{isAuthenticated : req.isAuthenticated(),
				user : req.user,
				datostipoot : datostipoot}
			);
		}).catch(Error => {
			console.log('Error para el registro: ' + Error);
		});

	},

	getEditTipo_OT :  function (req, res, next){
		var tipootsel = req.params.IdTipo_OT;
		var opcion = req.params.opcion;
		var datoTipo_OT = null;
		
		if(opcion==2){
			models.UTI_Tipo_OT.findAll({ where: {IdTipo_OT: tipootsel } }).then(onetipoot => {
	
				if (onetipoot.length>0){
					//console.log('USUARIO: ' + users[0].dataValues.CodigoUsuario);
					datoTipo_OT = JSON.parse(JSON.stringify(onetipoot));
					res.render('pantallas/addtipoot', 
						{isAuthenticated : req.isAuthenticated(),
						user : req.user,
						datoTipo_OT : datoTipo_OT, 
						operacion : opcion
						}
					);
					
				}
			}).catch(Error => {
				console.log('Error para el registro: ' + Error);
			});
		}
		else{
			res.render('pantallas/addtipoot', 
				{isAuthenticated : req.isAuthenticated(),
				user : req.user,
				operacion : opcion
				}
			);			
		}
	},

	postEditTipo_OT :  function (req, res, next){
		var opcion = req.params.opcion;
		var respuesta = {res: false};
		var menerror = null;		
		
		if (opcion==2){
			models.UTI_Tipo_OT.update(
				{
					NombreTipoOT: req.body.NombreTipoOT,
					ActivoTipo_OT: req.body.ActivoTipo_OT
				},
				{
					where: { IdTipo_OT:  req.body.IdTipo_OT }
				}
			).then(datosingresados =>{
				//res.json({ datosingresados: datosingresados });
				respuesta.res=true;
				res.redirect('/pantallas/OTtipo');
			}).catch(Error => {
				console.log('Error para el registro: ' + Error);
				menerror = JSON.stringify(Error);
				menerror = JSON.parse(menerror);
				res.json({ respuesta: respuesta, menerror : menerror});				
			});
		}else{
			models.UTI_Tipo_OT.create(
				{
					NombreTipoOT: req.body.NombreTipoOT,
					ActivoTipo_OT: req.body.ActivoTipo_OT					
				}
			).then(datosingresados =>{
				//res.json({ datosingresados: datosingresados });
				respuesta.res=true;
				res.redirect('/pantallas/OTtipo');
			}).catch(Error => {
				console.log('Error para el registro: ' + Error);
				menerror = JSON.stringify(Error);
				menerror = JSON.parse(menerror);
				res.json({ respuesta: respuesta, menerror : menerror});				
			});
		}

	},

	postDelTipo_OT :  function (req, res, next){
		var tipootsel = req.params.IdTipo_OT;
		var respuesta = {res: false};
		var menerror = null;
		console.log(tipootsel);

		models.UTI_Tipo_OT.destroy(
			{ where: { IdTipo_OT: tipootsel }	}).then(datosborrados =>{
				//res.json({ datosingresados: datosingresados });
			console.log('Tipo OT borrado');
			respuesta.res =true;
			res.json({ respuesta: respuesta });
		}).catch(Error => {
			console.log('Error para el registro: ' + Error);
			menerror = JSON.stringify(Error);
			menerror = JSON.parse(menerror);
			res.json({ respuesta: respuesta, menerror : menerror});			
		});

	},

	postDisableTipo_OT :  function (req, res, next){
		var tipootsel = req.params.IdTipo_OT;
		var respuesta = {res: false};
		var menerror = null;

		models.UTI_Tipo_OT.update(	{ ActivoTipo_OT: 'I' },
			{ where: { IdTipo_OT: tipootsel } }
		).then(datosingresados =>{
			console.log('Tipo OT Inactivado');
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