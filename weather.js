
/***** CANVAS *****/
/*const c = document.getElementById('canvas');
const ctx = c.getContext('2d');

c.width = window.innerWidth;
c.height = window.innerHeight;

var timeOfDay;

var dayBG = ctx.createLinearGradient(0, 0, 0, 500);
dayBG.addColorStop(0, "#23aaff");
dayBG.addColorStop(1, "#6bc5ff");

var nightBG = ctx.createLinearGradient(0, 0, 0, 1200);
nightBG.addColorStop(0, "#0f0028");
nightBG.addColorStop(1, "#260066");

var rainBG = ctx.createLinearGradient(0, 0, 0, 2000);
rainBG.addColorStop(0, "#2a4672");
rainBG.addColorStop(1, "#95a8c6");

var curBG = dayBG;

ctx.fillStyle = curBG;
ctx.fillRect(0, 0, c.width, c.height);

addEventListener('resize', event => {
  c.width = innerWidth;
  c.height = innerHeight;

  init();
});

function day(x, y) {
  this.x = x;
  this.y = y;
  this.color = "#f9b743";
  this.glowAlpha = .5;
  this.glow = "rgba("+"255, 207, 34,"+ this.glowAlpha +")";
  this.glowRadius = 50;

  this.update = () => {
    this.glowRadius += .4;
    this.glowAlpha -= .02;

    if(this.glowRadius > 70){
      this.glowRadius = 50;
      this.glowAlpha = 1;
    }

    this.draw();
  }

  this.draw = () => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.glowRadius, 50, 1, Math.PI * 2, false);
    ctx.fillStyle = "rgba("+"255, 207, 34,"+ this.glowAlpha +")";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(this.x, this.y, 50, 50, 1, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

function night() {
  this.x = Math.random() * canvas.width;
  this.y =  Math.random() * canvas.height;
  this.moonColor = "#d8d6b8";
  this.starColor = "#fcfdff"
  this.glow = "#FFF";
  this.dim = Math.random() * 100 + 40;
  this.size = Math.random() * 2;

  this.update = () => {
    this.draw();
  }

  this.drawStars = () => {
    this.dim = Math.random() * 30 + 10;
    ctx.beginPath();
    ctx.shadowBlur= this.dim;
    ctx.shadowColor= this.glow;
    ctx.arc(this.x, this.y, this.size, 50, 1, Math.PI * 2, false);
    ctx.fillStyle = this.starColor;
    ctx.fill();
    ctx.closePath();
  }

  this.draw = () => {
    ctx.beginPath();
    ctx.shadowBlur= 50;
    ctx.shadowColor= this.glow;
    ctx.arc(100, 100, 50, 50, 1, Math.PI * 2, false);
    ctx.fillStyle = this.moonColor;
    ctx.fill();
    ctx.closePath();
  }
}

function rain(x, y) {
  this.x = x;
  this.y = y;
  this.velocity = 0.1;
  this.speed = Math.random() * 40 + 10;
  this.size = Math.random() * 40 + 20;

  this.update = () => {
    this.y += this.speed;
    this.x -= 10;
    if(this.y >= canvas.height) {
      this.y = -50;
      this.x = x;
      this.speed = Math.random() * 30 + 10;
    }

    this.draw();
  }

  this.draw = () => {
    ctx.beginPath();
    ctx.moveTo(this.x,this.y);
    ctx.lineTo(this.x - 20,this.y + 50);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#CCC"
    ctx.stroke();
  }
}

let sun;
let moon;
let stars;
let rainy;
let rainDrops;

function init() {

  sun = new day(100, 100);

  moon = new night();
  stars = [];
  for(let i = 0; i < 500; i++) {
    stars.push(new night());
  }

  rainDrops = [];
  for(let i = 0; i < 100; i++) {
    rainDrops.push(new rain(Math.random() * (canvas.width + 400), -30));
  }

}

function animate() {
  requestAnimationFrame(animate);

  ctx.clearRect(0, 0, c.width, c.height);
  ctx.fillStyle = curBG;
  ctx.fillRect(0, 0, c.width, c.height);

  if(timeOfDay == 1) {
    sun.update();
  } else if (timeOfDay == 2) {
    stars.forEach(night => {
      night.drawStars();
    });
    moon.update();
  } else if (timeOfDay == 3) {
    rainDrops.forEach(rain => {
      rain.update();
    })
  }

}

init();
animate();*/


