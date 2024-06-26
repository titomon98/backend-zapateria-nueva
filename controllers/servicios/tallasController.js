'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Zapato = db.zapatos;
const Colores = db.colores;
const Clasificacion = db.clasificaciones;
const Marcas = db.marcas;
const Tallas = db.tallas;
const Tiendas = db.tiendas;
const Op = db.Sequelize.Op;

module.exports = {
    create(req, res) {
        let form = req.body.form
        let corridas = req.body.corridas
        let cantidad = corridas.length
        
        for (let i = 0; i < cantidad; i++) {
            let datos = {
                talla: corridas[i].talla,
                cantidad: corridas[i].cantidad,
                codigo: 'PENDIENTE',
                estado: 1,
                id_zapato: form.id,
                id_tienda: form.tienda.id
            }
            Tallas.create(datos)
            .then(tipo => {
                res.send(tipo);
            })
            .catch(error => {
                console.log(error)
                return res.status(400).json({ msg: 'Ha ocurrido un error, por favor intente más tarde' });
            });
        }
        
                    
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
        const enviar = req.query.enviar;

        if (enviar !== '0') {
            const { limit, offset } = getPagination(page, size);

            var condition = busqueda ? { [Op.or]: [{ codigo: { [Op.like]: `%${busqueda}%` } }] } : null ;
    
            Tallas.findAndCountAll({ include: [
                {
                    model: Zapato,
                },
                {
                    model: Tiendas,
                },
            ], where: condition,order:[[`${criterio}`,`${order}`]],limit,offset})
            .then(data => {
    
            console.log('data: '+JSON.stringify(data))
            const response = getPagingData(data, page, limit);
    
            console.log('response: '+JSON.stringify(response))
            res.send({total:response.totalItems,last_page:response.totalPages, current_page: page+1, from:response.currentPage,to:response.totalPages,data:response.referido});
            })
            .catch(error => {
                console.log(error)
                return res.status(400).json({ msg: 'Ha ocurrido un error, por favor intente más tarde' });
            });
        }
    },


    find (req, res) {
        const id = req.params.id;

        return Tallas.findByPk(id)
        .then(banco => res.status(200).send(banco))
        .catch(error => res.status(400).send(error))
    },

    update (req, res) {
        let form = req.body.form

        Tallas.update(
            { 
                nombre: form.name,
                codigo: form.codigo,
            },
            { where: { 
                id: form.id 
            } }
        )
        .then(banco => res.status(200).send('El registro ha sido actualizado'))
        .catch(error => {
            console.log(error)
            return res.status(400).json({ msg: 'Ha ocurrido un error, por favor intente más tarde' });
        });
    },

    activate (req, res) {
        Tallas.update(
            { estado: 1 },
            { where: { 
                id: req.body.id 
            } }
        )
        .then(banco => res.status(200).send('El registro ha sido activado'))
        .catch(error => {
            console.log(error)
            return res.status(400).json({ msg: 'Ha ocurrido un error, por favor intente más tarde' });
        });
    },

    deactivate (req, res) {
        Tallas.update(
            { estado: 0 },
            { where: { 
                id: req.body.id 
            } }
        )
        .then(banco =>res.status(200).send('El registro ha sido desactivado'))
        .catch(error => {
            console.log(error)
            return res.status(400).json({ msg: 'Ha ocurrido un error, por favor intente más tarde' });
        });
    },

    get (req, res) {
        Tallas.findAll({
            where: {
                id: req.query.id
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

    getSearch (req, res) {
        var busqueda = req.query.search;
        var condition = busqueda?{ [Op.or]:[ {codigo: { [Op.like]: `%${busqueda}%` }}],[Op.and]:[{estado:1}] } : {estado:1} ;
        Tallas.findAll({
            where: condition})
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            console.log(error)
            return res.status(400).json({ msg: 'Ha ocurrido un error, por favor intente más tarde' });
        });
    },

    getByCode (req, res) {
        Tallas.findOne({
            include: [
                {
                    model: Zapato,
                    include: [
                        {
                            model: Colores,
                        },
                        {
                            model: Clasificacion,
                        },
                        {
                            model: Marcas,
                        }
                    ]
                },
                {
                    model: Tiendas,
                },
            ],
            where: {
                codigo: req.query.codigo
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

