const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/produc',{
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