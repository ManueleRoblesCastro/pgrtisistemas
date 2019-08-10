//var sql = require('mysql2');
//var nodemailer = require('nodemailer');

var models  = require('../models');
module.exports = {

	getSignIn : function (req, res, next){
		
		var datosaniosxtec = null;
		
		models.sequelize.query(`SELECT idAnio, Anio FROM UTI_Anios_OT order by idAnio`, 
			{ type: models.sequelize.QueryTypes.SELECT}).then(datosaniosxrolsel =>{
				
			datosaniosxtec = JSON.parse(JSON.stringify(datosaniosxrolsel));
			
			return res.render ('user/signin', {
				datosaniosxtec : datosaniosxtec,
				message : req.flash('info'), 
				authmessage : req.flash('authmessage')
			});
				
		}).catch(Error => {
			console.log('Error para el registro: ' + Error);
		});			
			
		/*return res.render ('user/signin', {
			message : req.flash('info'), 
			authmessage : req.flash('authmessage') 
		});*/
										
	},	

	logout : function (req, res, next){

		if (req.user!=undefined)
		{
			req.logout();
			res.redirect('/signin');	
		}
		else{
			req.logout();
			res.redirect('/signin');
		}
	},

	getUserPanel : function (req, res, next){
		//console.log('*********************---------- ANIOS ----------******');
		//console.log(req.user);
		
		var datosmenusxtec = null;
		
		models.sequelize.query(`SELECT UTI_SIS_MenusOperacion.CodigoMenu, UTI_SIS_MenusOperacion.NombreMenu, 
			UTI_SIS_MenusOperacion.AyudaMenu, UTI_SIS_MenusOperacion.CodigoMenuSuperior, UTI_SIS_MenusOperacion.NivelMenu, 
			UTI_SIS_MenusOperacion.UrlMenu, UTI_SIS_MenusOperacion.ColorSemantic, UTI_SIS_MenusOperacion.IconoSemantic, 
			UTI_SIS_MenusOperacionPorRol.IdRol 
			FROM UTI_SIS_MenusOperacionPorRol 
			INNER JOIN UTI_SIS_MenusOperacion ON UTI_SIS_MenusOperacionPorRol.CodigoMenu = UTI_SIS_MenusOperacion.CodigoMenu
			WHERE (UTI_SIS_MenusOperacionPorRol.IdRol = ${req.user.CodigoRol.IdRol})
			ORDER BY UTI_SIS_MenusOperacion.CodigoMenu`, 
			{ type: models.sequelize.QueryTypes.SELECT}).then(datosmenusxrol =>{
				datosmenusxtec = JSON.parse(JSON.stringify(datosmenusxrol));
				//console.log(datosmenusxtec);
				res.render('menu/nav', {
					isAuthenticated : req.isAuthenticated(),
					user : req.user,
					datosmenusxtec : datosmenusxtec,
					menuactual: { menu : 'UTIME', menusuperior : '' }
				});
		}).catch(Error => {
			console.log('Error para el registro: ' + Error);
		});				
		
	},
	
	getUserPanelMenu : function (req, res, next){
		//console.log('*********************---------- ANIOS ----------******');
		//console.log(req.user);		
		
		var varmeenusuperior = null;
		var datosmenusxtec = null;
		var datosxestadoxtec = null;
		var menusel = req.params.menu;
		var codigotecin = req.user.CodigoTecnico;
		var AnioSel = req.user.JsonAnioFiltro.toString().trim();
			
		models.sequelize.query(`SELECT UTI_SIS_MenusOperacion.CodigoMenu, UTI_SIS_MenusOperacion.NombreMenu, 
			UTI_SIS_MenusOperacion.AyudaMenu, UTI_SIS_MenusOperacion.CodigoMenuSuperior, UTI_SIS_MenusOperacion.NivelMenu, 
			UTI_SIS_MenusOperacion.UrlMenu, UTI_SIS_MenusOperacion.ColorSemantic, UTI_SIS_MenusOperacion.IconoSemantic, 
			UTI_SIS_MenusOperacionPorRol.IdRol 
			FROM UTI_SIS_MenusOperacionPorRol 
			INNER JOIN UTI_SIS_MenusOperacion ON UTI_SIS_MenusOperacionPorRol.CodigoMenu = UTI_SIS_MenusOperacion.CodigoMenu
			WHERE (UTI_SIS_MenusOperacionPorRol.IdRol = ${req.user.CodigoRol.IdRol})
			ORDER BY UTI_SIS_MenusOperacion.CodigoMenu`, 
			{ type: models.sequelize.QueryTypes.SELECT}).then(datosmenusxrol =>{
				datosmenusxtec = JSON.parse(JSON.stringify(datosmenusxrol));
				//console.log(datosmenusxtec);
				
				models.sequelize.query(`SELECT TOP(1) CodigoMenuSuperior FROM UTI_SIS_MenusOperacion WHERE CodigoMenu='${menusel}'`, 
					{ type: models.sequelize.QueryTypes.SELECT}).then(datomenusuperior =>{

						varmeenusuperior = 	JSON.parse(JSON.stringify(datomenusuperior));
						console.log(varmeenusuperior);
						
						if (varmeenusuperior[0].CodigoMenuSuperior.toString().trim()=='UTIME'){
							models.sequelize.query(`SELECT IdEstado, SUM(Peso) As SumaPeso, COUNT(*) AS ConteoEstado FROM [dbo].[UTI_Otrabajo]
							WHERE CodigoTecnico = '${codigotecin}' AND YEAR(FechaOT) `+ AnioSel + ` GROUP BY IdEstado`, 
								{ type: models.sequelize.QueryTypes.SELECT}).then(datoesttec =>{
								console.log(datoesttec);
								datosxestadoxtec= JSON.parse(JSON.stringify(datoesttec));

								res.render('menu/nav', {
									isAuthenticated : req.isAuthenticated(),
									user : req.user,
									datosmenusxtec : datosmenusxtec,
									menuactual: { menu : menusel, menusuperior : varmeenusuperior[0] },
									datosxestadoxtec : datosxestadoxtec
								});
									
							}).catch(Error => {
								console.log('Error para el registro: ' + Error);
							});
							
						}else{					
							res.render('menu/nav', {
								isAuthenticated : req.isAuthenticated(),
								user : req.user,
								datosmenusxtec : datosmenusxtec,
								menuactual: { menu : menusel, menusuperior : varmeenusuperior[0] }
							});
						}
					
			}).catch(Error => {
				console.log('Error para el registro: ' + Error);
			});				
		}).catch(Error => {
			console.log('Error para el registro: ' + Error);
		});				
		
	}	

};