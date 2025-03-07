const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require("./routes/auth/auth-routes")
const adminProductsRouter = require("./routes/admin/products-routes");
const shoppingProductRouter = require('./routes/shopping/products-routes')

mongoose.connect('mongodb+srv://digvijaysingh50048:hjyKThwxJwEB8bcb@cluster0.rs6ky.mongodb.net/').then(()=>{
    console.log('Connected to database');
}).catch((err)=>{
    console.log("Error in connecting to database",err);
});

const app = express();
const PORT= process.env.PORT || 5000 ;

app.use(
    cors({
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST","PUT","DELETE"],
        allowedHeaders: ["Content-Type", "Authorization","Cache-Control","Expires","Pragma"],
        credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/shopping/products", shoppingProductRouter);

app.listen(PORT,()=>{
    console.log('Server is running on port',PORT);
})