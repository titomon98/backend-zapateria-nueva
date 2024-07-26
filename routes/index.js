const { Router } = require('express');
const multer = require('multer');
const router = Router();
const auth = require("../middleware/auth");
const storage = multer.diskStorage({
    destination:function(req,file,cb){
         cb(null,'documents')
    },
    filename:function(req,file,cb){
         cb(null,`${Date.now()}-${file.originalname}`)
    }
})
const upload = multer({storage:storage})
//Importar controladores
const authController = require('../controllers/authController');

//FAVOR DE DEJAR ORGANIZADO POR CARPETAS EN ORDEN ALFABETICO
//CARPETA DE CLIENTES
const clienteController = require('../controllers/clientes/clienteController')
const movimientosController = require('../controllers/clientes/movimientosController')
const tipoClienteController = require('../controllers/clientes/tipoClienteController')

//CARPETA DE PROVEEDORES
const proveedorController = require('../controllers/proveedores/proveedorController')

//CARPETA DE EMPLEADOS
const detalle_permisosController = require('../controllers/empleados/detalle_permisosController');
const userController = require('../controllers/empleados/usuarioController');
const userTypeController = require('../controllers/empleados/tipoUsuarioController');

//CARPETA DE TRANSACCIONES
const ventasController = require('../controllers/transacciones/ventasController')
const reportesVentasController = require('../controllers/transacciones/reportesVentasController')

//CARPETA DE TRASLADOS
const trasladosController = require('../controllers/traslados/trasladosController')

//CARPETA DE SERVICIOS
const clasificacionesController = require('../controllers/servicios/clasificacionesController')
const coloresController = require('../controllers/servicios/coloresController')
const marcasController = require('../controllers/servicios/marcasController')
const tallasController = require('../controllers/servicios/tallasController')
const tiendasController = require('../controllers/servicios/tiendasController')
const zapatosController = require('../controllers/servicios/zapatosController');
const fotosController = require('../controllers/servicios/fotosController');
const usuarioController = require('../controllers/empleados/usuarioController');

//CARPETA DE DATA
const reportesController = require('../controllers/data/reportesController')

//RUTAS

