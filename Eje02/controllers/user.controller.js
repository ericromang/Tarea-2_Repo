const http = require('http');
const path = require('path');
const status = require('http-status');
const jwt = require('jsonwebtoken');
const _config = require('../_config');

const csvFilePath='C:\\Users\\Irma\\Documents\\Eric\\Empresariales\\U3\\Eje01\\controllers\\usuarioscsv.csv'
const csv=require('csvtojson');
let _user;
const insertarUsuarios = async (req, res) => {
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
        res.status(402);
        console.log(jsonObj);
        _user.create(jsonObj)
        .then((jsonObj)=> {
            res.status(200);
            res.json({msg:"Usuarios creados correctamente", jsonObj: jsonObj});
        })
        .catch((err)=> {
            res.status(400);
            res.json({msg:"Error!!!!", data:err});
        })
    }).catch((err) => {
        res.status(402);
    })
    const jsonArray= await csv().fromFile(csvFilePath);
}

const createUser = (req, res) => {
    const user = req.body;

    _user.create(user)
        .then((data)=> {
            res.status(200);
            res.json({msg:"Usuario creado correctamente", data: data});
        })
        .catch((err)=> {
            res.status(400);
            res.json({msg:"Error!!!!", data:err});
        })
}

const findAll = (req , res) => {
    _user.find()
    .then((data) => {
        res.status(200);
        if(data.length == 0){
            res.status(204);
            res.json({msg:"No se encontraron usuarios"});
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

const findUser = (req , res) => {
    const {id} = req.params;
    const params ={
        _id:id
    }
    _user.findOne(params)
    .then((data) => {
        res.status(200);
        if(data.length == 0){
            res.status(204);
            res.json({msg:"No se encontro el usuario"});
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

const findUserAndUpdate = (req , res) => {
    const {id} = req.params;
    const user = req.body;
    const params ={
        _id:id
    }
    _user.findOneAndUpdate(params,user)
    .then((data) => {
        res.status(200);
        if(data.length == 0){
            res.status(204);
            res.json({msg:"No se encontraron Usuarios"});
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

const deleteById = (req,res) =>{
    const {id} = req.params;
    const params ={
        _id:id
    }
    _user.findByIdAndRemove(params)
    .then((data) => {
        res.status(200);
        res.json({msg:"Éxito eliminado!!",data:data});
    })
    .catch((err)=>{
        res.status(400);
        res.json({msg:"Error! no se encontro el usuario",err: err});
    })
}

const loginUser = (req , res) => {
    const {email,password} = req.params;
    const params ={
        email:email,
        password:password
    }
    _user.findOne(params)
    .then((data) => {
        if(data.length == 0){
            res.status(204);
            res.json({msg:"No se encontraron Usuarios"});
        }else{
            const token = jwt.sign({email:email},_config.SECRETJWT);
            res.status(200);
            res.json({
                msg:"Acceso exitoso",
                data:{
                    email:email,
                    token:token
                }
            });
        }
    })
    .catch((err)=>{
        res.status(400);
        res.json({msg:"Error!"});
    })
}

module.exports = (User) => {
    _user = User;
    return({
        createUser,
        findAll,
        findUser,
        deleteById,
        findUserAndUpdate,
        loginUser,
        insertarUsuarios
    });
}
