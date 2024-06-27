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

        const id_zapato=req.body.id_zapato;

        var condition = [{ id_zapato: { [Op.like]: id_zapato } }] ;

        Foto.findAll({attributes: ['foto'],where: condition,order:[[`${criterio}`,`${order}`]],limit,offset})
        .then(data => {
            console.log('data: '+JSON.stringify(data))
            const response = getPagingData(data);

            console.log('response: '+JSON.stringify(response))
            res.send(response);
        })
        .catch(error => {
            console.log(error)
            return res.status(400).json({ msg: 'Ha ocurrido un error, por favor intente más tarde' });
        });
    }
};