var interval = setInterval(function(){
  var date = new setDate;
  date.update();
}, 1000);

function setDate() {
  this.d = new Date();
  this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  this.minute = this.d.getMinutes() < 10 ? "0" + this.d.getMinutes() : this.d.getMinutes();
  this.hour = this.d.getHours() > 12 ? this.d.getHours() - 12 : this.d.getHours() == 0 ? 12 : this.d.getHours();
  this.meridiem = this.d.getHours() < 12 ? "AM" : "PM";
  this.update = () => {
    $("#date").html(this.months[this.d.getMonth()] + " " + this.d.getDate() + ", " + this.d.getFullYear() + " " + this.hour + ":" + this.minute + this.meridiem);
  }
}

/***** GET WEATHER *****/
var getWeather = function(position) {
  var lat = "lat=" + position.coords.latitude;
  var lon = "lon=" + position.coords.longitude;
  var tempUnit = "F";
	var d = new Date();

  $.getJSON("https://fcc-weather-api.glitch.me/api/current?" + lat + "&" + lon, function(json){
    /*if(json.weather[0].main !== "Rain") {

      if(d.getMonth() > 2 && d.getMonth() < 10) {
				if(d.getHours() > 5 && d.getHours() < 20) {
          timeOfDay = 1;
          curBG = dayBG;
				} else {
          timeOfDay = 2;
          curBG = nightBG;
				}
			} else {
				if(d.getHours() > 5 && d.getHours() < 18) {
          timeOfDay = 1;
          curBG = dayBG;
				} else {
          timeOfDay = 2;
          curBG = nightBG;
				}
			}
    } else {
      timeOfDay = 3;
      curBG = rainBG;
		}*/

    /***** LOCAL WEATHER *****/
    $("#city").html(json.name + ", " + json.sys.country);

    $("#temp").html(Math.floor(json.main.temp * 9/5 + 32) + "°" + tempUnit);
    $('#max-min').html(Math.floor(json.main.temp_max * 9/5 + 32) + "°/" + Math.floor(json.main.temp_min * 9/5 + 32) + "°");
      $(".temp").on("click", function(){
         if(tempUnit == "F") {
           var newTemp = Math.floor(json.main.temp);
           var highTemp = Math.floor(json.main.temp_max);
           var lowtemp = Math.floor(json.main.temp_min);

          tempUnit = "C";
          $("#temp").html(newTemp + "°" + tempUnit);
          $('#max-min').html(highTemp + "°/" + lowtemp + "°");
        } else if(tempUnit == "C") {
          json.main.temp = json.main.temp
          tempUnit = "F";
            $("#temp").html(Math.floor(json.main.temp * 9/5 + 32) + "°" + tempUnit);
            $('#max-min').html(Math.floor(json.main.temp_max * 9/5 + 32) + "°/" + Math.floor(json.main.temp_min * 9/5 + 32) + "°");

        }

        $('.toggle').hide();
      });

      $('#skys').html(json.weather[0].main);
      $('#wind').html(json.wind.speed + "mph");
      $('#humidity').html(json.main.humidity + "%");
  });
}

var errorHandler = function(err){
	if(err.code == 1){
		$("#city").html("Location Denied");
    } else if (err.code == 2) {
      $("#city").html("Location Unavailable");
    }
};

if(navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(getWeather, errorHandler);
} else {
  alert("Sorry, your browser does not support geolocation!")
}
