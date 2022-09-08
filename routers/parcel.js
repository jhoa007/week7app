const mongoose = require('mongoose');

const Sender = require ('../models/sender');
const Parcel = require('../models/parcel');

module.exports = {
    //Retrieve all Documents from Sender Collection
    getAll : function(req,res){
        Parcel.find(function(err,parcels){
            if(err) return res.status(400).json(err);

            res.json(parcels);
        });

    },
  //Create New Document based on Parsed Data in 'req.body' and save it in the 'Parcel' collection
    createOne: function(req,res){
        let newParcelDets = req.body;
        newParcelDets = new mongoose.Types.ObjectId();
            Parcel.create(newParcelDets, function(err,parcel){
                if(err) return res.status(400).json(err);

                res.json(parcel);
            });
    },

    //Find One Sender Document by ID
    getOne: function(req,res){
        Parcel.findOne({_id: req.params.id})
        .populate('parcels')
        .exec(function(err,parcel){
            if(err) return res.status(400).json(err);
            if(!parcel) return res.status(404).json(err);

            res.json(parcel);
        });
    },
    // Find Document by ID and Set New content that is retrieved from 'req.body'    
    updateOne : function(req,res){
        Parcel.findOneAndUpdate({_id: req.params.id},req.body, function(err,parcel){
            if(err) return res.status(400).json(err);
            if(!parcel) return res.status(404).json(err);
            res.json(parcel);      
        });
    },
    //Delete Document 
    deleteOne : function (req,res){
        Parcel.findOneAndRemove({_id: req.params.id}, function(err){
            if(err) return res.status(400).json(err);
            res.json();
        });
    },
 }

