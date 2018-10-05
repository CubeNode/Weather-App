
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
