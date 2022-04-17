const express = require('express');
const db = require('./database');
const Products = require('./routes/Products')


const app = express();



app.use('/api/products', Products);






const PORT = process.env.PORT || 5000;
app.listen(PORT , ()=> {
    console.log("Server is running on Port: ", PORT);

    db.connect((err)=> {
        if(err){
            // throw err;
            console.log(err);
        }
        else{
            console.log("Connected to mysql database");
        }
    })

})