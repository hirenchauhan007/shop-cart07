
const express = require('express')
const {
  db,
  Vendors,
  Products,
  Users,
  Cart
} = require('./vendor_db')

const app = express()

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.use('/',
  express.static(__dirname + '/public')
)

app.get('/vendors', async (req, res) => {
  console.log('running get vendorsss')
  console.log(Vendors)
  const vendors = await Vendors.findAll()
  res.send(vendors)
})


app.post('/vendors', async (req, res) => {
  try {

    const result = await Vendors.create({
      name: req.body.name
    })
    res.send({ success: true })
  } catch (e) {
    res.send({ success: false, err: e.message })
  }
})

app.post('/vendors/:id', async (req, res) => {
  const id = req.body.id
  try {
    const findId = Vendors.findOne({ where: { id: id } }).then((data) => {
      console.log(data.name + "qwdsassa")
      Products.destroy({
        where: {
          vendor: data.name
        }
      }),
        Vendors.destroy({
          where: {
            id: id
          }
        })
      res.send({ success: true })
    })

    // console.log(findId+"asdf")
    // if(findId){ 
    //     Products.destroy({
    //       where:{
    //           vendor:findId.name
    //       }
    //     }),
    //     Vendors.destroy({
    //       where: {
    //          id:id
    //          } 
    //     })
    //   res.send({success: true})
    // }
  } catch (e) {
    res.send({ success: false, err: e.message })
  }
})


app.post('/products', async (req, res) => {

  console.log(req.body)
  try {
    const result = await Products.create({
      name: req.body.name,
      quantity: req.body.quantity,
      price: req.body.price,
      vendor: req.body.vendor
    })
    res.send({ success: true })
  } catch (e) {
    res.send({ success: false, err: e.message })
  }
})



app.get('/products', async (req, res) => {
  console.log('running get products')
  console.log(Products)
  const products = await Products.findAll()
  res.send(products)
})


app.post('/products/:id', async (req, res) => {

  const id = req.body.id
  try {
    const findId = Products.findOne({ where: { id: id } })
    if (findId) {
      Products.destroy({
        where: {
          id: id
        }
      })
      res.send({ success: true })
    }
  } catch (e) {
    res.send({ success: false, err: e.message })
  }
})


app.post('/users', async (req, res) => {
  console.log(req.body)
  try {
    console.log(' add user post clicked')
    const result = await Users.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
    res.send({ success: true })
  } catch (e) {
    res.send({ success: false, err: e.message })
  }
})

app.post('/users/login', async (req, res) => {
 // console.log("blaaa   " + req.body.email + "   blaaa   " + req.body.password + "  blaaa  ")

  const findId = Users.findOne({
    where: {
      email: req.body.email,
      password: req.body.password
    }
  }).then((data) => {

    console.log(data + "findid")
    if (data) {
      res.send({ success: true })
    }
    else {
      res.send({ success: false })
    }
  })
    .catch((err) => {
      res.send({ success: false })
    })



})


app.post('/carts', async (req, res) => {
  console.log(req.body.productId + "product id from body")
  try {
    let newQuantity;
    const findPreviousQuantity = Cart.findOne({
      where: {
        productId: req.body.productId,
        userEmail: req.body.userEmail
      }
    }).then((data) => {
      console.log(data + "  data  ")
      if (data) {
        newQuantity = parseInt(data.quantity) + 1
        data.update({
          quantity: newQuantity
        })
      }
      else {
        const result = /*await*/ Cart.create({
          productId: req.body.productId,
          userEmail: req.body.userEmail,
          quantity: 1
        })

      }

    }).catch((err) => {
      console.log("error" + err.message[0]);
      //  const result = /*await*/ Cart.create({
      //                   productId:req.body.productId,
      //                   userEmail:req.body.userEmail,
      //                   quantity:1
      //                   })
    })
    console.log(' add user CART post clicked')
    console.log("quantity " + newQuantity)
    // const result = await Cart.create({
    // productId:req.body.productId,
    // userEmail:req.body.userEmail,
    // quantity:newQuantity

    res.send({ success: true })
  } catch (e) {
    res.send({ success: false, err: e.message })
  }
})


app.get('/carts/:id', async (req, res) => {
  const  cartItems  =  await  Cart.findAll({
    where: {
         userEmail: req.params.id
    },
    include:
    [
      {
        model: Products
      }
    ]
  }
  )
  res.send(cartItems);
})

app.post('/carts/delete', async (req, res) => {

  const id = req.body.productId
  console.log(id + "from post remove cart")
  try {
    // const findId = Cart.findOne({ where: { productId: id },{userEmail:req.body.userEmail} })
    // if (findId) {
      console.log(id)
       Cart.destroy({
        where: {
          productId: id,
          userEmail:req.body.userEmail
         }
      })
      res.send({ success: true })
    }
   catch (e) {
    res.send({ success: false, err: e.message })
  }
})

db.sync()
  .then(() => {
    app.listen(1111, () => console.log('server is running'))
  })