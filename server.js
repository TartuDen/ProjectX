// server.js
import express from "express";
import bodyParser from 'body-parser';
import session from 'express-session';
import env from 'dotenv';
import { GetEquipmentListMOCK, GetReactorOperationsMOCK, GetDFilterOperationsMOCK, GetNFilterOperationsMOCK, GetPPumpOperationsMOCK, GetConvOvenOperationsMOCK } from './mocks.js';

const port = 8080;
const app = express();

const equipmentList = await GetEquipmentListMOCK();
const reactorOps = await GetReactorOperationsMOCK();
const dFilterOps = await GetDFilterOperationsMOCK();
const nFilterOps = await GetNFilterOperationsMOCK();
const pPumpOps = await GetPPumpOperationsMOCK();
const cOvenOps = await GetConvOvenOperationsMOCK();

// Middleware setup
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
env.config();

// Session middleware setup
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 } // 1 hour
}));

// Handle form submission from the Equipment List
app.post("/submit-equipment", (req, res) => {
  const { selectedEquipments, reagentName, whCode, amount } = req.body;

  // Prepare the equipment objects
  let equipmentData;
  if(selectedEquipments){
       equipmentData = selectedEquipments.map(equipName => {
    const equipmentInfo = equipmentList.find(eq => eq.name === equipName);
    return {
      name: equipName,
      code: equipmentInfo ? equipmentInfo.code : null,
      description: equipmentInfo ? equipmentInfo.description : null
    };
  });
  }else{
     equipmentData = [];
  }


  // Prepare the reagent objects
  const reagentsData = reagentName.map((name, index) => ({
    reagent_name: name || null, // name is required
    reagent_code: whCode[index] || null, // optional
    reagent_amount: amount[index] || null // optional
  })).filter(reagent => reagent.reagent_name); // Filter out if name is missing

  // Store reagentsData in the session
  req.session.reagentsData = reagentsData;

  console.log("Selected Equipments: ", equipmentData);
  console.log("Reagents Data: ", reagentsData);

  res.redirect("/");
});

  


app.get("/", async(req, res)=>{
  const reagentsData = req.session.reagentsData || []; // Retrieve reagentsData from session

    res.status(200).render("index.ejs",{equipmentList, reactorOps, dFilterOps,nFilterOps,pPumpOps,cOvenOps, reagentsData});
})

app.listen(port,(err)=>{
    if(err) throw err;
    console.log("Server is running on port: ",port);
})