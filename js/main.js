var currentLocation = "";
function getTanggal(){
  var arrayBulan = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "NOV", "DEC"];
  var tanggal = new Date().getDate();
  var bulanPos = new Date().getMonth();
  var bulan = arrayBulan[bulanPos];

  $('#bulan').html(bulan);
  $('#tanggal').html(tanggal);
}

function getJSON(){
  $.getJSON("http://ipinfo.io/?callback=?", function(json){
    $('#location').html(json.city + ", " + json.country);
    currentLocation = json.city + "," + json.country;
    var appid = "&appid=97924c7c2c76a45da647f8153b43eeb1";
    var baseUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
    var mode =  "&mode=json";
    var units = "&units=metric"

    $.ajax({
      url: baseUrl + currentLocation + mode + units + appid,
      type: 'GET',
      dataType: 'json',
      success: function(data){
        var iconHtml = "";
        var weatherCondition = data.weather[0].main;
        var weatherIcon = "assets/" + data.weather[0].icon + ".png";
        var humidity = data.main.humidity + "%";
        var tekanan = data.main.pressure + " hPa";
        var temp = Math.round(data.main.temp);
        var wind = data.wind.speed + " m/s";
        iconHtml += "<img class=\"img-fluid\" src=" + "\"" + weatherIcon + "\">"

        $('#celcius a').on('click', function(event) {
          event.preventDefault();
          /* Act on the event */
          $('#celcius a').css({
            color: '#014c8c'
          });
          $('#fahrenheit a').css({
            color: '#616161'
          });
          temp = Math.round(data.main.temp);
          $('#temp-value').html(temp + "&#xb0;");


        });

        $('#fahrenheit a').on('click', function(event) {
          event.preventDefault();
          /* Act on the event */
          $('#celcius a').css({
            color: '#616161'
          });
          $('#fahrenheit a').css({
            color: '#014c8c'
          });
          temp = Math.round(temp * 1.8) + 32;
          $('#temp-value').html(temp + "&#xb0;");

        });
        $('.weather-icon').html(iconHtml);
        $('#wind').html(wind);
        $('#humidity').html(humidity);
        $('#pressure').html(tekanan);
        $('#weather-condition').html(weatherCondition);
        $('#temp-value').html(temp + "&#xb0;");
      }
    })
    .done(function() {
      console.log("success");
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });

    console.log(baseUrl + currentLocation + mode + units + appid);
  });
}

$(document).ready(function(){
  getJSON();
  console.log(currentLocation);
  getTanggal();
});
