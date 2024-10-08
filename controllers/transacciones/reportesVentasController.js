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
const Op = db.Sequelize.Op;
const moment = require('moment');

module.exports = {
    getCierre (req, res) {
        const date = req.query.date
        const tienda = req.query.tienda
        let TODAY_START = moment(date).format('YYYY-MM-DD 00:00');
        let NOW = moment(TODAY_START).add(1, 'days');
        Ventas.findAll({
            include: [
                {
                    model: DetalleVentas,
                    require: true,
                    include: [
                        {
                            model: Tallas,
                            include: [
                               { 
                                model: Tiendas,
                                where: {
                                    id: tienda
                                }
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
            where: {
                fecha: {
                    [Op.between]: [
                        TODAY_START,
                        NOW,
                    ]
                }
            }
        })
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            console.log(error)
            return res.status(400).json({ msg: 'Ha ocurrido un error, por favor intente más tarde' });
        });
    },
    getVentasTotales (req, res) {
        const date = req.query.date
        let TODAY_START = moment(date).format('YYYY-MM-DD 00:00');
        let NOW = moment(TODAY_START).add(1, 'days');
        Ventas.findAll({
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
            where: {
                fecha: {
                    [Op.between]: [
                        TODAY_START,
                        NOW,
                    ]
                }
            }
        })
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            console.log(error)
            return res.status(400).json({ msg: 'Ha ocurrido un error, por favor intente más tarde' });
        });
    },

};

