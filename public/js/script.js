$(document).ready(function(){

  function convertDate(num) {
    var stringDate = num.toString();
    var daily = stringDate + '000';
    var numDate = parseInt(daily);

    var weatherDate = moment(numDate).format("MM/DD/YYYY");

    return weatherDate;
  }

  $('#submit-btn').on('click', function() {
    event.preventDefault();
    
    $('#weather-info').empty();

    $.get('/weather/' + $('#address').val())
      .done( (data) => {
        var weatherData = data.daily.data;
        $('#weather-info').append('<div class="card">');

        weatherData.forEach(el => {
          var time = convertDate(el.time);

          $('.card').append(
            '<div class="forecast"> <div class="sun"></div> <p>'
            + time +
            '</p> <p> Max Temperature: '
            + el.temperatureMax +
            '</p> <p> Min Temperature: '
            + el.temperatureMin +
            '</p> <p> Humidity: '
            + el.humidity +
            '</p> <p> Wind Speed: '
            + el.windSpeed +
            '</p> <p> Visibility: '
            + el.visibility +
            '</p> <p> Cloud Cover: '
            + el.cloudCover  +
            '</p> <p> Summary: '
            + el.summary +
            '</p> </div>'
          );

          if(el.cloudCover > .5){
            $('.sun').addClass('cloudy');
          }
          else if(el.cloudCover >= 0 && el.cloudCover < .29) {
            $('.sun').addClass('sunny');
            console.log(el.cloudCover);
          }
          else if(el.cloudCover > .3 && el.cloudCover < .49) {
            $('.sun').addClass('partly-cloudy');
          }

        })
      })
    })
})

