'use strict'

var validator = require('validator');
var fs = require('fs'); // Modulo file system
var path = require('path'); // Modulo path

var Article = require('../models/article');
const { exists } = require('../models/article');

var controller = {

    datosCurso: (req, res) => {
        return res.status(200).send({
            Curso: 'Master en Frameworks JS',
            Autor: 'Jaime Esteban',
            Url: 'muyuqi.co',
        });
    },

    test: (req, res) => {
        return res.status(200).send({
            message: 'Soy la acción test de mi controlador de articulos'
        });
    },

    // Metodo para Guardar articulos
    save: (req, res) => {
        //Recoger los parametros por post
        var params = req.body;

        // Validar datos (validator)                    
        try {
            var validate_title = !validator.isEmpty(params.title); // va a dar true cuando no este vacio
            var validate_content = !validator.isEmpty(params.content);
        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar !!!'
            });
        }

        if (validate_title && validate_content) {

            // Crear el objeto a guardar
            var article = new Article();

            // Asignar valores
            article.title = params.title;
            article.content = params.content;
            if(params.image){
                article.image = params.image;
            }else{
                article.image = null;
            }
            

            // Guardar el articulo
            article.save((err, articleStored) => {
                if (err || !articleStored) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'El articulo no se a guardado'
                    });
                }
                // Devolver una respuesta
                return res.status(200).send({
                    status: 'success',
                    article: articleStored
                });
            });


        } else {
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son validos !!!'
            });
        }
    },

    // Metodo para enviar los ultimos 5 articulos
    getArticles: (req, res) => {
        var query = Article.find({})

        var last = req.params.last;
        if (last || last != undefined) {
            query.limit(4);
        }
        // Find
        query.sort('-_id').exec((err, articles) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los articulos !!!'
                });
            }

            if (!articles) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay articulos para mostrar !!!'
                });
            }
            return res.status(200).send({
                status: 'success',
                articles
            });
        });
    },

    // Metodo para devolver un articulo por medio del id
    getArticle: (req, res) => {

        // Recoger el id de la url
        var articleId = req.params.id;

        // Comprobar que existe
        if (!articleId || articleId == null) {
            return res.status(404).send({
                status: 'error',
                message: 'No existe el articulo !!!'
            });
        }

        // Buscar el articulo
        Article.findById(articleId, (err, article) => {

            if (err || !article) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el articulo !!!'
                });
            }

            // Devolver en json
            return res.status(200).send({
                status: 'success',
                article
            });
        });
    },

    // Metodo para actualizar datos
    update: (req, res) => {

        // Recoger el id del articulo por la url
        var articleId = req.params.id;

        // Recoger los datos que llagan por el put
        var params = req.body;

        // Validar datos
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar !!'
            });
        }
        if (validate_title && validate_content) {
            // Find and update
            Article.findOneAndUpdate({ _id: articleId }, params, { new: true }, (err, articleUpdated) => {
                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar !!!'
                    });
                }

                if (!articleUpdated) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el articulo !!!'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    article: articleUpdated
                });
            });
        } else {
            // Devolver respuesta
            return res.status(200).send({
                status: 'error',
                message: 'la validación no es correcta !!!'
            });
        }
    },

    // Metodo para eliminar un articulo
    delete: (req, res) => {
        // Recoger el id de la url
        var articleId = req.params.id;

        // Find and delete
        Article.findOneAndDelete({ _id: articleId }, (err, articleRemoved) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar !!!'
                });
            }

            if (!articleRemoved) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error o No existe el artculo !!!'
                });
            }

            return res.status(200).send({
                status: 'success',
                article: articleRemoved
            });
        });
    },

    // Subida de archivos
    upload: (req, res) => {
        // configurar el modulo del connect multiparty router/article.js


        // Recoger el fichero de la petición
        var file_name = 'Imagen no subida...'

        if (!req.file) {
            return res.status(404).send({
                status: 'error',
                message: file_name
            });
        }
        console.log(req.files);

        // Conseguir nombr y la extensión del archivo
        var file_path = req.file.path;
        var file_split = file_path.split('\\');

        // *** ADVERTENCIA * EN LINUX O MAC ***
        // var file_split = file_path.split('/');

        // Nombre del archivo
        var file_name = file_split[2];

        // Extensión del fichero
        var extension_split = file_name.split('\.');
        var file_ext = extension_split[1];

        // Comprobar la extensión, si no es valida borrar el fichero
        if (file_ext != 'png' && file_ext != 'PNG' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif') {
            // borrar el archivo subido
            fs.unlink(file_path, (err) => {
                return res.status(200).send({
                    status: 'error',
                    message: 'La extensión no es valida !!!'
                });
            });
        } else {
            // Si todo es valido,Sacando id de la url
            var articleId = req.params.id;

            if (articleId) {
                // Buscar el articulo, asignar el nombre de la imagen y actualizarlo
                Article.findOneAndUpdate({ _id: articleId }, { image: file_name }, { new: true }, (err, articleUpdated) => {
                    if (err || !articleUpdated) {
                        return res.status(200).send({
                            status: 'error',
                            message: 'error al guardar la imagen'
                        });
                    }

                    return res.status(200).send({
                        status: 'success',
                        article: articleUpdated
                    });
                });
            }else{
                return res.status(200).send({
                    status: 'success',
                    image: file_name
                });
            }
        }
    }, // end upload file

    //Metodo para buscar imagen
    getImage: (req, res) => {
        var file = req.params.image;
        var path_file = './upload/articles/' + file;

        fs.exists(path_file, (exists) => {
            if (exists) {
                return res.sendFile(path.resolve(path_file));

            } else {
                return res.status(404).send({
                    status: 'error',
                    message: 'la imagen no existe !!!'
                });
            }
        });
    },

    //Acción para buscar articulos en la API REST(buscador NodeJS)
    search: (req, res) => {
        // Sacar el string a buscar
        var searchString = req.params.search;

        // find or  //SI el searchString esta contenido en title o content entonces saca los articulos que coincidan 
        Article.find({
            "$or": [
                { "title": { "$regex": searchString, "$options": "i" } },
                { "content": { "$regex": searchString, "$options": "i" } }
            ]
        })
            .sort([['date', 'descending']]) //ordena por fecha y de manera desendente

            // exec ejecuta la query y saca los datos de la Base de Datos
            .exec((err, articles) => {
                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'error en la petición !!!'
                    });
                }

                if (!articles || articles.length <= 0) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No hay articulos que coincidan !!!'
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    articles
                });
            });
    }

}; // end controller

module.exports = controller;