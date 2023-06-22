let day = 1;
let month = 1;

let money = 500;

let speed = 2000;

//assets values
let assets = {
     taxis: 0, //sets amount of taxis to make money
     advancedTaxis: 0,
     taxiPaxCapacity: 4, //amount of max passengers, limiting income
     advancedTaxiPaxCapacity: 8,

     buses: 0,
     advancedBuses: 0,
     busPaxCapacity: 20,
     advancedBusPaxCapacity: 45,

     //popularity, limiting passenger amount
     taxiPopularity: -2,
     busPopularity: -4,
}

//day counter
function dayMover1(){
     if(day != 30){
          day++;
     }
     else if(day >= 30){
          day = 1;
          month++;
     }
     document.querySelector('.day').textContent = day;
     document.querySelector('.month').textContent = month;
     
     document.querySelector('.money').textContent = money;
     
     taxi();
     bus();
     updateUnlockValidity();
     setTimeout(dayMover2, speed/2);
}
function dayMover2(){
     setTimeout(dayMover1, speed/2);
}

//speed setting
function setSpeed(target){
     speed = target;
}

//unlocking
let unlocked = {
     taxi: true,
     advancedTaxi: false,
     bus: false,
     advancedBus: false,
}
let unlockBoxes = {
     advancedTaxi: document.querySelector('.advancedTaxiResearch'),
     bus: document.querySelector('.basicBusResearch'),
     advancedBus: document.querySelector('.advancedBusResearch'),
}
function unlock(thing){
     switch (thing) {
          case "advTaxi":
               if (unlocked.advancedTaxi != true && unlocked.taxi == true) {
                if (month >= 2 && money >= 200) {
                    money = money - 200;
                    document.querySelector('.news').textContent = "SimPort, LLC just unlocked Advanced Taxis! Onlookers look forward to higher income."
                    unlocked.advancedTaxi = true;
                    unlockBoxes.advancedTaxi.style.display = "none";
                }
               }
               break;
               case "bus":
               if (unlocked.bus != true) {
                if (month >= 4 && money >= 400) {
                    money = money - 400;
                    document.querySelector('.news').textContent = "SimPort, LLC just unlocked Buses! Onlookers look forward to higher income."
                    unlocked.bus = true;
                    unlockBoxes.bus.style.display = "none";
                }
               }
               break;
               case "advBus":
               if (unlocked.advancedBus != true && unlocked.bus == true) {
                if (month >= 6 && money >= 600) {
                    money = money - 600;
                    document.querySelector('.news').textContent = "SimPort, LLC just unlocked Advanced Buses! Onlookers look forward to higher income."
                    unlocked.advancedBus = true;
                    unlockBoxes.advancedBus.style.display = "none";
                }
               }
               break;
          default:
               break;
     }
}
//checking for requirements (unlocking)
function updateUnlockValidity() {
     if(month >= 2 && money >= 200){
          unlockBoxes.advancedTaxi.style.color = "green";
     }
     else{
          unlockBoxes.advancedTaxi.style.color = "red";
     }
     if(month >= 4 && money >= 400){
          unlockBoxes.bus.style.color = "green";
     }
     else{
          unlockBoxes.bus.style.color = "red";
     }
     if(month >= 6 && money >= 600){
          unlockBoxes.advancedBus.style.color = "green";
     }
     else{
          unlockBoxes.advancedBus.style.color = "red";
     }
}
//asset acquirement
function getAsset(asset){
     switch (asset) {
          case 'basicTaxi':
               if(money >= 120){
                    assets.taxis++;
                    money = money - 120;
               }
               
               break;
          case 'advTaxi':
               if(unlocked.advancedTaxi === true && money >= 250){
                    assets.advancedTaxis++;
                    money = money - 250;
               }
               
               break;
          case 'basicBus':
               if (unlocked.bus === true && money >= 280) {
                    assets.buses++;
                    money = money - 280;
               }
               
               break;
          case 'advBus':
               if (unlocked.advancedBus === true && money >= 580) {
                   assets.advancedBuses++;
                    money = money - 580; 
               }
               break;
          default:
               break;
     }
     document.querySelector('.money').textContent = money;
     updateAmount();
}

//income from vehicles
//taxi
function taxi(){
  for(var i = 0; i < assets.taxis; i++){
    money = money + (4 * Math.floor(Math.random() * (assets.taxiPaxCapacity + assets.taxiPopularity + 1)));
  }
  for(var v = 0; v < assets.advancedTaxis; v++){
    money = money + (7 * Math.floor(Math.random() * (assets.advancedTaxiPaxCapacity + assets.taxiPopularity + 1)));
  }
}

function bus(){
  for(var i = 0; i < assets.buses; i++){
    money = money + (3 * Math.floor(Math.random() * (assets.busPaxCapacity + assets.busPopularity + 1)));
  }
  for(var v = 0; v < assets.advancedBuses; v++){
    money = money + (6 * Math.floor(Math.random() * (assets.advancedBusPaxCapacity + assets.busPopularity + 1)));
  }
}

//update amounts
function updateAmount(){
     document.querySelector('.basicTaxiAmount').textContent = assets.taxis;
     document.querySelector('.advancedTaxiAmount').textContent = assets.advancedTaxis;

     document.querySelector('.basicBusAmount').textContent = assets.buses;
     document.querySelector('.advancedBusAmount').textContent = assets.advancedBuses;
}

//on start
updateUnlockValidity();
setTimeout(dayMover1, 2000);