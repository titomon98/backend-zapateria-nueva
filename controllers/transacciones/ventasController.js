'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Ventas = db.ventas;
const DetalleVentas = db.detalle_ventas;
const Usuarios = db.usuarios;
const Tallas = db.tallas;
const Clientes = db.clientes;
const Inventario = db.inventarios;
const Op = db.Sequelize.Op;

module.exports = {
    create (req, res) {
        let body = req.body
        let now = new Date();
        console.log(body)
        let datos = {
            id_cliente: body.cliente.id,
            direccion: body.direccion,
            estado: 2,
            estado_cobro: 2,
            total: body.total,
            numero: body.numero,
            id_usuario: body.id_usuario,
            fecha: now,
            referencia_factura: null,
            tipo_cobro: body.tipo_cobro.nombre,
        }

        Ventas.create(datos).
        then(ventas => {
            const venta = ventas.id
            let total = 0
            let cantidad = body.detalle.length
            let detalles = body.detalle
            for (let i = 0; i < cantidad; i++) {
                let datos_detalles = {
                    cantidad: detalles[i].cantidad,
                    descripcion: detalles[i].descripcion,
                    subtotal: detalles[i].total,
                    estado: 1,
                    id_venta: venta,
                    id_talla: detalles[i].id_talla,
                    existencia_actual: detalles[i].existencia_actual,
                }
                total = total + parseFloat(detalles[i].total)
                DetalleVentas.create(datos_detalles)
                .then(detalles => {
                    let existencias_actuales = parseInt(datos_detalles.existencia_actual) - parseInt(datos_detalles.cantidad)
                    let unitario = parseFloat(datos_detalles.subtotal)/parseFloat(datos_detalles.cantidad)
                    let datos_inventario = {
                        cantidad: datos_detalles.cantidad,
                        existencia_previa: datos_detalles.existencia_actual,
                        precio_costo: null,
                        precio_venta: unitario,
                        movimiento: 'VENTA REALIZADA POR USUARIO CON IDENTIFICADOR ' + datos.id_usuario,
                        estado: 1,
                        id_talla: datos_detalles.id_talla
                    }
                    Inventario.create(datos_inventario)
                    Tallas.update(
                        { 
                            existencia_total: existencias_actuales
                        },
                        { where: { 
                            id: datos_detalles.id_talla
                        }}
                    )
                    .then(res.status(200).send('Venta guardada'))
                    .catch(error => {
                        console.log(error)
                        return res.status(400).json({ msg: 'Ha ocurrido un error, por favor intente más tarde' });
                    });
                    res.status(200).send('Venta guardada')
                }).catch(err => {
                    console.log(err)
                    res.status(500).send({
                        message: err.message || "Ocurrió un error"
                    });
                }); 
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({
                message: err.message || "Ocurrió un error"
            })
        });
    },

    list(req, res) {
        const getPagingData = (data, page, limit) => {
            const { count: totalItems, rows: referido } = data;

            const currentPage = page ? +page : 0;
            const totalPages = Math.ceil(totalItems / limit);

            return { totalItems, referido, totalPages, currentPage };
        };


        const getPagination = (page, size) => {
            const limit = size ? +size : 2;
            const offset = page ? page * limit : 0;

            return { limit, offset };
        };

        const busqueda=req.query.search;
        const page=req.query.page-1;
        const size=req.query.limit;
        const criterio=req.query.criterio;
        const order=req.query.order;


        const { limit, offset } = getPagination(page, size);

        var condition = busqueda ? { [Op.or]: [{ client: { [Op.like]: `%${busqueda}%` } }] } : null ;

        Ventas.findAndCountAll({ 
            include: [
                {
                    model: DetalleVentas,
                    require: true,
                    include: [
                        {
                            model: Tallas
                        }
                    ]
                },
                {
                    model: Usuarios,
                    require: true,
                },
                {
                    model: Clientes
                },
            ],
            where: condition, order:[[`${criterio}`,`${order}`]], limit, offset})
        .then(data => {

        console.log('data: '+JSON.stringify(data))
        const response = getPagingData(data, page, limit);

        console.log('response: '+JSON.stringify(response))
        res.send({total:response.totalItems, current_page: page+1,last_page:response.totalPages,from:response.currentPage,to:response.totalPages,data:response.referido});
        })
        .catch(err => {
            res.status(500).send({
            message:
            err.message || "Ha ocurrido un error."
            });
        });
    },

    find (req, res) {
        const id = req.query.id;
        return Ventas.findByPk(id, {
            include: [
                {
                    model: DetalleVentas,
                    require: true,
                    include: [
                        {
                            model: Tallas
                        }
                    ]
                },
                {
                    model: Usuarios,
                    require: true,
                },
                {
                    model: Clientes
                },
            ],
        })
        .then(ventas => res.status(200).send(ventas))
        .catch(error => res.status(400).send(error))
    },

    activate (req, res) {
        Ventas.update(
            { estado: 1 },
            { where: { 
                id: req.body.id 
            } }
        )
        .then(ventas => res.status(200).send('El registro ha sido activado'))
        .catch(error => res.status(400).send(error))
    },

    deactivate (req, res) {
        DetalleVentas.findAll({where: { id_venta: req.body.id }}).then(data => {

            console.log(data)
            //Pendiente de volver a cargar datos a inventario
        })
        .catch(err => {
            res.status(500).send({
            message:
            err.message || "Ha ocurrido un error."
            });
        });
        Ventas.update(
            { estado: 1 },
            { where: { 
                id: req.body.id 
            }}
        )
        .then(ventas =>res.status(200).send('El registro ha sido desactivado'))
        .catch(error => res.status(400).send(error))
    },

    get (req, res) {
        Ventas.findAll({ 
            include: [
                {
                    model: DetalleVentas,
                    require: true,
                    include: [
                        {
                            model: Tallas
                        }
                    ]
                },
                {
                    model: Usuarios,
                    require: true,
                },
                {
                    model: Clientes
                },
            ],
        })
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            console.log(error)
            return res.status(400).json({ msg: 'Ha ocurrido un error, por favor intente más tarde' });
        });
    },
}