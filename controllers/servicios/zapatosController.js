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
    create(req, res) {
        let form = req.body.form
        const datos = {
            estilo: form.estilo,
            caracteristicas: form.caracteristicas,
            precio_costo: form.precio_costo,
            precio_venta: form.precio_venta,
            precio_minimo: form.precio_minimo,
            precio_mayorista: form.precio_mayorista,
            estado: 1,
            id_color: form.color.id,
            id_marca: form.marca.id,
            id_clasificacion: form.clasificacion.id
        };

        Zapato.create(datos)
        .then(tipo => {
            let fotos = req.body.form.base64Images
            let cantidad = req.body.form.base64Images.length
            for (let i = 0; i < cantidad; i++){
                let datos_foto = {
                    foto: fotos[i],
                    id_zapato: tipo.id
                }
                Foto.create(datos_foto).then(tipo => {
            
                    console.log('OK!')
                })
            }
            res.send(tipo);
        })
        .catch(error => {
            //console.log(error)
            return res.status(400).json({ msg: 'Ha ocurrido un error, por favor intente más tarde' });
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

        var condition = busqueda ? { [Op.or]: [{ nombre: { [Op.like]: `%${busqueda}%` } }] } : null ;

        Zapato.findAndCountAll({ 
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
        ],where: condition,order:[[`${criterio}`,`${order}`]],limit,offset})
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
    },


    find (req, res) {
        const id = req.params.id;

        return Zapato.findByPk(id)
        .then(banco => res.status(200).send(banco))
        .catch(error => res.status(400).send(error))
    },

    update (req, res) {
        let form = req.body.form
        Zapato.update(
            { 
                nombre: form.name,
                estilo: form.estilo,
                caracteristicas: form.caracteristicas,
                precio_costo: form.precio_costo,
                precio_venta: form.precio_venta,
                precio_minimo: form.precio_minimo,
                precio_mayorista: form.precio_mayorista,
            },
            { where: { 
                id: form.id 
            } }
        ).then(tipo => {
            let fotos = req.body.form.base64Images
            let cantidad = req.body.form.base64Images.length
            for (let i = 0; i < cantidad; i++){
                let datos_foto = {
                    foto: fotos[i],
                    id_zapato: form.id 
                }
                Foto.create(datos_foto).then(tipo => {
            
                    console.log('OK!')
                })
            }
            res.send(tipo);
        })
        .catch(error => {
            console.log(error)
            return res.status(400).json({ msg: 'Ha ocurrido un error, por favor intente más tarde' });
        });
    },

    activate (req, res) {
        Zapato.update(
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
        Zapato.update(
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
        Zapato.findAll({
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
            ],
            limit: 10,
            order: [['id', 'DESC']]
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
        var tienda = req.query.tienda
        console.log(req.query)
        if (tienda === 0) {
            Tallas.findAll({
                attributes: ['id', 'talla'],
                include: [
                    {
                        model: Zapato,
                        where: {
                            estilo: {
                                [Op.like]: `%${busqueda}%`
                            }, 
                            estado: 1
                        },
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
            })
            .then(data => {
                res.send(data);
            })
            .catch(error => {
                console.log(error)
                return res.status(400).json({ msg: 'Ha ocurrido un error, por favor intente más tarde' });
            });
        } else {
            Tallas.findAll({
                attributes: ['id', 'talla', 'cantidad'],
                include: [
                    {
                        model: Zapato,
                        where: {
                            estilo: {
                                [Op.like]: `%${busqueda}%`
                            }, 
                            estado: 1
                        },
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
            })
            .then(data => {
                res.send(data);
            })
            .catch(error => {
                console.log(error)
                return res.status(400).json({ msg: 'Ha ocurrido un error, por favor intente más tarde' });
            });
        }
        
    }
};

