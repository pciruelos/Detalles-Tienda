const productsCtrl = {};
const path = require('path');
const { unlink } = require('fs-extra');

const producto = require('../models/products')



productsCtrl.renderProductForm = (req, res) => {
    res.render('products/new-product');
};

productsCtrl.createNewProduct = async (req, res) => {
    const {Titulo, DescripcionCorta, DescripcionLarga, LinkDePago, Detalles, Categoria , Precio }  = req.body ;
    const newProducto = new producto({Titulo , DescripcionCorta, DescripcionLarga, LinkDePago, Detalles , Categoria , Precio, image: '/uploads/' + req.file.filename  });
    console.log(req.file);
    console.log(newProducto);
    await newProducto.save();
    req.flash('success_msg', 'Producto agregado correctamente');
    res.redirect('/allproducts');
};

productsCtrl.renderProducts = async (req, res) => {
    const productos = await producto.find().lean();
    console.log(productos);
    res.render('products/all-products', { productos });
};

productsCtrl.renderEditProducts = async (req, res) => {
    const produ = await producto.findById(req.params.id);
    console.log(produ);
    res.render('products/edit-products', { produ });
};

productsCtrl.render1 = async (req, res) => {
    const produ = await producto.findById(req.params.id);
    console.log(produ);
    res.render('products/individual', { produ });
};

productsCtrl.renderPuzzle = async (req, res) => {
    const categoria4 = await producto.find({"Categoria": "4"});
    console.log(categoria4);
    res.render('products/puzzle', { categoria4 });
};

productsCtrl.updateProducts = async (req, res) => {
    const { Titulo, Descripcion, Precio} = req.body;
    await producto.findByIdAndUpdate(req.params.id, {Titulo, Descripcion, Precio});
    console.log(req.body);
    req.flash('success_msg', 'Producto Editado correctamente');
    res.redirect('/allproducts');
};

productsCtrl.deleteProducts = async (req, res) => {
   
    const img = await producto.findByIdAndDelete(req.params.id);
    await unlink(path.resolve('./src/public'+ img.image));
    req.flash('success_msg', 'Producto Eliminiado correctamente');
    res.redirect('/allproducts')
};

module.exports = productsCtrl;