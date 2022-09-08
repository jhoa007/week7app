const mongoose = require('mongoose');

let senderSchema = mongoose.Schema({
    _id: { type:mongoose.Schema.Types.ObjectId,auto:true},
    name: {
            type: String,
            validate:{
                validator: function(firstName){
                    return firstName.length >=3;
                },
                message:'Name should be more than 3 letters long'
            },
            required: true
    },
    parcels: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Parcel'
    }]
});

module.exports = mongoose.model('Sender', senderSchema);