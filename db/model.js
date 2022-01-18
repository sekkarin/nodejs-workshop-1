const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL || "mongodb+srv://kennodejs:kennodejs@cluster0.magv9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
    useNewUrlParser:true , 
    useUnifiedTopology: true
}).catch(err => {console.log(err);})

const productSchema = new mongoose.Schema({
    name: {type: String, required: true },
    price: {type: Number, required: true, min: 0},
    stock: {type: Number, min: 0},
    date_added: {type: Date, default: new Date()},
    description: {type:String}
})

module.exports = mongoose.model('Product', productSchema)