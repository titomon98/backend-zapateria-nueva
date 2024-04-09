'use strict'
const Sequelize     = require('sequelize');
const db = require("../../models");
const Traslado = db.traslados;
const DetalleTraslado = db.detalle_traslados;
const Usuarios = db.usuarios;
const Tiendas = db.tiendas;
const Op = db.Sequelize.Op;

module.exports = {
    create(req, res) {
        let form = req.body
        const fechaActual = new Date();
        const fechaString = `${fechaActual.getFullYear()}-${(fechaActual.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${fechaActual.getDate().toString().padStart(2, '0')}`;
        const datos = {
            fecha: fechaString,
            descripcion: form.descripcion,
            id_usuario: form.id_usuario,
            id_tienda_envio: form.tienda1.id,
            id_tienda_recibe: form.tienda2.id,
            id_responsable_envio: form.responsable.id,
            cantidad: form.cantidad,
            estado: 2
        };

        Traslado.create(datos)
        .then(traslado => {
            const traslado_id = traslado.id
            let total = 0;
            let detalles = form.detalle
            let cantidad = form.detalle.length
            for (let i = 0; i < cantidad; i++){
                let id_medicine = detalles[i].id_medicine
                let datos_detalles = {
                    cantidad: detalles[i].cantidad,
                    descripcion: detalles[i].descripcion,
                    subtotal: detalles[i].total,
                    estado: 2,
                    id_traslado: traslado_id,
                    id_medicamento: id_medicine
                }
                total = total + parseFloat(detalles[i].total)
                DetalleTraslado.create(datos_detalles)
            }
            res.send(traslado);
        })
        .catch(error => {
            console.log(error)
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

        var condition = busqueda ? { [Op.or]: [{ descripcion: { [Op.like]: `%${busqueda}%` } }] } : null ;

        Traslado.findAndCountAll({ 
            include: [
                {
                    model: DetalleTraslado,
                    require: true,
                },
                {
                    model: Usuarios,
                    require: true,
                },
                {
                    model: Tiendas,
                    require: true,
                },
            ],
            where: condition,order:[[`${criterio}`,`${order}`]],limit,offset})
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

        return Traslado.findByPk(id)
        .then(traslado => res.status(200).send(traslado))
        .catch(error => res.status(400).send(error))
    },

    update (req, res) {
        let form = req.body.form
        Traslado.update(
            {
                fecha: form.fecha,
                descripcion: form.descripcion,
            },
            { where: { 
                id: form.id 
            } }
        )
        .then(traslado => res.status(200).send('El registro ha sido actualizado'))
        .catch(error => {
            console.log(error)
            return res.status(400).json({ msg: 'Ha ocurrido un error, por favor intente más tarde' });
        });
    },

    ingreso (req, res) {
        let form = req.body.form
        Traslado.update(
            {
                id_responsable_recibe: form.recibe.id,
                inconsistencias: form.inconsistencias
            },
            { where: { 
                id: form.id 
            }}
        )
        .then(traslado => res.status(200).send('El traslado ha sido ingresado a nueva tienda'))
        .catch(error => {
            console.log(error)
            return res.status(400).json({ msg: 'Ha ocurrido un error, por favor intente más tarde' });
        });
    },

    activate (req, res) {
        Traslado.update(
            { estado: 1 },
            { where: { 
                id: req.body.id 
            } }
        )
        .then(traslado => res.status(200).send('El registro ha sido activado'))
        .catch(error => {
            console.log(error)
            return res.status(400).json({ msg: 'Ha ocurrido un error, por favor intente más tarde' });
        });
    },

    deactivate (req, res) {
        Traslado.update(
            { estado: 0 },
            { where: { 
                id: req.body.id 
            } }
        )
        .then(traslado =>res.status(200).send('El registro ha sido desactivado'))
        .catch(error => {
            console.log(error)
            return res.status(400).json({ msg: 'Ha ocurrido un error, por favor intente más tarde' });
        });
    },

    async confirm (req, res) {
        const detalles = await DetalleTraslado.findAll({ where: { 
            id_traslado: req.body.id 
        }});
        console.log(detalles)
        Traslado.update(
            { estado: 1 },
            { where: { 
                id: req.body.id 
            }}
        )
        .then(traslado => {
            DetalleTraslado.update({ estado: 1 },
            { where: { 
                id_traslado: req.body.id 
            }})
            detalles.forEach(element => {
                
            });
            res.status(200).send('El registro ha sido desactivado')
        })
        .catch(error => {
            console.log(error)
            return res.status(400).json({ msg: 'Ha ocurrido un error, por favor intente más tarde' });
        });
    },

    get (req, res) {
        Traslado.findAll({attributes: ['id', 'nombre']})
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
        var condition = busqueda?{ [Op.or]:[ {nombre: { [Op.like]: `%${busqueda}%` }}],[Op.and]:[{estado:1}] } : {estado:1} ;
        Traslado.findAll({
            include: [
                {
                    model: DetalleTraslado,
                    require: true,
                },
                {
                    model: Usuarios,
                    require: true,
                },
            ],
            where: condition})
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            console.log(error)
            return res.status(400).json({ msg: 'Ha ocurrido un error, por favor intente más tarde' });
        });
    },

    createRapido(req, res) {
        let form = req.body
        const fechaActual = new Date();
        const fechaString = `${fechaActual.getFullYear()}-${(fechaActual.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${fechaActual.getDate().toString().padStart(2, '0')}`;
        const datos = {
            fecha: fechaString,
            descripcion: form.descripcion,
            id_usuario: form.id_usuario,
            id_tienda_envio: form.tienda1.id,
            id_tienda_recibe: form.tienda2.id,
            id_responsable_envio: form.responsable.id,
            cantidad: form.cantidad,
            estado: 2
        };

        Traslado.create(datos)
        .then(traslado => {
            const traslado_id = traslado.id
            let cantidad = form.cantidad
            let descripcion = form.descripcion

            let datos_detalles = {
                cantidad: cantidad,
                descripcion: descripcion,
                subtotal: 0,
                estado: 2,
                id_traslado: traslado_id,
                id_talla: form.id
            }

            DetalleTraslado.create(datos_detalles)

            res.send(traslado);
        })
        .catch(error => {
            console.log(error)
            return res.status(400).json({ msg: 'Ha ocurrido un error, por favor intente más tarde' });
        });
                    
    },
};

