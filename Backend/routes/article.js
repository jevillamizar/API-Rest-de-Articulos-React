'use strict'

var express = require('express');
var ArticleController = require('../controllers/article');

var router = express.Router();

// Ruta para subir archivos 
// var multipart = require('connect-multiparty');
// var md_upload = multipart({ uploadDir:'./upload/articles'});
var multer =require('multer');
var upload = multer({dest:'./upload/articles'});


// Rutas de prueba
router.get('/datos-curso', ArticleController.datosCurso);
router.get('/test-de-controlador', ArticleController.test);

// Rutas útiles
router.post('/save', ArticleController.save);
router.get('/articles/:last?', ArticleController.getArticles);
// el uso de :last? es para mandar la peticion de enviar los ultimos 
router.get('/article/:id', ArticleController.getArticle);
router.put('/article/:id', ArticleController.update);
router.delete('/article/:id', ArticleController.delete);
router.post('/upload-image/:id?',  upload.single('file0'), ArticleController.upload);
router.get('/get-image/:image', ArticleController.getImage);
router.get('/search/:search', ArticleController.search);

module.exports = router;