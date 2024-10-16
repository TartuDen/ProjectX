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

// Handle form submission from the Equipment List
app.post("/submit-equipment", async (req, res) => {
    // Extract submitted data from the request body
    const submittedEquipments = req.body.selectedEquipments;  // For selected equipment checkboxes
    const reagentNames = req.body.reagentName || [];           // For reagent names
    const whCodes = req.body.whCode || [];                    // For WH codes
    const amounts = req.body.amount || [];                    // For amounts in kg

    // Log the data to the console
    console.log('Selected Equipments:', submittedEquipments);
    console.log('Reagent Names:', reagentNames);
    console.log('WH Codes:', whCodes);
    console.log('Amounts (kg):', amounts);

    // Send a response back to the client
    res.send('Form data received and logged.');
});

app.get("/", async(req, res)=>{
    const equipmentList = await GetEquipmentListMOCK();
    const reactorOps = await GetReactorOperationsMOCK();
    const dFilterOps = await GetDFilterOperationsMOCK();
    const nFilterOps = await GetNFilterOperationsMOCK();
    const pPumpOps = await GetPPumpOperationsMOCK();
    const cOvenOps = await GetConvOvenOperationsMOCK();
    res.status(200).render("index.ejs",{equipmentList, reactorOps, dFilterOps,nFilterOps,pPumpOps,cOvenOps});
})

app.listen(port,(err)=>{
    if(err) throw err;
    console.log("Server is running on port: ",port);
})