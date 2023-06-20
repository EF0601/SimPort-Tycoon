let unlocked = {
     taxi: true,
     advancedTaxi: false,
     bus: false,
     advancedBus: false,
}
let day = 1;
let month = 1;

//day counter
setInterval(() => {
     if(day != 30){
          day++;
     }
     else if(day >= 30){
          day = 1;
          month++;
     }
     document.querySelector('.day').textContent = day;
     document.querySelector('.month').textContent = month;
}, 2000);

//unlocking
