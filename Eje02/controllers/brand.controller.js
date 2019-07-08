const http = require('http');
const path = require('path');

let _brand;

const createBrand = (req, res) => {
    const brand = req.body;

    _brand.create(brand)
        .then((data)=> {
            res.status(200);
            res.json({msg:"Marca creada correctamente", data: data});
        })
        .catch((err)=> {
            res.status(400);
            res.json({msg:"Error!!!!", data:err});
        })
}

const findAllBrands = (req , res) => {
    _brand.find()
    .then((data) => {
        res.status(200);
        if(data.length == 0){
            res.status(204);
            res.json({msg:"No se encontraron marcas"});
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
const findBrand = (req , res) => {
    const {id} = req.params;
    const params ={
        _id:id
    }
    _brand.findOne(params)
    .then((data) => {
        res.status(200);
        if(data.length == 0){
            res.status(204);
            res.json({msg:"No se encontraron marcas"});
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
const findBrandAndUpdate = (req , res) => {
    const {id} = req.params;
    const brand = req.body;
    const params ={
        _id:id
    }
    _brand.findOneAndUpdate(params,brand)
    .then((data) => {
        res.status(200);
        if(data.length == 0){
            res.status(204);
            res.json({msg:"No se encontraron marcas"});
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


const deleteByIdBrand = (req,res) =>{
    const {id} = req.params;
    const params ={
        _id:id
    }
    _brand.findByIdAndRemove(id)
    .then((data) => {
        res.status(200);
        res.json({msg:"Éxito eliminado!!",data:data});
    })
    .catch((err)=>{
        res.status(400);
        res.json({msg:"Error! no se encontro la marca"});
    })
}
module.exports = (Brand) => {
    _brand = Brand;
    return({
        createBrand,
        findAllBrands,
        findBrand,
        deleteByIdBrand,
        findBrandAndUpdate
    });
}
