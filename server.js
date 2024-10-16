import express from "express";
import bodyParser from 'body-parser';
import env from 'dotenv'

import { GetEquipmentListMOCK, GetReactorOperationsMOCK, GetDFilterOperationsMOCK, GetNFilterOperationsMOCK, GetPPumpOperationsMOCK, GetConvOvenOperationsMOCK, GetParametersForOperationsMOCK, GetUtensilsMOCK } from './mocks.js'


const port = 8080;
const app = express();

// Middleware setup
app.use(express.static("public")); // Serving static files from the "public" directory
app.use(bodyParser.urlencoded({ extended: true })); // Parsing urlencoded request bodies
app.use(bodyParser.json());
env.config();
// app.use(session({
//     secret: process.env.SESSION_SECRET, // Replace 'secret-key' with a secret key for session encryption
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         maxAge: 1000 * 60 * 60
//     }
// }));

// app.use(passport.initialize());
// app.use(passport.session());


app.get("/", async(req, res)=>{
    console.log(".....here.......\n", await GetUtensilsMOCK());
    res.status(200).render("index.ejs",)
})

app.listen(port,(err)=>{
    if(err) throw err;
    console.log("Server is running on port: ",port);
})