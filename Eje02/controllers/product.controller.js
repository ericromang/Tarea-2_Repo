const http = require('http');
const path = require('path');

let _product;

const createProduct = (req, res) => {
    const product = req.body;

    _product.create(product)
        .then((data)=> {
            res.status(200);
            res.json({msg:"Producto creado correctamente", data: data});
        })
        .catch((err)=> {
            res.status(400);
            res.json({msg:"Error!!!!", data:err});
        })
}

const findAll = (req , res) => {
    _product.find()
    .then((data) => {
        res.status(200);
        if(data.length == 0){
            res.status(204);
            res.json({msg:"No se encontraron productos"});
        }else{
            res.status(200);
            res.json({msg:"Éxito!!",data:data});
        }
    })
    .catch((err)=>{
        res.status(400);
        res.json({msg:"Error!"});
    })
}

const findProduct = (req , res) => {
    const {id} = req.params;
    const params ={
        _id:id
    }
    _product.findOne(params)
    .then((data) => {
        res.status(200);
        if(data.length == 0){
            res.status(204);
            res.json({msg:"No se encontro el producto"});
        }else{
            res.status(200);
            res.json({msg:"Éxito!!",data:data});
        }
    })
    .catch((err)=>{
        res.status(400);
        res.json({msg:"Error!"});
    })
}

const findProductAndUpdate = (req , res) => {
    const {id} = req.params;
    const product = req.body;
    const params ={
        _id:id
    }
    _product.findOneAndUpdate(params,product)
    .then((data) => {
        res.status(200);
        if(data.length == 0){
            res.status(204);
            res.json({msg:"No se encontraro el producto"});
        }else{
            res.status(200);
            res.json({msg:"Éxito!! producto actualiazado",data:data});
        }
    })
    .catch((err)=>{
        res.status(400);
        res.json({msg:"Error!",err:err});
    })
}

const deleteById = (req,res) =>{
    const {id} = req.params;
    const params ={
        _id:id
    }
    _product.findByIdAndRemove(params)
    .then((data) => {
        res.status(200);
        res.json({msg:"Éxito eliminado!!",data:data});
    })
    .catch((err)=>{
        res.status(400);
        res.json({msg:"Error! no se encontro el producto",err: err});
    })
}

module.exports = (Product) => {
    _product = Product;
    return({
        createProduct,
        findAll,
        findProduct,
        deleteById,
        findProductAndUpdate
    });
}
