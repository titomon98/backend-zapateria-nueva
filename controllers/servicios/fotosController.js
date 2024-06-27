'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Zapato = db.zapatos;
const Foto = db.fotos;
const Colores = db.colores;
const Clasificacion = db.clasificaciones;
const Marcas = db.marcas;
const Tallas = db.tallas;
const Tiendas = db.tiendas;
const Op = db.Sequelize.Op;


module.exports = {
    list(req, res) {

        const id_zapato=req.query.id_zapato;
        console.log('-------------------------',req.query)
        var condition = [{ id_zapato: { [Op.like]: id_zapato } }] ;

        Foto.findAndCountAll({attributes: ['foto'],where: condition})
        .then(data => {
            console.log('data: '+JSON.stringify(data))
            const response = data;

            console.log('response: '+JSON.stringify(response))
            res.send(response);
        })
        .catch(error => {
            console.log(error)
            return res.status(400).json({ msg: 'Ha ocurrido un error, por favor intente más tarde' });
        });
    }
};

