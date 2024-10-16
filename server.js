// server.js
import express from "express";
import bodyParser from 'body-parser';
import env from 'dotenv'

import { GetEquipmentListMOCK, GetReactorOperationsMOCK, GetDFilterOperationsMOCK, GetNFilterOperationsMOCK, GetPPumpOperationsMOCK, GetConvOvenOperationsMOCK, GetParametersForOperationsMOCK, GetUtensilsMOCK } from './mocks.js'


const port = 8080;
const app = express();

const equipmentList = await GetEquipmentListMOCK();
const reactorOps = await GetReactorOperationsMOCK();
const dFilterOps = await GetDFilterOperationsMOCK();
const nFilterOps = await GetNFilterOperationsMOCK();
const pPumpOps = await GetPPumpOperationsMOCK();
const cOvenOps = await GetConvOvenOperationsMOCK();

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

// Handle form submission from the Equipment List
app.post("/submit-equipment", (req, res) => {
    const { selectedEquipments, reagentNames, whCodes, amounts } = req.body;
  
    // Prepare the equipment objects
    const equipmentData = selectedEquipments.map(equipName => {
      const equipmentInfo = equipmentList.find(eq => eq.name === equipName);
      return {
        name: equipName,
        code: equipmentInfo ? equipmentInfo.code : null,
        description: equipmentInfo ? equipmentInfo.description : null
      };
    });
  
    // Prepare the reagent objects
    const reagentsData = reagentNames.map((name, index) => ({
      reagent_name: name || null, // name is required
      reagent_code: whCodes[index] || null, // optional
      reagent_amount: amounts[index] || null // optional
    })).filter(reagent => reagent.reagent_name); // Filter out if name is missing
  
    console.log("Selected Equipments: ", equipmentData);
    console.log("Reagents Data: ", reagentsData);
  
    res.send("Data received and processed!");
  });
  


app.get("/", async(req, res)=>{

    res.status(200).render("index.ejs",{equipmentList, reactorOps, dFilterOps,nFilterOps,pPumpOps,cOvenOps});
})

app.listen(port,(err)=>{
    if(err) throw err;
    console.log("Server is running on port: ",port);
})