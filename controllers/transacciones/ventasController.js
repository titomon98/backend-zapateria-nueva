'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Ventas = db.ventas;
const DetalleVentas = db.detalle_ventas;
const Usuarios = db.usuarios;
const Tallas = db.tallas;
const Clientes = db.clientes;
const Inventario = db.inventarios;
const Tiendas = db.tiendas;
const Cobro = db.detalle_cobros;
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
            por_pagar: body.total
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
                            model: Tallas,
                            include: [
                               { 
                                model: Tiendas
                               }
                            ]
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
        })
        .then(res => 
            {
                if (req.body.state == 1){
                    //pagado
                    Ventas.update(
                        { estado: 0 },
                        { where: { 
                            id: req.body.id 
                        }}
                    )
                    .then(ventas =>res.status(200).send('El registro ha sido desactivado'))
                    .catch(error => res.status(400).send(error))

                    res.forEach(element => {
                        Tallas.update(
                            {
                                cantidad: element.cantidad + element.Tallas.cantidad
                            },
                            {
                                where: {
                                    id: element.id_talla
                                }
                            }
                        )
                    });
                }
                else if (req.body.state == 3){
                //Adelanto
                    Ventas.update(
                        { estado: 0 },
                        { where: { 
                            id: req.body.id 
                        }}
                    )
                    .then(ventas =>res.status(200).send('El registro ha sido desactivado'))
                    .catch(error => res.status(400).send(error))
                }
                else {
                //pedido pero no pagado ni adelanto
                    Ventas.update(
                        { estado: 0 },
                        { where: { 
                            id: req.body.id 
                        }}
                    )
                    .then(ventas =>res.status(200).send('El registro ha sido desactivado'))
                    .catch(error => res.status(400).send(error))
                }
            }
        )
        .catch(err => {
            res.status(500).send({
            message:
            err.message || "Ha ocurrido un error."
            });
        });
    },

    pay (req,res) {
        console.log(req.body)
        Cobro.create({
            id_venta: req.body.id_venta,
            efectivo: req.body.efectivo,
            tarjeta: req.body.tarjeta,
            deposito: req.body.deposito,
            cheque: req.body.cheque,
            fecha: req.body.fecha,
            total: req.body.total
        })
        .then(cobro => {
            if (req.body.por_pagar == 0 ){
                Ventas.update({
                    por_pagar: 0,
                    estado: 1
                },{
                    where:{
                        id: req.body.id_venta
                    }
                })
                .then(venta => res.status(200).send('El registro se ha actualizado correctamente'))
                .catch(error => res.status(500).send(error))                
            } else {
                Ventas.update({
                    por_pagar: req.body.por_pagar,
                    estado: 3
                },{
                    where:{
                        id: req.body.id_venta
                    }
                })
                .then(venta => res.status(200).send('El registro se ha actualizado correctamente'))
                .catch(error => res.status(500).send(error)) 
            }
        })
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