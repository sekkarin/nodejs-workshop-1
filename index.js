const express = require('express')
const ejs = require('ejs')
const app = express()
const Product = require('./db/model')

const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000
app.set('view engine', 'ejs')
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'))
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    res.render('index')
})

app.all('/add-product', (req, res) => {
    // console.log(req.body.name);
    if (!req.body.name) {
        res.render('addProduct')
    }
    else {
        let form = req.body
        let data = {
            name: form.name || '',
            price: form.price || 0,
            stock: form.stock || 0,
            data_add: form.date_add || new Date(),
            description: form.description || ''
        }
        Product.create(data, err => {
            let r = (err) ? false : true
            res.render('addProduct', { result: r })

        })
    }
})

app.get('/show-product-search', (req, res) => {
    let q = req.query.q || ''
    Product.find({ name: { $regex: q, $options: 'i' } })
        .exec((err, docs) => [
            res.render('show-product-search', {
                data: docs, q: q
            })
        ])
})
app.get('/product', (req, res) => {
    Product.find()
        .exec((err, docs) => {
            res.render("show-all", { data: docs })
        })
})

app.get('/edit-product', (req, res) => {
    let q = req.query.q || ''
    Product.find({ name: { $regex: q, $options: 'i' } })
        .exec((err, docs) => [
            res.render('editeProduct', {
                data: docs, q: q
            })
        ])
})

app.all('/edit-product/edit/:id', (req, res) => {
    if(req.method == "GET"){
        if(req.params.id){
            let id = req.params.id
            Product.findByIdAndUpdate(req.params.id)
            .exec((err,doc)=>{
                res.render('edit',{data:doc})
            })
        }else{
            res.render('/edit-product')
        }
    }else if(req.method == "POST"){
        let form = req.body
        let data = {
            name: form.name || '',
            price: form.price || 0,
            stock: form.stock || 0,
            date_added: new Date(Date.parse(form.date_added)) || new Date(),
            description: form.description || ''
        }
        Product.findByIdAndUpdate(req.params.id,data,{useFindAndModify:false})
        .exec(err =>{
            res.redirect('/edit-product')
        })
    }
})

app.get('/delete-product/:id', (req, res) => {
    if (req.params.id){
        Product.findByIdAndDelete(req.params.id,{
            useFindAndModify:false
        }).exec(err =>{
            res.redirect('/edit-product')
        })
    }
})


app.listen(PORT, () => { console.log("server started on port 3000"); })