// const data = {
// daily: {
// summary: "No precipitation throughout the week, with temperatures peaking at 76°F on Tuesday.",
// icon: "clear-day",
// data: [
// {
// time: 1463295600,
// summary: "Partly cloudy throughout the day.",
// icon: "partly-cloudy-day",
// sunriseTime: 1463317235,
// sunsetTime: 1463368457,
// moonPhase: 0.31,
// precipIntensity: 0,
// precipIntensityMax: 0,
// precipProbability: 0,
// temperatureMin: 54.89,
// temperatureMinTime: 1463313600,
// temperatureMax: 66.04,
// temperatureMaxTime: 1463346000,
// apparentTemperatureMin: 54.89,
// apparentTemperatureMinTime: 1463313600,
// apparentTemperatureMax: 66.04,
// apparentTemperatureMaxTime: 1463346000,
// dewPoint: 52.52,
// humidity: 0.79,
// windSpeed: 10.96,
// windBearing: 299,
// visibility: 8.04,
// cloudCover: 0.56,
// pressure: 1014.99,
// ozone: 354.48
// },
// {
// time: 1463382000,
// summary: "Partly cloudy in the morning.",
// icon: "partly-cloudy-day",
// sunriseTime: 1463403587,
// sunsetTime: 1463454910,
// moonPhase: 0.35,
// precipIntensity: 0,
// precipIntensityMax: 0,
// precipProbability: 0,
// temperatureMin: 54.3,
// temperatureMinTime: 1463400000,
// temperatureMax: 68.51,
// temperatureMaxTime: 1463432400,
// apparentTemperatureMin: 54.3,
// apparentTemperatureMinTime: 1463400000,
// apparentTemperatureMax: 68.51,
// apparentTemperatureMaxTime: 1463432400,
// dewPoint: 52.56,
// humidity: 0.78,
// windSpeed: 9.64,
// windBearing: 301,
// visibility: 9.77,
// cloudCover: 0.32,
// pressure: 1014.11,
// ozone: 351.61
// },
// {
// time: 1463468400,
// summary: "Clear throughout the day.",
// icon: "clear-day",
// sunriseTime: 1463489940,
// sunsetTime: 1463541362,
// moonPhase: 0.38,
// precipIntensity: 0,
// precipIntensityMax: 0,
// precipProbability: 0,
// temperatureMin: 55.49,
// temperatureMinTime: 1463482800,
// temperatureMax: 76.17,
// temperatureMaxTime: 1463526000,
// apparentTemperatureMin: 55.49,
// apparentTemperatureMinTime: 1463482800,
// apparentTemperatureMax: 76.17,
// apparentTemperatureMaxTime: 1463526000,
// dewPoint: 53.28,
// humidity: 0.67,
// windSpeed: 5.52,
// windBearing: 313,
// visibility: 10,
// cloudCover: 0.08,
// pressure: 1012.69,
// ozone: 335.77
// },
// {
// time: 1463554800,
// summary: "Partly cloudy in the morning.",
// icon: "partly-cloudy-day",
// sunriseTime: 1463576295,
// sunsetTime: 1463627813,
// moonPhase: 0.41,
// precipIntensity: 0,
// precipIntensityMax: 0,
// precipProbability: 0,
// temperatureMin: 56.42,
// temperatureMinTime: 1463637600,
// temperatureMax: 75.31,
// temperatureMaxTime: 1463605200,
// apparentTemperatureMin: 56.42,
// apparentTemperatureMinTime: 1463637600,
// apparentTemperatureMax: 75.31,
// apparentTemperatureMaxTime: 1463605200,
// dewPoint: 53.81,
// humidity: 0.69,
// windSpeed: 5.32,
// windBearing: 242,
// visibility: 10,
// cloudCover: 0.13,
// pressure: 1012.18,
// ozone: 332.42
// },
// {
// time: 1463641200,
// summary: "Partly cloudy throughout the day.",
// icon: "partly-cloudy-day",
// sunriseTime: 1463662651,
// sunsetTime: 1463714264,
// moonPhase: 0.44,
// precipIntensity: 0,
// precipIntensityMax: 0,
// precipProbability: 0,
// temperatureMin: 54.18,
// temperatureMinTime: 1463659200,
// temperatureMax: 62.18,
// temperatureMaxTime: 1463688000,
// apparentTemperatureMin: 54.18,
// apparentTemperatureMinTime: 1463659200,
// apparentTemperatureMax: 62.18,
// apparentTemperatureMaxTime: 1463688000,
// dewPoint: 45.9,
// humidity: 0.66,
// windSpeed: 13.94,
// windBearing: 278,
// cloudCover: 0.45,
// pressure: 1010.56,
// ozone: 341.84
// },
// {
// time: 1463727600,
// summary: "Clear throughout the day.",
// icon: "clear-day",
// sunriseTime: 1463749009,
// sunsetTime: 1463800715,
// moonPhase: 0.46,
// precipIntensity: 0,
// precipIntensityMax: 0,
// precipProbability: 0,
// temperatureMin: 52.96,
// temperatureMinTime: 1463742000,
// temperatureMax: 57.97,
// temperatureMaxTime: 1463781600,
// apparentTemperatureMin: 52.96,
// apparentTemperatureMinTime: 1463742000,
// apparentTemperatureMax: 57.97,
// apparentTemperatureMaxTime: 1463781600,
// dewPoint: 43.93,
// humidity: 0.66,
// windSpeed: 13.48,
// windBearing: 270,
// cloudCover: 0.12,
// pressure: 1011.53,
// ozone: 395.41
// },
// {
// time: 1463814000,
// summary: "Clear throughout the day.",
// icon: "clear-day",
// sunriseTime: 1463835369,
// sunsetTime: 1463887164,
// moonPhase: 0.49,
// precipIntensity: 0,
// precipIntensityMax: 0,
// precipProbability: 0,
// temperatureMin: 52.52,
// temperatureMinTime: 1463896800,
// temperatureMax: 59.43,
// temperatureMaxTime: 1463864400,
// apparentTemperatureMin: 52.52,
// apparentTemperatureMinTime: 1463896800,
// apparentTemperatureMax: 59.43,
// apparentTemperatureMaxTime: 1463864400,
// dewPoint: 45.29,
// humidity: 0.7,
// windSpeed: 8.59,
// windBearing: 256,
// cloudCover: 0,
// pressure: 1015.77,
// ozone: 392.96
// },
// {
// time: 1463900400,
// summary: "Clear throughout the day.",
// icon: "clear-day",
// sunriseTime: 1463921730,
// sunsetTime: 1463973613,
// moonPhase: 0.53,
// precipIntensity: 0.0007,
// precipIntensityMax: 0.0011,
// precipIntensityMaxTime: 1463961600,
// precipProbability: 0.02,
// precipType: "rain",
// temperatureMin: 51.92,
// temperatureMinTime: 1463914800,
// temperatureMax: 60.68,
// temperatureMaxTime: 1463947200,
// apparentTemperatureMin: 51.92,
// apparentTemperatureMinTime: 1463914800,
// apparentTemperatureMax: 60.68,
// apparentTemperatureMaxTime: 1463947200,
// dewPoint: 46.96,
// humidity: 0.73,
// windSpeed: 8.84,
// windBearing: 267,
// cloudCover: 0.02,
// pressure: 1016.29,
// ozone: 388.16
// }
// ]
// }
// };
