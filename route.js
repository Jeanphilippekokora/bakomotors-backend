var router = require('express').Router();

const Commande = require("./central/commande");

router.post("/", function(req, res, next){
    const com = new Commande({
        model:req.body.model,
        comment:req.body.comment,
        email:req.body.email,
        username:req.body.username,
    });
    com.save().then(c => res.json(c)).catch(err => res.status(500).json(err));
})

router.get("/", function(req, res, next){
    console.log("affiche toii");
    Commande.find().then(c => res.json(c)).catch(err => res.status(500).json(err));
});

module.exports=router;