var express = require('express');
var router = express.Router();
var passport = require('passport');
var controllers = require('.././controllers');
var AuthMiddleware = require('.././middleware/auth');

/* GET home page. */
router.get('/', controllers.homecontroller.index);

//router.get('/menusxusuario/:id', controllers.sigcuocontroller.getJsonMenus);
router.get('/signin', controllers.UserController.getSignIn);
router.post('/signin', passport.authenticate('local', {
	//successRedirect : '/templates/nav',
	successRedirect : '/menu/nav',
	failureRedirect : '/signin',
	failureFlash : true 
}));
router.get('/logout', controllers.UserController.logout);
/* MENUS*/
router.get('/menu/nav', AuthMiddleware.isLogged, controllers.UserController.getUserPanel);
router.get('/menu/nav/:menu', AuthMiddleware.isLogged, controllers.UserController.getUserPanelMenu);

/*TECNICO */
router.get('/pantallas/tecnicos', AuthMiddleware.isLogged, controllers.ControllerTecnico.getTecnicos);
router.get('/pantallas/edittecnicos/:codigotecnico', AuthMiddleware.isLogged, controllers.ControllerTecnico.getEditTecnicos);
router.post('/pantallas/savetecnico/:opcion', AuthMiddleware.isLogged, controllers.ControllerTecnico.postEditTecnicos);
router.get('/pantallas/addtecnicos', AuthMiddleware.isLogged, controllers.ControllerTecnico.getTecnico);
router.post('/pantallas/deltecnicos/', AuthMiddleware.isLogged, controllers.ControllerTecnico.postDelTecnico);
router.post('/pantallas/disabletecnicos/', AuthMiddleware.isLogged, controllers.ControllerTecnico.postDisableTecnico);
router.get('/pantallas/tecnicossubtipocatot/:IdSubTipocat_OT/:opcion/:codtecnico', AuthMiddleware.isLogged, controllers.ControllerTecnico.getTecSubtipoCatOT);
router.post('/pantallas/cambiarclave', AuthMiddleware.isLogged, controllers.ControllerTecnico.postchangePwd);
/*TIPO OT */
router.get('/pantallas/OTtipo', AuthMiddleware.isLogged, controllers.ControllertipoOT.getTipo_OT);
router.get('/pantallas/addtipoot/:opcion/:IdTipo_OT', AuthMiddleware.isLogged, controllers.ControllertipoOT.getEditTipo_OT);
router.post('/pantallas/savetipoot/:opcion', AuthMiddleware.isLogged, controllers.ControllertipoOT.postEditTipo_OT);
router.post('/pantallas/deltipoot/:IdTipo_OT', AuthMiddleware.isLogged, controllers.ControllertipoOT.postDelTipo_OT);
router.post('/pantallas/disabletipoot/:IdTipo_OT', AuthMiddleware.isLogged, controllers.ControllertipoOT.postDisableTipo_OT);
/*SUB TIPO OT */
router.get('/pantallas/OTsubtipo', AuthMiddleware.isLogged, controllers.ControllersubtipoOT.getSubTipo_OT);
router.get('/pantallas/addsubtipoot/:opcion/:IdSubTipo_OT', AuthMiddleware.isLogged, controllers.ControllersubtipoOT.getEditSubTipo_OT);
router.post('/pantallas/savesubtipoot/:opcion', AuthMiddleware.isLogged, controllers.ControllersubtipoOT.postEditSubTipo_OT);
router.post('/pantallas/delsubtipoot/:IdSubTipo_OT', AuthMiddleware.isLogged, controllers.ControllersubtipoOT.postDelSubTipo_OT);
router.post('/pantallas/disablesubtipoot/:IdSubTipo_OT', AuthMiddleware.isLogged, controllers.ControllersubtipoOT.postDisableSubTipo_OT);
/*CATEGORIA OT */
router.get('/pantallas/OTcategoria', AuthMiddleware.isLogged, controllers.ControllercategoriaOT.getCategoria_OT);
router.get('/pantallas/addcategoriaot/:opcion/:IdCategoria_OT', AuthMiddleware.isLogged, controllers.ControllercategoriaOT.getEditCategoria_OT);
router.post('/pantallas/savecategoriaot/:opcion', AuthMiddleware.isLogged, controllers.ControllercategoriaOT.postEditCategoria_OT);
router.post('/pantallas/delcategoriaot/:IdCategoria_OT', AuthMiddleware.isLogged, controllers.ControllercategoriaOT.postDelCategoria_OT);
router.post('/pantallas/disablecategoriaot/:IdCategoria_OT', AuthMiddleware.isLogged, controllers.ControllercategoriaOT.postDisableCategoria_OT);
/*TABLERO POR TECNICO*/
router.get('/pantallas/tableroxtecnico/:menu', AuthMiddleware.isLogged, controllers.ControllerTableroxTec.getDatosTableroxTec);
router.get('/pantallas/tableroxestado/:estado', AuthMiddleware.isLogged, controllers.ControllerTableroxTec.getDatosTableroxEst);
router.get('/pantallas/tblxestadoxtec/:codigoestado/:codigotecnico', AuthMiddleware.isLogged, controllers.ControllerTableroxTec.getOTsxestado);
router.get('/pantallas/addOTs/:opcion/:IdOT', AuthMiddleware.isLogged, controllers.ControllerTableroxTec.getOts);
router.post('/pantallas/addOTs/:opcion/:IdOT', AuthMiddleware.isLogged, controllers.ControllerTableroxTec.postOts);
router.get('/pantallas/ultimoIDOT', AuthMiddleware.isLogged, controllers.ControllerTableroxTec.getultidOt);
router.get('/pantallas/resumenOTs', AuthMiddleware.isLogged, controllers.ControllerTableroxTec.getresumenOts);
/*TABLERO POR ESTADO Y TECNICO*/
router.get('/pantallas/tbldetxestxtec/:menu', AuthMiddleware.isLogged, controllers.ControllerTabEstxTec.getOTsxesttec);
router.post('/pantallas/changeestOT/:IdOT/:codigoestado', AuthMiddleware.isLogged, controllers.ControllerTabEstxTec.postOTchangest);
router.get('/pantallas/tbldetxestxtecreas', AuthMiddleware.isLogged, controllers.ControllerTabEstxTec.getOTsxesttecreas);
router.get('/pantallas/datosreasignar/:IdOT', AuthMiddleware.isLogged, controllers.ControllerTabEstxTec.getOTsxesttecreasinfo);
/*TABLERO RESUMEN*/
router.get('/pantallas/tableroresumen/:menu', AuthMiddleware.isLogged, controllers.ControllerTabResumen.getOTstableror);
/*CONSULTA POR ESTADO DE OT*/
router.get('/pantallas/OTconsulta', AuthMiddleware.isLogged, controllers.ControllerConsultaot.getConsultaot);
router.get('/pantallas/OTtraza/:IdOTvalue', AuthMiddleware.isLogged, controllers.ControllerConsultaot.getTrazaot);

module.exports = router;