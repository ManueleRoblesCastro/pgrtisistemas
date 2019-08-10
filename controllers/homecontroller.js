//home controller
var models  = require('../models');

module.exports = {
	//funciones del controlador

	index : function (req, res, next){
		
		var datosaniosxtec = null;
		
		models.sequelize.query(`SELECT idAnio, Anio FROM UTI_Anios_OT order by idAnio`, 
			{ type: models.sequelize.QueryTypes.SELECT}).then(datosaniosxrolsel =>{
				
			datosaniosxtec = JSON.parse(JSON.stringify(datosaniosxrolsel));
			
			return res.render ('user/signin', {
				datosaniosxtec : datosaniosxtec,
				message : {},
				authmessage : {},
				isAuthenticated : req.isAuthenticated(),
				user : req.user				
			});
				
		}).catch(Error => {
			console.log('Error para el registro: ' + Error);
		});	
		
		/*res.render('user/signin', {
					message : {},
					authmessage : {},
					isAuthenticated : req.isAuthenticated(),
					user : req.user
				});*/
	}

}