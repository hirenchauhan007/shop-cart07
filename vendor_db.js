const Sequelize = require('sequelize')
const Op = Sequelize.Op

const db = new Sequelize({
  dialect: 'sqlite', // mysql, postgres, mssql
  storage: __dirname + '/Shopping.db'
  // database : '',
  // host: 'localhost',
  // username: '',
  // password: '',
  // port: ''
})

const Vendors = db.define('vendor', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

const Products=db.define('product',{
  name:{
    type:Sequelize.STRING,
    allowNull:false, 
  },
  price:{
   type:Sequelize.FLOAT,
   allowNull:false
  },
  quantity:{
   type:Sequelize.INTEGER,
   allowNull:false
  },
  vendor:{
    type:Sequelize.STRING,
    allowNull:false
  }
}) 

const Users=db.define('user',{
  name:{
     type:Sequelize.STRING,
    allowNull:false,
  },
  email:{
    type:Sequelize.STRING,
    primaryKey:true,
    allowNull:false
  },
  password:{
     type:Sequelize.STRING,
     allowNull:false,
  }

}) 

const Cart=db.define('cart',{
   quantity:{
     type:Sequelize.STRING,
     allowNull:false
   }
  }) 
Products.hasMany(Cart)
Cart.belongsTo(Products)
Users.hasMany(Cart)
Cart.belongsTo(Users)


module.exports = {
  db, Vendors ,Products,Users,Cart
}