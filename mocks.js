function simulateDelay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

equipment = [
  {
    id: 1,
    name: "reactor",
    code: "002-13",
    description: "150L glass reactor",
  },
  {
    id: 2,
    name: "reactor",
    code: "002-14",
    description: "150L glass reactor",
  },
  {
    id: 3,
    name: "druck filter",
    code: "046-6",
    description: "ss filter with 40L receiver",
  },
  {
    id: 4,
    name: "druck filter",
    code: "046-7",
    description: "ss filter with 140L receiver",
  },
];

// Reactor Operations
async function GetReactorOperationsMOCK() {
  await simulateDelay(500);
  return [
    {
      operation_type: "prepare_of_reactor",
      content: `Reactor preparation:
    The reactor {reactor} and thermostat are checked to be ready for work. 
    A stirrer drive is installed.
    On lid (clockwise):
    1. Reflux condenser on ball ground joint
    2. 60 mm flange port (with lid)
    3. Valve (for loading liquid).
    4. Overpressure release valve
    5. Liquid dosage system
    6. Thermometer
    7. Valve with PTFE tubing for sparging of argon, closed, connected to argon cylinder with reducing valve;
    The cold trap is connected behind the reactor.`,
      other: ``,
    },
    {
      operation_type: "material_load_of_solid",
      content: `Loading into reactor:
    Required amount of {material} is weighed on the balances {balances} into jug "{jug}" using a plastic scoop. 
    Weighted material is loaded into reactor {reactor} in portions via a 60 mm flange port using funnel "{funnel}". 
    The 60 mm flange port is closed.
    
    Specified amount: ….. kg (….. - ….. kg)`,
      other: `Warehouse code:
    ...........
    Actual loading:
    ....... kg`,
    },
    {
      operation_type: "material_load_of_liquid",
      content: `Loading into reactor:
    Required amount of {material} is weighed on the balances {balances} using jug "{jug}". 
    Using peristaltic pump  {p_pump} and norprene hose "{hose}", weighted material is pumped into the reactor via a liquid loading valve. 
    The peristaltic pump is set to {ppumpSetMin} {ppumpSetMax}%. 
    After loading is done, the pump is stopped, and the hose is removed. 
    The 60 mm flange port is closed. 
    The hose is cleaned and dried.

    Specified amount: ….. kg (….. - ….. kg)`,
      other: `Warehouse code:
    ...........
    Actual loading:
    ....... kg
    Actual pump
    setting: ..... %`,
    },
    {
      operation_type: "material_load_drop_funnel",
      content: `Loading into dropping funnel:
The required amount of {material} is weighed on the balances {balances} using jug "{jug}". 
Using peristaltic pump  {p_pump} and norprene hose "{hose}", weighted material is pumped into the dosing system. 
The peristaltic pump is set to {ppumpSetMin} {ppumpSetMax}%. 
After loading is done, the pump is stopped, hose is removed. 
The dosing system is closed. The hose is cleaned and dried.

Specified amount: ….. kg (….. - ….. kg)`,
      other: `Warehouse code:
...........
Actual loading:
....... kg
Actual pump
setting: ..... %`,
    },
    {
      operation_type: "material_add_dropwise",
      content: `Dropwise addition:
Material is added dropwise from dropping funnel.
Addition is temperature controlled.
Keep the temperature of reaction mixture in range {targetTempMin}{targetTempMax}°C.
Set the thermostat to the temperature {initialTempSet}°C.
Once temperaute in require range, change the setting of thermostat to {finalTempSet}°C.
Stirring is set to range {rpmMin}{rpmMax} rpm.`,
      other: `Actual thermostat
setting: ..... °C
Actual stirring
setting: .... rpm`,
    },
    {
      operation_type: "argon_start_flow",
      content: `Argon flow:
Argon line is connected to the argon port of reactor {reactor}. 
The Argon flow is set to {flowMin}{flowMax}l/min. 
The valve is opened.`,
      other: `Actual flow
setting: .... l/min`,
    },
    {
      operation_type: "argon_stop_flow",
      content: `After the required time is passed, the argon flow is closed.`,
      other: `Actual flow
setting: .... l/min`,
    },
    {
      operation_type: "reaction_hold_time",
      content: `Hold time:
Reaction mixture is stirred during {durationMin}{durationMax} . 
Temperature set is {targetTempMin}{targetTempMax}°C. 
Stirring is set to {rpmMin}{rpmMax} rpm.`,
      other: `Actual temp
setting: ..... °C
Actual stirring
setting: .... rpm`,
    },
    {
      operation_type: "reaction_stir_ON",
      content: `Stirring in reactor {reactor} is turned ON. 
Set to {rpmMin}{rpmMax} rpm.`,
      other: `Actual stirring
setting: .... rpm`,
    },
    {
      operation_type: "reaction_stir_OFF",
      content: "Stirring in reactor {reactor} is turned OFF.",
      other: ``,
    },
    {
      operation_type: "reaction_heat/cool_ON",
      content: `<Heating/cooling> of reactor {reactor} is turned ON.
The target temperature range is {targetTempMin}{targetTempMax}°C.  
Temperature is set to {initialTempSet}°C. 
Once the temperature is in a given range, the setting is changed to {finalTempSet}°C.`,
      other: `Actual temp
setting: ..... °C`,
    },
    {
      operation_type: "vac_dist.",
      content: `Vacuum distillation:
Solvent is distilled out from reactor.
Tap water for condenser is turned ON.
Heating is set {targetTempMin}{targetTempMax}°C.
Stirring is set {rpmMin}{rpmMax} rpm.
Membrane pump is connected via cold trap and turned ON.
Vacuum is gradually decreased in range {vpumpTorrMin}{vpumpTorrMax} torr.
Distillation is continued until <conditions>.`,
      other: `Actual temp
setting: ..... °C
Actual stirring
setting: ..... rpm
Actual vacuum
setting: ..... Torr`,
    },
    {
      operation_type: "material_unload",
      content: `<Solution/suspension> from reactor is pumped using peristaltic pump {p_pump} and norprene hose "{hose}".
One end of the hose is connected to the bottom valve of reactor {reactor}.
Second end passed through the peristaltic pump and into <to where?>.`,
      other: ``,
    },
  ];
}

