const mongoose = require('mongoose');

const Sender = require ('../models/sender');
const Parcel = require('../models/parcel');

module.exports = {
    //Retrieve all Documents from Sender Collection
    getAll : function (req,res){
        Sender.find(function(err,senders){
            if(err){
                return res.json(err);
            }
            else {
                res.json(senders);
            }
        });
    },
    //Create New Document based on Parsed Data in 'req.body' and save it in the 'Sender' collection
    createOne : function(req,res){
        let newSenderDets = req.body;
        newSenderDets._id = new mongoose.Types.ObjectId();

        let sender = new Sender(newSenderDets);
        sender.save(function(err){
            console.log('Sender Created');
            res.json(sender);
        });
    },

    //Find One Sender Document by ID
    getOne: function(req,res){
        Sender.findOne({_id: req.params.id})
        .populate('parcels') //replaces each ID in array 'parcel' with its documents.
        .exec(function(err,sender){
            if(err) return res.json(err);
            if(!sender) return res.json();
            res.json(sender);
        })
    },

    // Find Document by ID and Set New content that is retrieved from 'req.body'    
    updateOne : function (req,res){
        Sender.findOneAndUpdate({_id:req.params.id},req.body, function(err,sender){
            if(err) return res.status(400).json(err);
            if(!sender) return res.status(404).json();

            res.json(sender);
        });
    },

    //Delete Document 
    deleteOne : function (req,res){
        Sender.findOneAndRemove({_id: req.params.id}, function(err){
            if(err) return res.status(400).json(err);
            res.json();
        });
    },

    //Add Parcel
    addParcel : function(req,res){
        Sender.findOne({_id: req.params.id}, function(err,sender){
            if(err) return res.status(400).json(err);
            if(!sender) return res.status(404).json();

            Parcel.findOne({_id: req.body.id}, function(err,parcel){
                if(err) return res.status(400).json(err);
                if(!parcel) return res.status(404).json();

                sender.parcels.push(parcel._id);
                sender.save(function(err){
                    if(err) return res.status(500).json(err);

                    res.json(sender);
                });
            })
        });
    }
}