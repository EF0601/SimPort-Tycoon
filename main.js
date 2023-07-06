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

     taxiIncome: 0,
     busIncome: 0,
};

//day counter
function dayMover1(){
     if(day != 30){
          day++;
     }
     else if(day >= 30){
          day = 1;
          //running costs
          money = money - (assets.taxis * 70);
          money = money - (assets.advancedTaxis * 145);

          money = money - (assets.buses * 115);
          money = money - (assets.advancedBuses * 235);

          cost = 0;
          gains = 0;

          month++;

          

     }
     money = Math.floor(money);
     document.querySelector('.day').textContent = day;
     document.querySelector('.month').textContent = month;

     document.querySelector('.money').textContent = money;

     document.querySelector('.runCost').textContent = monthRunCost();
     document.querySelector('.income').textContent = monthlyGains();

     payLoan();

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
};
let unlockBoxes = {
     advancedTaxi: document.querySelector('.advancedTaxiResearch'),
     bus: document.querySelector('.basicBusResearch'),
     advancedBus: document.querySelector('.advancedBusResearch'),
};
function unlock(thing){
     switch (thing) {
          case "advTaxi":
               if (unlocked.advancedTaxi != true && unlocked.taxi == true) {
                if (month >= 2 && money >= 200) {
                    money = money - 200;
                     addToNewsWaitlist("SimPort, LLC just unlocked Advanced Taxis! Onlookers look forward to higher income.");
                    unlocked.advancedTaxi = true;
                    unlockBoxes.advancedTaxi.style.display = "none";
                }
               }
               break;
               case "bus":
               if (unlocked.bus != true) {
                if (month >= 4 && money >= 400) {
                    money = money - 400;
                     addToNewsWaitlist("SimPort, LLC just unlocked Buses! Onlookers look forward to higher income.");
                    unlocked.bus = true;
                    unlockBoxes.bus.style.display = "none";
                }
               }
               break;
               case "advBus":
               if (unlocked.advancedBus != true && unlocked.bus == true) {
                if (month >= 6 && money >= 600) {
                    money = money - 600;
                     addToNewsWaitlist("SimPort, LLC just unlocked Advanced Buses! Onlookers look forward to higher income.");
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
     let oldMoney = money;
     for(var i = 0; i < assets.taxis; i++){
          money = money + (4 * Math.floor(Math.random() * (assets.taxiPaxCapacity + assets.taxiPopularity + 1)));
     }
     for(var v = 0; v < assets.advancedTaxis; v++){
          money = money + (7 * Math.floor(Math.random() * (assets.advancedTaxiPaxCapacity + assets.taxiPopularity + 1)));
     }
     assets.taxiIncome = money - oldMoney;
}

function bus(){
     let oldMoney = money;
     for(var i = 0; i < assets.buses; i++){
          money = money + (3 * Math.floor(Math.random() * (assets.busPaxCapacity + assets.busPopularity + 1)));
     }
     for(var v = 0; v < assets.advancedBuses; v++){
          money = money + (6 * Math.floor(Math.random() * (assets.advancedBusPaxCapacity + assets.busPopularity + 1)));
     }
     assets.busIncome = money - oldMoney;
}

//update amounts
function updateAmount(){
     document.querySelector('.basicTaxiAmount').textContent = assets.taxis;
     document.querySelector('.advancedTaxiAmount').textContent = assets.advancedTaxis;

     document.querySelector('.basicBusAmount').textContent = assets.buses;
     document.querySelector('.advancedBusAmount').textContent = assets.advancedBuses;
}

//news
let newsWaitlist = [];
setInterval(() => {
     if (newsWaitlist.length !== 0) {
          document.querySelector('.news').textContent = newsWaitlist[0];
          newsWaitlist.shift();
          newsAlert();
     }
}, 4000);

function addToNewsWaitlist(newsItem) {
     newsWaitlist.push(newsItem);
}

function newsAlert() {
     document.querySelector('.newsAlert').style.color = "yellow";
     setTimeout(() => {
          document.querySelector('.newsAlert').style.color = "rgb(200, 200, 200)";
     }, 2000);
}

//Cost calculator
let cost = 0;
function monthRunCost() {
     cost = 0;

     cost = cost - (assets.taxis * 70);
     cost = cost - (assets.advancedTaxis * 145);
     cost = cost - (assets.buses * 115);
     cost = cost - (assets.advancedBuses * 235);

     return cost;
}

let gains = 0;
function monthlyGains(){
     gains = gains + assets.taxiIncome + assets.busIncome;
     
     return gains;
}

//loans
let loans = {
     setLoanBtn: document.querySelector('.setLoanBtn'),
     returnLoanBtn: document.querySelector('.returnLoanBtn'),
     input: document.querySelector('.loanAmount'),
     validity: document.querySelector('.validity'),

     dailyCost: 0,
     loan: 0,
     leftToPay: 0,
}

function verifyLoan(){
     if(loans.input.value < 30 || loans.input.value > 100000){
          loans.validity.textContent = "Your loan value is too high or too low."
     }
     else{
          
          loans.loan = Math.floor(loans.input.value * 1.12);
          money = money + loans.loan / 1.12;
          loans.dailyCost = Math.floor(loans.loan/30);

          loans.leftToPay = loans.loan;

          document.querySelector('.dayPayment').textContent = loans.dailyCost;
          document.querySelector('.loanTotal').textContent = loans.leftToPay;

          loans.input.disabled = true;
          loans.setLoanBtn.disabled = true;
          loans.returnLoanBtn.disabled = false;
     }
}

function payLoan(){
     if(loans.leftToPay > 0){
          if(loans.leftToPay - loans.dailyCost >= 0){
               loans.leftToPay = loans.leftToPay - loans.dailyCost;
               money = money - loans.dailyCost;
               document.querySelector('.LeftToPay').textContent = loans.leftToPay;
          }
          else{
               money = money - loans.leftToPay;
               loans.leftToPay = 0;
          }
     }
}

function payLoanNow(){
     money = money - loans.leftToPay;
     loans.loan = 0;
     loans.leftToPay = 0;

     loans.input.disabled = false;
     loans.setLoanBtn.disabled = false;
     loans.returnLoanBtn.disabled = true;
}

//on start
updateUnlockValidity();
setTimeout(dayMover1, 2000);