// Filter D Operations
async function GetDFilterOperationsMOCK() {
  await simulateDelay(500);
  return [
    {
      operation_type: "prepare_filter",
      content: `Filter preparation:
    The filter {d_filter} is assembled and prepared to work. 
    The filtration cloth is prepared and properly installed. 
    Argon and product lines are connected to the lid, pressure test is done.`,
      other: ``,
    },
    {
      operation_type: "load_on_filter",
      content: `Product is loaded from reactor {reactor} on the filter {d_filter} via product line. 
    The Argon line is closed during loading. 
    Once 2/3 of the filter is loaded, stop pumping and close the product line.`,
      other: ``,
    },
    {
      operation_type: "filtration_with_argon",
      content: `Filtration:
    Check that the product line is closed, and check the pressure on Argon cylinder, it must be in the range 0.5-1bar. 
    Open the argon line on the lid of the filter {d_filter} and wait until no more or very little of ML is coming into the receiver (visually on the level tube). 
    At the end of operation close the argon line.`,
      other: ``,
    },
    {
      operation_type: "discharg_ML",
      content: `Emptying the receiver:
    Check that the product line and argon line are closed. 
    Release the top valve on the receiver to make sure there is no extra pressure. 
    Connect peristaltic pump {p_pump} to the bottom valve of the filter {d_filter} using norprene hose "{hose}". 
    The second end of the hose is securely fixed into the receiving container canister, set the speed of the peristaltic pump {ppumpSetMin} {ppumpSetMax} %. 
    Start the pump. Continue the process until all ML is unloaded into the receiver.`,
      other: ``,
    },
    {
      operation_type: "wash_FK",
      content: `Washing filter cake:
    The lid of filter {d_filter} is opened. 
    The required amount of {material} is weighed on the balances {balances} using a jug "{jug}". 
    The solvent is loaded on top of the filter cake, using shovel "{shovel}" the filter cake is thoroughly mixed. 
    The lid is closed.
    
    Specified amount: ….. kg (….. - ….. kg)`,
      other: `Warehouse code:
    ...........
    Actual loading:
    ....... kg`,
    },
    {
      operation_type: "dry_on_filter",
      content: `Drying on filter:
    The filter cake is additionally dried on the filter {d_filter} using argon flow. 
    Argon is set to {flowMin}{flowMax} l/min, check that the outlet valve is opened and the stream is led to the ventilation. 
    Argon line is opened. 
    Drying on the filter is continued for {durationMin}{durationMax} min. 
    After the required time is passed, the argon line is closed.`,
      other: `Actual flow
    setting: .... l/min`,
    },
    {
      operation_type: "unload_from_filter",
      content: `The lid of the filter {d_filter} is opened. 
    Material from the filter is unloaded using shovel "{shovel}" <to where>.
    
    Specified amount: ….. kg (….. - ….. kg)`,
      other: `Warehouse code:
    ...........
    Actual loading:
    ....... kg`,
    },
  ];
}

