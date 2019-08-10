//var sql = require('mysql2');
var models  = require('../models');
module.exports = {

	getCategoria_OT :  function (req, res, next){
		var datoscategoriaot = null;
		
		models.sequelize.query(`SELECT UTI_Categoria_OT.IdCategoria_OT, UTI_Tipo_OT.NombreTipoOT + ' - ' + UTI_SubTipo_OT.Descripcion + ', Peso: '  + convert(varchar(10), UTI_SubTipo_OT.Peso) AS Subtipo,
		UTI_Categoria_OT.Descripcion, UTI_Categoria_OT.ActivoCategoria_OT, UTI_Categoria_OT.Peso, UTI_Categoria_OT.CodigoTecnico, UTI_Categoria_OT.CodigoTecnico1
		FROM UTI_Categoria_OT INNER JOIN UTI_SubTipo_OT
		ON UTI_Categoria_OT.IdSubTipo_OT = UTI_SubTipo_OT.IdSubTipo_OT
		INNER JOIN UTI_Tipo_OT ON UTI_SubTipo_OT.IdTipo_OT = UTI_Tipo_OT.IdTipo_OT		
		WHERE UTI_Categoria_OT.IdCategoria_OT>0`, { type: models.sequelize.QueryTypes.SELECT}).then(allCategoria_OT =>{
			datoscategoriaot = JSON.parse(JSON.stringify(allCategoria_OT));
	
			res.render('pantallas/OTcategoria', 
				{isAuthenticated : req.isAuthenticated(),
				user : req.user,
				datoscategoriaot : datoscategoriaot}
			);
				
		}).catch(Error => {
			console.log('Error para el registro: ' + Error);
		});

	},

	getEditCategoria_OT :  function (req, res, next){
		var subcategoriaotsel = req.params.IdCategoria_OT;
		var opcion = req.params.opcion;
		var datoCategoria_OT = null;
		var datossubtipoot = null;
		var tecnicoslist = null;
		
		if(opcion==2){
			models.UTI_Categoria_OT.findAll({ where: {IdCategoria_OT: subcategoriaotsel } }).then(onesubcategoriaot => {
				if (onesubcategoriaot.length>0){
					//console.log('USUARIO: ' + users[0].dataValues.CodigoUsuario);
					datoCategoria_OT = JSON.parse(JSON.stringify(onesubcategoriaot));
					
					models.sequelize.query(`SELECT UTI_SubTipo_OT.IdSubTipo_OT, UTI_Tipo_OT.NombreTipoOT + ' - ' + UTI_SubTipo_OT.Descripcion + ', Peso: '  + convert(varchar(10), UTI_SubTipo_OT.Peso) as Descripcion 
					from dbo.UTI_SubTipo_OT INNER JOIN dbo.UTI_Tipo_OT on dbo.UTI_SubTipo_OT.IdTipo_OT = dbo.UTI_Tipo_OT.IdTipo_OT WHERE IdSubTipo_OT>0 AND ActivoSubTipo_OT='A'`, 
					{ type: models.sequelize.QueryTypes.SELECT}).then(allSubTipo_OT =>{
						datossubtipoot = JSON.parse(JSON.stringify(allSubTipo_OT));
						
						models.sequelize.query(`SELECT UTI_Tecnico.CodigoTecnico, UTI_Tecnico.NombreTecnico + ' ' + UTI_Tecnico.ApellidoTecnico AS NombreTecnico 
							FROM UTI_Tecnico WHERE UTI_Tecnico.ActivoTecnico='A' ORDER BY UTI_Tecnico.NombreTecnico + ' ' + UTI_Tecnico.ApellidoTecnico`, 
							{ type: models.sequelize.QueryTypes.SELECT}).then(alltecnicos =>{
								tecnicoslist = JSON.parse(JSON.stringify(alltecnicos));
						
							res.render('pantallas/addcategoriaot', 
								{isAuthenticated : req.isAuthenticated(),
								user : req.user,
								datoCategoria_OT : datoCategoria_OT,
								datossubtipoot : datossubtipoot, 
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
			models.sequelize.query(`SELECT UTI_SubTipo_OT.IdSubTipo_OT, UTI_Tipo_OT.NombreTipoOT + ' - ' + UTI_SubTipo_OT.Descripcion + ', Peso: '  + convert(varchar(10), UTI_SubTipo_OT.Peso) as Descripcion 
			from dbo.UTI_SubTipo_OT INNER JOIN dbo.UTI_Tipo_OT on dbo.UTI_SubTipo_OT.IdTipo_OT = dbo.UTI_Tipo_OT.IdTipo_OT WHERE IdSubTipo_OT>0 AND ActivoSubTipo_OT='A'`, 
			{ type: models.sequelize.QueryTypes.SELECT}).then(allSubTipo_OT =>{
				datossubtipoot = JSON.parse(JSON.stringify(allSubTipo_OT));
				
				models.sequelize.query(`SELECT UTI_Tecnico.CodigoTecnico, UTI_Tecnico.NombreTecnico + ' ' + UTI_Tecnico.ApellidoTecnico AS NombreTecnico 
					FROM UTI_Tecnico WHERE UTI_Tecnico.ActivoTecnico='A' ORDER BY UTI_Tecnico.NombreTecnico + ' ' + UTI_Tecnico.ApellidoTecnico`, 
					{ type: models.sequelize.QueryTypes.SELECT}).then(alltecnicos =>{
						tecnicoslist = JSON.parse(JSON.stringify(alltecnicos));

					res.render('pantallas/addcategoriaot', 
						{isAuthenticated : req.isAuthenticated(),
						user : req.user,
						datossubtipoot : datossubtipoot,
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

	postEditCategoria_OT :  function (req, res, next){
		var opcion = req.params.opcion;
		var respuesta = {res: false};
		var menerror = null;		
		
		if (opcion==2){
			models.UTI_Categoria_OT.update(
				{
					IdSubTipo_OT: req.body.IdSubTipo_OT,
					Descripcion: req.body.Descripcion,
					ActivoCategoria_OT: req.body.ActivoCategoria_OT,
					Peso: req.body.Peso,
					CodigoTecnico : req.body.CodigoTecnico,
					CodigoTecnico1 : req.body.CodigoTecnico1
				},
				{
					where: { IdCategoria_OT:  req.body.IdCategoria_OT }
				}
			).then(datosingresados =>{
				//res.json({ datosingresados: datosingresados });
				respuesta.res=true;
				res.redirect('/pantallas/OTcategoria');
			}).catch(Error => {
				console.log('Error para el registro: ' + Error);
				menerror = JSON.stringify(Error);
				menerror = JSON.parse(menerror);
				res.json({ respuesta: respuesta, menerror : menerror});				
			});
		}else{
			models.UTI_Categoria_OT.create(
				{
					IdSubTipo_OT: req.body.IdSubTipo_OT,
					Descripcion: req.body.Descripcion,
					ActivoCategoria_OT: req.body.ActivoCategoria_OT,
					Peso: req.body.Peso,
					CodigoTecnico : req.body.CodigoTecnico,
					CodigoTecnico1 : req.body.CodigoTecnico1					
				}
			).then(datosingresados =>{
				//res.json({ datosingresados: datosingresados });
				respuesta.res=true;
				res.redirect('/pantallas/OTcategoria');
			}).catch(Error => {
				console.log('Error para el registro: ' + Error);
				menerror = JSON.stringify(Error);
				menerror = JSON.parse(menerror);
				res.json({ respuesta: respuesta, menerror : menerror});				
			});
		}

	},

	postDelCategoria_OT :  function (req, res, next){
		var categoriaotsel = req.params.IdCategoria_OT;
		var respuesta = {res: false};
		var menerror = null;
		console.log(categoriaotsel);

		models.UTI_Categoria_OT.destroy(
			{ where: { IdCategoria_OT: categoriaotsel }	}).then(datosborrados =>{
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

	postDisableCategoria_OT :  function (req, res, next){
		var categoriaotsel = req.params.IdCategoria_OT;
		var respuesta = {res: false};
		var menerror = null;
		console.log(categoriaotsel);

		models.UTI_Categoria_OT.update( { ActivoCategoria_OT: 'I' },
			{ where: { IdCategoria_OT: categoriaotsel } }
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