const router = require('express').Router();

module.exports = (wagner) => {
    
    const brandCtrl = wagner.invoke((Brand) => 
        require('../controllers/brand.controller')(Brand));
    
    router.post('/', (req, res) =>
        brandCtrl.createBrand(req, res));
    
    router.get('/',(req,res)=>
        brandCtrl.findAllBrands(req,res));
    
    router.get('/:id',(req,res)=>
        brandCtrl.findBrand(req,res));

    router.delete('/:id',(req,res)=>
        brandCtrl.deleteByIdBrand(req,res));

    router.put('/:id',(req,res)=>
        brandCtrl.findBrandAndUpdate(req,res));
        

    return router;
}