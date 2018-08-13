const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');

//get a list of ninjas from the db
router.get('/ninjas',(req,res,next)=>{
  Ninja.aggregate().near({
    geoNear:"Store",
    near:{type:"Point",coordinates:[parseFloat(req.query.lng),parseFloat(req.query.lat)]},
    maxDistance: 100000,
    spherical:true,
    distanceField:"dist.calculated"
  }).then((ninjas)=>{
    res.send(ninjas);
  }).catch(next);
});

//add data to the databasw
router.post('/ninjas',(req, res,next)=>{
  Ninja.create(req.body).then((ninja)=>{
    res.send(ninja);
  }).catch(next);
});

//update data
router.put('/ninjas/:id',(req, res,next)=>{
  Ninja.findByIdAndUpdate({_id: req.params.id},req.body).then((ninja)=>{
    Ninja.findOne({_id: req.params.id}).then((ninja)=>{
      res.send(ninja);
    });

  });

});


//delete data from the database
router.delete('/ninjas/:id',(req, res,next)=>{
  Ninja.findByIdAndRemove({_id:req.params.id}).then((ninja)=>{
    res.send(ninja);
  }).catch(err => console.log(err));
});

module.exports = router;
