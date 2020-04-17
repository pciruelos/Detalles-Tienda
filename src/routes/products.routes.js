const express = require('express');
const router = express.Router();
const multer = require('multer');

const {renderProductForm, createNewProduct, renderProducts,
     renderEditProducts, updateProducts, deleteProducts, render1, renderPuzzle } = require('../controllers/products.controller');

const { isAuthenticated } = require('../helpers/auth');


//nuevos productos

router.get('/products/add',isAuthenticated,  renderProductForm );

router.post('/products/new-product',isAuthenticated, createNewProduct );

//traer productos

router.get( '/allproducts' , renderProducts );

router.get( '/products/puzzle' , renderPuzzle );

router.get( '/individual/:id' , render1 );

//editar productos

router.get('/products/edit/:id', isAuthenticated, renderEditProducts );  //mostrar formulario

router.put('/products/edit/:id', isAuthenticated, updateProducts );  //actualizar finalmente

//borar prodcuts

router.delete('/delete/:id', isAuthenticated, deleteProducts );

module.exports = router;