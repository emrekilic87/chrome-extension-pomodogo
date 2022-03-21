const doc = document;
const wrapper = doc.getElementById("wrapper");
const result = doc.getElementById("result");
const timer = doc.getElementById("timer");
const button = doc.getElementById("btn");
const resetBtn = doc.getElementById("resetBtn");
const minutes = timer.querySelector('.minutes');
const seconds = timer.querySelector('.seconds');
let timeinterval;
let template;
wrapper.style.width = "320px";
wrapper.style.margin = "0 auto";

const api = () => {
  fetch("https://random.dog/woof.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const link = data.url;
      if (link.indexOf("mp4") > -1 || link.indexOf("gif") > -1 || link.indexOf("webm") > -1){
        api();
      } else {
        template = `
          <img width="320" src="${link}">
        `;
      }
      result.innerHTML = template;
    })
    .catch(function (err) {
      console.warn("Something went wrong.", err);
    });
};

const getTimeRemaining = (endtime) => {
  const total = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  
  return {
    total,
    minutes,
    seconds
  };
}

const initializeTimer = (endtime) => {
  const updateTimer = () => {
    const time = getTimeRemaining(endtime);

    minutes.innerHTML = ('0' + time.minutes).slice(-2);
    seconds.innerHTML = ('0' + time.seconds).slice(-2);

    if (time.total <= 0) {
      reset();
    }
  }

  updateTimer();
  timeinterval = setInterval(updateTimer, 1000);
}

const reset = () => {
  clearInterval(timeinterval);
  button.disabled = false;
  result.innerHTML = "";
}

button.addEventListener("click",function(){
  const totalTime = new Date(Date.parse(new Date()) + 25 * 60 * 1000);
  initializeTimer(totalTime);
  button.disabled = true;
  api();
},false);

resetBtn.addEventListener("click",function(){
  reset();
  minutes.innerHTML = "25";
  seconds.innerHTML = "00";
  button.disabled = false;
},false);