
//uppercase (Schema) = class ; lower case = constant
const mongoose = require('mongoose');

let parcelSchema = mongoose.Schema({
    _id: { type:mongoose.Schema.Types.ObjectId,auto:true},
    sender:{
        type: String,
        required:true
    },

    address:String,
        
    weight: {
        type: Number,
        required: true
    },

    fragile:String,
    actors: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Actor'
    }]
});

module.exports = mongoose.model('Parcel', parcelSchema);