module.exports = (app) => {

    //FAVOR DE DEJAR ORGANIZADO POR CARPETAS EN ORDEN ALFABETICO

    //CARPETA DE CLIENTES
    //clientes
    router.get('/clientes/list', clienteController.list);
    router.post('/clientes/create', clienteController.create);
    router.put('/clientes/update', clienteController.update);
    router.put('/clientes/activate', clienteController.activate);
    router.put('/clientes/deactivate', clienteController.deactivate);
    router.get('/clientes/getSelect', clienteController.getSearch);

    //movimientos
    router.get('/movimientos/list', movimientosController.list);
    router.post('/movimientos/create', movimientosController.create);
    router.put('/movimientos/update', movimientosController.update);
    router.put('/movimientos/activate', movimientosController.activate);
    router.put('/movimientos/deactivate', movimientosController.deactivate);
    router.get('/movimientos/getSearch', movimientosController.getSearch);

    //tipo_clientes
    router.get('/tipo_clientes/list', tipoClienteController.list);
    router.post('/tipo_clientes/create', tipoClienteController.create);
    router.put('/tipo_clientes/update', tipoClienteController.update);
    router.put('/tipo_clientes/activate', tipoClienteController.activate);
    router.put('/tipo_clientes/deactivate', tipoClienteController.deactivate);
    router.get('/tipo_clientes/getSearch', tipoClienteController.getSearch);

    //CARPETA DE PROVEEDORES
    //proveedores
    router.get('/proveedores/list', proveedorController.list);
    router.post('/proveedores/create', proveedorController.create);
    router.put('/proveedores/update', proveedorController.update);
    router.put('/proveedores/activate', proveedorController.activate);
    router.put('/proveedores/deactivate', proveedorController.deactivate);
    router.get('/proveedores/getSelect', proveedorController.getSearch);

    //CARPETA DE EMPLEADOS
    //detalle_permisos

    //permisos

    // tipos de usuario
    router.get('/type/get', userTypeController.get);

    // usuarios
    router.get('/user/list', userController.list);
    router.post('/user/create', userController.create);
    router.put('/user/update', userController.update);
    router.put('/user/activate', userController.activate);
    router.put('/user/deactivate', userController.deactivate);
    router.get('/user/getSearch', userController.getSearch);

    //CARPETA DE TRANSACCIONES
    //ventas
    router.get('/ventas/list', ventasController.list);
    router.post('/ventas/create', ventasController.create);
    router.put('/ventas/activate', ventasController.activate);
    router.put('/ventas/deactivate', ventasController.deactivate);
    router.get('/ventas/get', ventasController.get);

    //reportes de ventas
    router.get('/ventas/reporte/cierre', reportesVentasController.getCierre)

    //CARPETA DE SERVICIOS
    //clasificaciones
    router.get('/clasificaciones/list', clasificacionesController.list);
    router.post('/clasificaciones/create', clasificacionesController.create);
    router.put('/clasificaciones/update', clasificacionesController.update);
    router.put('/clasificaciones/activate', clasificacionesController.activate);
    router.put('/clasificaciones/deactivate', clasificacionesController.deactivate);
    router.get('/clasificaciones/get', clasificacionesController.get);
    router.get('/clasificaciones/getSelect', clasificacionesController.getSearch);

    //colores
    router.get('/colores/list', coloresController.list);
    router.post('/colores/create', coloresController.create);
    router.put('/colores/update', coloresController.update);
    router.put('/colores/activate', coloresController.activate);
    router.put('/colores/deactivate', coloresController.deactivate);
    router.get('/colores/get', coloresController.get);
    router.get('/colores/getSelect', coloresController.getSearch);

    //marcas
    router.get('/marcas/list', marcasController.list);
    router.post('/marcas/create', marcasController.create);
    router.put('/marcas/update', marcasController.update);
    router.put('/marcas/activate', marcasController.activate);
    router.put('/marcas/deactivate', marcasController.deactivate);
    router.get('/marcas/get', marcasController.get);
    router.get('/marcas/getSelect', marcasController.getSearch);

    //tallas
    router.get('/tallas/list', tallasController.list);
    router.post('/tallas/create', tallasController.create);
    router.put('/tallas/update', tallasController.update);
    router.put('/tallas/activate', tallasController.activate);
    router.put('/tallas/deactivate', tallasController.deactivate);
    router.get('/tallas/get', tallasController.get);
    router.get('/tallas/getSelect', tallasController.getSearch);
    router.get('/tallas/getByCode', tallasController.getByCode);

    //tiendas
    router.get('/tiendas/list', tiendasController.list);
    router.post('/tiendas/create', tiendasController.create);
    router.put('/tiendas/update', tiendasController.update);
    router.put('/tiendas/activate', tiendasController.activate);
    router.put('/tiendas/deactivate', tiendasController.deactivate);
    router.get('/tiendas/get', tiendasController.get);
    router.get('/tiendas/getSelect', tiendasController.getSearch);

    //traslados
    router.get('/traslados/list', trasladosController.list);
    router.post('/traslados/create', trasladosController.create);
    router.post('/traslados/createRapido', trasladosController.createRapido);
    router.put('/traslados/update', trasladosController.update);
    router.put('/traslados/ingreso', trasladosController.ingreso);
    router.put('/traslados/cambiar', trasladosController.cambiar);
    router.get('/traslados/getSelect', trasladosController.getSearch);
    router.get('/traslados/listCancelado', trasladosController.listCancelado);
    router.get('/traslados/listCompletados', trasladosController.listCompletados);
    router.get('/traslados/listEnCamino', trasladosController.listEnCamino);
    router.get('/traslados/listExistenciaFisica', trasladosController.listExistenciaFisica);
    router.get('/traslados/listIncompletos', trasladosController.listIncompletos);
    router.get('/traslados/listSolicitado', trasladosController.listSolicitado);


    //zapatos
    router.get('/zapatos/list', zapatosController.list);
    router.post('/zapatos/create', zapatosController.create);
    router.put('/zapatos/update', zapatosController.update);
    router.put('/zapatos/activate', zapatosController.activate);
    router.put('/zapatos/deactivate', zapatosController.deactivate);
    router.get('/zapatos/get', zapatosController.get);
    router.get('/zapatos/getSelect', zapatosController.getSearch);

    // fotos
    router.get('/fotos/list', fotosController.list);
    router.delete('/fotos/delete', fotosController.delete);

    //CARPETA DE DATA
    //reportes
    router.get('/reporte/tallas', reportesController.getTallas);

    //AUTH
    router.post('/login', authController.login);
    router.post('/refresh', authController.refresh);
    router.post('/logout', authController.logout);
    router.post('/autenticar', auth, authController.autenticar);
    router.get('/usuarios/getSelect', usuarioController.getSearch);

    app.use('/', router);
};