require('dotenv').config()

const mongoose = require("mongoose")
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")

//My Routes
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")
const productRoutes = require("./routes/product")
const orderRoutes = require("./routes/order")
const stripeRoutes = require("./routes/stripePayment")
const paypalRoutes = require("./routes/paypalPayment")

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes middlewares
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", stripeRoutes);
app.use("/api", paypalRoutes);
if(process.env.ENVIRONMENT === "production"){
    app.get("/*", (req,res) => console.log(req.connection.remoteAddress + " => " + req.originalUrl));
}


//DB Connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("!!--------DB CONNECTED!--------!!");    
    //Creating a server
    app.listen(process.env.PORT || 8000, (req,res) => {
        console.log(`>> App is running at ${port}`);    
    });
});