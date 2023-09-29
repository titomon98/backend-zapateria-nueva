'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Tallas = db.tallas;
const Zapato = db.zapatos;
const Tienda = db.tiendas;
const Op = db.Sequelize.Op;

module.exports = {
    getTallas (req, res) {
        let id_zapato = req.query.id_zapato
        Tallas.findAll({
            include: [
                {
                    model: Zapato,
                },
                {
                    model: Tienda,
                }
            ],
            where: {
                id_zapato: id_zapato
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

