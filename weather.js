var getWeather = function(position){
	var lat = "lat=" + position.coords.latitude;
    var lon = "lon=" + position.coords.longitude;
    var tempUnit = "F";
	var d = new Date();
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var meridiem;
	var minute = d.getMinutes();
	var hour = d.getHours();
	
	meridiem = d.getHours() < 12 ? "AM" : "PM";
	minute = d.getMinutes() < 10 ? "0" + minute : minute;
	hour = d.getHours() > 12 ? hour - 12 : hour;
    
    $.getJSON("https://fcc-weather-api.glitch.me/api/current?" + lat + "&" + lon, function(json){
		if(json.weather[0].main !== "Rain") {
			if(d.getMonth() > 2 && d.getMonth() < 10) {
				if(d.getHours() > 5 && d.getHours() < 20) {
					$('body').css("background-image", "url('images/sunnysky.jpg')");
					$('.city').css("background", "linear-gradient(to bottom, rgba(86, 145, 255, .5), rgba(112, 162, 255, .5))");
					$('.temp').css("background", "linear-gradient(to bottom, rgba(112, 162, 255, .5), rgba(175, 203, 255, .5))");
					$('.info').css("background", "linear-gradient(to bottom, rgba(112, 162, 255, .5), rgba(175, 203, 255, .5))");
				} else {
					$('body').css("background-image", "url('images/nightsky.jpg')");
					$('.city').css("background", "linear-gradient(to bottom, rgba(41, 48, 102, .5), rgba(59, 65, 112, .5))");
					$('.temp').css("background", "linear-gradient(to bottom, rgba(59, 65, 112, .5), rgba(91, 96, 140, .5))");
					$('.info').css("background", "linear-gradient(to bottom, rgba(59, 65, 112, .5), rgba(91, 96, 140, .5))");
				}
			} else {
				if(d.getHours() > 5 && d.getHours() < 18) {
					$('body').css("background-image", "url('images/sunnysky.jpg')");
					$('.city').css("background", "linear-gradient(to bottom, rgba(86, 145, 255, .5), rgba(112, 162, 255, .5))");
					$('.temp').css("background", "linear-gradient(to bottom, rgba(112, 162, 255, .5), rgba(175, 203, 255, .5))");
					$('.info').css("background", "linear-gradient(to bottom, rgba(112, 162, 255, .5), rgba(175, 203, 255, .5))");
				} else {
					$('body').css("background-image", "url('images/nightsky.jpg')");
					$('.city').css("background", "linear-gradient(to bottom, rgba(41, 48, 102, .5), rgba(59, 65, 112, .5))");
					$('.temp').css("background", "linear-gradient(to bottom, rgba(59, 65, 112, .5), rgba(91, 96, 140, .5))");
					$('.info').css("background", "linear-gradient(to bottom, rgba(59, 65, 112, .5), rgba(91, 96, 140, .5))");
				}
			}
		} else {
			$('body').css("background-image", "url('images/raindrops.jpg')");
			$('.city').css("background", "linear-gradient(to bottom, rgba(117, 126, 142, .5), rgba(145, 151, 163, .5))");
			$('.temp').css("background", "linear-gradient(to bottom, rgba(145, 151, 163, .5), rgba(179, 183, 191, .5))");
			$('.info').css("background", "linear-gradient(to bottom, rgba(145, 151, 163, .5), rgba(179, 183, 191, .5))");
		}
		
      $("#city").html(json.name + ", " + json.sys.country);
	  $("#date").html(months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear() + " " + hour + ":" + minute + meridiem);
      
      $("#temp").html(Math.floor(json.main.temp * 9/5 + 32) + "°" + tempUnit + "<img src= '" + json.weather[0].icon+"' >");
      $(".temp").on("click", function(){
         if(tempUnit == "F") {
           var newTemp = Math.floor(json.main.temp);
          
          tempUnit = "C";
          $("#temp").html(newTemp + "°" + tempUnit + "<img src= '" +  "  " + json.weather[0].icon+"' >");
        } else if(tempUnit == "C") {
          json.main.temp = json.main.temp
          tempUnit = "F";
            $("#temp").html(Math.floor(json.main.temp * 9/5 + 32) + "°" + tempUnit + "<img src= '" + "  " + json.weather[0].icon+"' >");
        }
        
        $('.toggle').hide();
      }); 
     
      $('#skys').html(json.weather[0].main);
      $('#wind').html("Winds: " + json.wind.speed + "mph");
      $('#humidity').html("Humidity " + json.main.humidity + "%");
    });
};
  
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
    alert("Sorry, your browser does not support geolocation!");
}