// Filter N Operations
async function GetNFilterOperationsMOCK() {
  await simulateDelay(500);
  return [
    {
      operation_type: "prepare_filter",
      content: `Filter preparation:
  The filter {n_filter} is assembled and prepared to work. 
  The filtration cloth is prepared and properly installed. 
  Membrane pump {m_pump} is connected.`,
      other: ``,
    },
    {
      operation_type: "load_on_filter",
      content: `Membrane pump {m_pump} is started. 
  The product is loaded on the filter {n_filter} using jug "{jug}". 
  Once 2/3 of the filter is loaded, stop loading.`,
      other: ``,
    },
    {
      operation_type: "discharg_ML",
      content: `Emptying the receiver:
  Stop the pump. 
  Connect peristaltic pump {p_pump} to the bottom valve of the filter using norprene hose "{hose}". 
  The second end of the hose is securely fixed into the receiving container canister, set the speed of the peristaltic pump {p_pump} %. 
  Start the pump. 
  Continue the process until all ML is unloaded into the respective receiver.`,
      other: ``,
    },
    {
      operation_type: "wash_FK",
      content: `Washing filter cake:
  Make sure the pump is stopped. 
  The required amount of material is weighed on the balances {balances} using a jug "{jug}". 
  Solvent {material} is loaded on top of filter cake, using shovel "{shovel}" the filter cake is thoroughly mixed.
  
  Specified amount: ….. kg (….. - ….. kg)`,
      other: `Warehouse code:
  ...........
  Actual loading:
  ....... kg`,
    },
    {
      operation_type: "dry_on_filter",
      content: `Drying on filter:
  The filter cake is additionally dried on the filter by keeping the membrane pump sucking air through it. 
  Membrane pump {m_pump} is set to range {vpumpTorrMin}{vpumpTorrMax} Torr. 
  Drying on the filter is continued for {durationMin}{durationMax}  min. 
  After the required time is passed, the pump is stopped.`,
      other: `Actual plump
  setting: ..... Torr`,
    },
    {
      operation_type: "unload_from_filter",
      content: `The lid of the filter {n_filter} is opened. 
  Material from the filter is unloaded using shovel "{shovel}" <to where>.
  
  Specified amount: ….. kg (….. - ….. kg)`,
      other: `Warehouse code:
  ...........
  Actual loading:
  ....... kg`,
    },
  ];
}

// Pump Operations
async function GetPPumpOperationsMOCK() {
  await simulateDelay(500);
  return [
    {
      operation_type: "pump_ON",
      content: `Peristaltic pump {p_pump} is set to {ppumpSetMin} {ppumpSetMax}%.
  Pump is turned ON.`,
      other: ``,
    },
    // Other pump operations...
  ];
}

// Oven Operations
async function GetConvOvenOperationsMOCK() {
  await simulateDelay(500);
  return [
    {
      operation_type: "material_load_on_trays",
      content: `Using shovel "{shovel}" product is loaded on trays.
  Each tray is weighed on balances {balances}, data is recorded into Table <number>.
  Tray is placed into drying oven.
  After all product is loaded on trays and placed into oven, the oven is clodes.
  Heating is set {targetTempMin}{targetTempMax}°C.
  Timer is set to {durationMin}{durationMax} .
  The dryining starts.`,
      other: ``,
    },
    {
      operation_type: "material_unload_from_trays",
      content: `Oven is truned OFF.
  Oven is opened.
  Each tray is taken from the oven and weighed on the balances {balances}.
  Mass is recorded into BR table <number>.
  Using shovel "{shovel}" product is unloaded from each tray into PE bag.`,
      other: ``,
    },
  ];
}

/**
 * Simulates retrieving a list of parameters for operations with a delay.
 *
 * @returns {Promise<Array>} A promise that resolves with the simulated list of parameters for operations.
 */
async function GetParametersForOperationsMOCK() {
  await simulateDelay(500); // Simulating a delay of 500ms
  // Simulated list of parameters for operations
  const parameters = [
    { id: 1, parameter: "durationMin" },
    { id: 2, parameter: "durationMax" },
    { id: 3, parameter: "targetTempMin" },
    { id: 4, parameter: "targetTempMax" },
    { id: 5, parameter: "initialTempSet" },
    { id: 6, parameter: "finalTempSet" },
    { id: 7, parameter: "processTemp" },
    { id: 8, parameter: "rpmMin" },
    { id: 9, parameter: "rpmMax" },
    { id: 10, parameter: "flowMin" },
    { id: 11, parameter: "flowMax" },
    { id: 12, parameter: "ppumpSetMin" },
    { id: 13, parameter: "ppumpSetMax" },
    { id: 14, parameter: "vpumpTorrProcess" },
    { id: 15, parameter: "vpumpTorrMin" },
    { id: 16, parameter: "vpumpTorrMax" },
  ];
  return parameters;
}

async function GetUtensilsMOCK() {
  await simulatesimulateDelay(500);
  return ["hose", "jug", "funnel", "shovel"];
}
