const mongoose = require ('mongoose')
//add another type 
// Boolean − This type is used to store a boolean (true/ false) value.
//Integer − This type is used to store a numerical value. Integer can be 32 bit or 64 bit depending upon your server.
const clientSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required:[true,'Please enter your name']
        },
        email: {
            type:String,
            unique : true,
        },

        password:{
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
)

// collection 

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;