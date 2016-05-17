$(document).ready(function(){

  function convertDate(num) {
    var stringDate = num.toString();
    var daily = stringDate + '000';
    var numDate = parseInt(daily);

    var weatherDate = moment(numDate).format("MM/DD/YYYY");

    return weatherDate;
  }

  function convertHour(num) {
    var stringDate = num.toString();
    var hourly = stringDate + '000';
    var numHour = parseInt(hourly);

    var weatherDate = moment(numHour).format('hh:mm a');

    return weatherDate;
  }

  $('#submit-btn').on('click', function() {
    event.preventDefault();

    $('#weather-info').empty();

    $.get('/weather/' + $('#address').val())
      .done( (data) => {
        var weatherData = data.hourly.data;
        var currentWeather = data.currently;

        $('#weather-info').append('<div class="card">   <h3>Hourly Weather</h3>');

        var labels = [];
        var precip  = [];

        weatherData.forEach(el => {
          var date = convertDate(el.time);
          var time = convertHour(el.time);

          if(date === moment().format("MM/DD/YYYY")) {

          $('.card').append(
            '<div class="forecast"><p>'
            + date +
            '</p> <p>'
            + time +
            '</p> <p>'
            + Math.round(el.temperature) + '&deg;' +
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
        }
          labels.push(date);
          precip.push(el.precipProbability);

        })

          $('#weather-chart').append('<canvas id="myChart" width="400" height="400"></canvas>')

          var ctx = $('#myChart');
          var d =  {
            type: 'line',
            data: {
              labels: [],
              datasets: [{
                label: 'Precipitation Probability',
                data: []
              }]
            },
            options: {
              scales: {
                yAxes: [{
                  ticks: {
                      beginAtZero:true
                    }
                  }]
                }
              }
            }

            labels.forEach( el => {
              d.data.labels.push(el)
            })

            precip.forEach( el => {
              d.data.datasets[0].data.push(el)
            })

            var myChart = new Chart(ctx, d);

              var currentDate = convertDate(currentWeather.time);

              if(currentDate === moment().format("MM/DD/YYYY")) {

              $('#weather-current').append(
                '<div class="current"><h5>Today</h5>  <p>'
                + $('#address').val() +
                '</p> <p>'
                + currentDate +
                '</p> <p>'
                + Math.round(currentWeather.temperature) + '&deg;' +
                '</p> <p> Humidity: '
                + currentWeather.humidity +
                '</p> <p> Wind Speed: '
                + currentWeather.windSpeed +
                '</p> <p> Cloud Cover: '
                + currentWeather.cloudCover  +
                '</p> <p> Summary: '
                + currentWeather.summary +
                '</p> ' +
                '<button class="save-info">Save</button></div>'
              );

              var searchData = {
                latitude: data.latitude,
                longitude: data.longitude
              };

              $('.save-info').on('click', function() {
                $.post('/searches', searchData)
                  .done((data) => {
                    console.log(data)
                  })
              });
            }
          })
        })
      })

// const data = {
// latitude: 28.5383355,
// longitude: -81.3792365,
// timezone: "America/New_York",
// offset: -4,
// currently: {
// time: 1463497619,
// summary: "Mostly Cloudy",
// icon: "partly-cloudy-day",
// nearestStormDistance: 31,
// nearestStormBearing: 50,
// precipIntensity: 0,
// precipProbability: 0,
// temperature: 82.3,
// apparentTemperature: 89.3,
// dewPoint: 75.18,
// humidity: 0.79,
// windSpeed: 6.27,
// windBearing: 142,
// visibility: 9.9,
// cloudCover: 0.67,
// pressure: 1019.05,
// ozone: 297.65
// },
// minutely: {},
// hourly: {
// summary: "Heavy rain until tomorrow morning.",
// icon: "rain",
// data: [
// {
// time: 1463497200,
// summary: "Light Rain",
// icon: "rain",
// precipIntensity: 0.0233,
// precipProbability: 0.66,
// precipType: "rain",
// temperature: 82.01,
// apparentTemperature: 88.82,
// dewPoint: 75.22,
// humidity: 0.8,
// windSpeed: 6.07,
// windBearing: 141,
// visibility: 9.9,
// cloudCover: 0.65,
// pressure: 1019.06,
// ozone: 297.8
// },
// {
// time: 1463500800,
// summary: "Light Rain",
// icon: "rain",
// precipIntensity: 0.011,
// precipProbability: 0.62,
// precipType: "rain",
// temperature: 84.47,
// apparentTemperature: 92.52,
// dewPoint: 74.78,
// humidity: 0.73,
// windSpeed: 7.88,
// windBearing: 149,
// visibility: 9.87,
// cloudCover: 0.85,
// pressure: 1018.97,
// ozone: 296.48
// },
// {
// time: 1463504400,
// summary: "Rain",
// icon: "rain",
// precipIntensity: 0.0613,
// precipProbability: 0.71,
// precipType: "rain",
// temperature: 84.75,
// apparentTemperature: 91.94,
// dewPoint: 73.63,
// humidity: 0.69,
// windSpeed: 7.34,
// windBearing: 152,
// visibility: 9.97,
// cloudCover: 0.93,
// pressure: 1018.8,
// ozone: 294.75
// },
// {
// time: 1463508000,
// summary: "Rain",
// icon: "rain",
// precipIntensity: 0.07,
// precipProbability: 0.72,
// precipType: "rain",
// temperature: 84.31,
// apparentTemperature: 91.5,
// dewPoint: 73.86,
// humidity: 0.71,
// windSpeed: 6.55,
// windBearing: 159,
// visibility: 9.16,
// cloudCover: 0.96,
// pressure: 1018.55,
// ozone: 293.22
// },
// {
// time: 1463511600,
// summary: "Rain",
// icon: "rain",
// precipIntensity: 0.1359,
// precipProbability: 0.78,
// precipType: "rain",
// temperature: 82.7,
// apparentTemperature: 88.88,
// dewPoint: 73.62,
// humidity: 0.74,
// windSpeed: 6.75,
// windBearing: 165,
// visibility: 6.77,
// cloudCover: 0.98,
// pressure: 1018.18,
// ozone: 292.04
// },
// {
// time: 1463515200,
// summary: "Rain",
// icon: "rain",
// precipIntensity: 0.1216,
// precipProbability: 0.77,
// precipType: "rain",
// temperature: 79.24,
// apparentTemperature: 79.24,
// dewPoint: 73.35,
// humidity: 0.82,
// windSpeed: 5.79,
// windBearing: 177,
// visibility: 4.86,
// cloudCover: 1,
// pressure: 1017.72,
// ozone: 291.06
// },
// {
// time: 1463518800,
// summary: "Rain",
// icon: "rain",
// precipIntensity: 0.1211,
// precipProbability: 0.77,
// precipType: "rain",
// temperature: 77.1,
// apparentTemperature: 77.1,
// dewPoint: 72.97,
// humidity: 0.87,
// windSpeed: 4.96,
// windBearing: 198,
// visibility: 3.28,
// cloudCover: 1,
// pressure: 1017.34,
// ozone: 290.41
// },
// {
// time: 1463522400,
// summary: "Heavy Rain",
// icon: "rain",
// precipIntensity: 0.2471,
// precipProbability: 0.82,
// precipType: "rain",
// temperature: 75.98,
// apparentTemperature: 75.98,
// dewPoint: 73.01,
// humidity: 0.91,
// windSpeed: 5.4,
// windBearing: 184,
// visibility: 3.7,
// cloudCover: 0.98,
// pressure: 1017.11,
// ozone: 290.12
// },
// {
// time: 1463526000,
// summary: "Rain",
// icon: "rain",
// precipIntensity: 0.1231,
// precipProbability: 0.77,
// precipType: "rain",
// temperature: 74.93,
// apparentTemperature: 74.93,
// dewPoint: 72.77,
// humidity: 0.93,
// windSpeed: 4.84,
// windBearing: 182,
// visibility: 6.19,
// cloudCover: 0.95,
// pressure: 1017.06,
// ozone: 290.15
// },
// {
// time: 1463529600,
// summary: "Light Rain",
// icon: "rain",
// precipIntensity: 0.0412,
// precipProbability: 0.66,
// precipType: "rain",
// temperature: 74.46,
// apparentTemperature: 74.46,
// dewPoint: 72.3,
// humidity: 0.93,
// windSpeed: 4,
// windBearing: 173,
// visibility: 8.64,
// cloudCover: 0.93,
// pressure: 1017.1,
// ozone: 290.54
// },
// {
// time: 1463533200,
// summary: "Light Rain",
// icon: "rain",
// precipIntensity: 0.0239,
// precipProbability: 0.6,
// precipType: "rain",
// temperature: 73.79,
// apparentTemperature: 73.79,
// dewPoint: 71.77,
// humidity: 0.93,
// windSpeed: 3.48,
// windBearing: 163,
// visibility: 8.8,
// cloudCover: 0.92,
// pressure: 1017.26,
// ozone: 291.26
// },
// {
// time: 1463536800,
// summary: "Light Rain",
// icon: "rain",
// precipIntensity: 0.013,
// precipProbability: 0.53,
// precipType: "rain",
// temperature: 72.85,
// apparentTemperature: 72.85,
// dewPoint: 71.1,
// humidity: 0.94,
// windSpeed: 4.47,
// windBearing: 152,
// visibility: 8.69,
// cloudCover: 0.92,
// pressure: 1017.49,
// ozone: 292.33
// },
// {
// time: 1463540400,
// summary: "Drizzle",
// icon: "rain",
// precipIntensity: 0.0053,
// precipProbability: 0.23,
// precipType: "rain",
// temperature: 72.1,
// apparentTemperature: 72.1,
// dewPoint: 70.48,
// humidity: 0.95,
// windSpeed: 4.8,
// windBearing: 150,
// visibility: 8.6,
// cloudCover: 0.92,
// pressure: 1017.55,
// ozone: 293.82
// },
// {
// time: 1463544000,
// summary: "Mostly Cloudy",
// icon: "partly-cloudy-night",
// precipIntensity: 0.0021,
// precipProbability: 0.06,
// precipType: "rain",
// temperature: 72.09,
// apparentTemperature: 72.09,
// dewPoint: 70.55,
// humidity: 0.95,
// windSpeed: 5.47,
// windBearing: 150,
// visibility: 8.42,
// cloudCover: 0.91,
// pressure: 1017.3,
// ozone: 296.24
// },
// {
// time: 1463547600,
// summary: "Mostly Cloudy",
// icon: "partly-cloudy-night",
// precipIntensity: 0.0032,
// precipProbability: 0.11,
// precipType: "rain",
// temperature: 72.32,
// apparentTemperature: 72.32,
// dewPoint: 71.05,
// humidity: 0.96,
// windSpeed: 5.11,
// windBearing: 157,
// visibility: 8.6,
// cloudCover: 0.9,
// pressure: 1016.88,
// ozone: 299.08
// },
// {
// time: 1463551200,
// summary: "Light Rain",
// icon: "rain",
// precipIntensity: 0.0119,
// precipProbability: 0.52,
// precipType: "rain",
// temperature: 72.56,
// apparentTemperature: 72.56,
// dewPoint: 71.36,
// humidity: 0.96,
// windSpeed: 5.66,
// windBearing: 166,
// visibility: 8.64,
// cloudCover: 0.9,
// pressure: 1016.47,
// ozone: 300.82
// },
// {
// time: 1463554800,
// summary: "Light Rain",
// icon: "rain",
// precipIntensity: 0.0115,
// precipProbability: 0.52,
// precipType: "rain",
// temperature: 72.32,
// apparentTemperature: 72.32,
// dewPoint: 71.24,
// humidity: 0.96,
// windSpeed: 5.51,
// windBearing: 173,
// visibility: 8.69,
// cloudCover: 0.81,
// pressure: 1016.08,
// ozone: 300.42
// },
// {
// time: 1463558400,
// summary: "Light Rain",
// icon: "rain",
// precipIntensity: 0.0093,
// precipProbability: 0.49,
// precipType: "rain",
// temperature: 71.55,
// apparentTemperature: 71.55,
// dewPoint: 70.61,
// humidity: 0.97,
// windSpeed: 5.6,
// windBearing: 182,
// visibility: 9.21,
// cloudCover: 0.9,
// pressure: 1015.72,
// ozone: 298.93
// },
// {
// time: 1463562000,
// summary: "Drizzle",
// icon: "rain",
// precipIntensity: 0.0072,
// precipProbability: 0.35,
// precipType: "rain",
// temperature: 70.8,
// apparentTemperature: 70.8,
// dewPoint: 69.93,
// humidity: 0.97,
// windSpeed: 5.37,
// windBearing: 188,
// visibility: 9.57,
// cloudCover: 0.88,
// pressure: 1015.58,
// ozone: 297.9
// },
// {
// time: 1463565600,
// summary: "Drizzle",
// icon: "rain",
// precipIntensity: 0.0052,
// precipProbability: 0.23,
// precipType: "rain",
// temperature: 70.52,
// apparentTemperature: 70.52,
// dewPoint: 69.67,
// humidity: 0.97,
// windSpeed: 5.03,
// windBearing: 189,
// visibility: 9.78,
// cloudCover: 0.83,
// pressure: 1015.76,
// ozone: 298.03
// },
// {
// time: 1463569200,
// summary: "Mostly Cloudy",
// icon: "partly-cloudy-day",
// precipIntensity: 0.0039,
// precipProbability: 0.15,
// precipType: "rain",
// temperature: 71.14,
// apparentTemperature: 71.14,
// dewPoint: 70.23,
// humidity: 0.97,
// windSpeed: 4.89,
// windBearing: 193,
// visibility: 9.9,
// cloudCover: 0.8,
// pressure: 1016.2,
// ozone: 298.63
// },
// {
// time: 1463572800,
// summary: "Mostly Cloudy",
// icon: "partly-cloudy-day",
// precipIntensity: 0.0044,
// precipProbability: 0.18,
// precipType: "rain",
// temperature: 72.98,
// apparentTemperature: 72.98,
// dewPoint: 71.29,
// humidity: 0.94,
// windSpeed: 5.38,
// windBearing: 204,
// visibility: 10,
// cloudCover: 0.78,
// pressure: 1016.6,
// ozone: 299.19
// },
// {
// time: 1463576400,
// summary: "Light Rain",
// icon: "rain",
// precipIntensity: 0.0101,
// precipProbability: 0.5,
// precipType: "rain",
// temperature: 76.05,
// apparentTemperature: 76.05,
// dewPoint: 72.27,
// humidity: 0.88,
// windSpeed: 6.98,
// windBearing: 209,
// visibility: 9.94,
// cloudCover: 0.69,
// pressure: 1016.96,
// ozone: 299.56
// },
// {
// time: 1463580000,
// summary: "Light Rain",
// icon: "rain",
// precipIntensity: 0.0178,
// precipProbability: 0.57,
// precipType: "rain",
// temperature: 78.72,
// apparentTemperature: 78.72,
// dewPoint: 72.35,
// humidity: 0.81,
// windSpeed: 8.25,
// windBearing: 219,
// visibility: 9.87,
// cloudCover: 0.66,
// pressure: 1017.3,
// ozone: 299.89
// },
// {
// time: 1463583600,
// summary: "Light Rain",
// icon: "rain",
// precipIntensity: 0.0225,
// precipProbability: 0.6,
// precipType: "rain",
// temperature: 81.87,
// apparentTemperature: 87.86,
// dewPoint: 74.09,
// humidity: 0.77,
// windSpeed: 9.28,
// windBearing: 221,
// visibility: 9.7,
// cloudCover: 0.65,
// pressure: 1017.44,
// ozone: 300.13
// },
// {
// time: 1463587200,
// summary: "Light Rain",
// icon: "rain",
// precipIntensity: 0.0202,
// precipProbability: 0.58,
// precipType: "rain",
// temperature: 83.34,
// apparentTemperature: 90.51,
// dewPoint: 74.47,
// humidity: 0.75,
// windSpeed: 9.26,
// windBearing: 222,
// visibility: 9.66,
// cloudCover: 0.7,
// pressure: 1017.25,
// ozone: 300.21
// },
// {
// time: 1463590800,
// summary: "Light Rain",
// icon: "rain",
// precipIntensity: 0.015,
// precipProbability: 0.55,
// precipType: "rain",
// temperature: 84.35,
// apparentTemperature: 92.31,
// dewPoint: 74.74,
// humidity: 0.73,
// windSpeed: 8.91,
// windBearing: 223,
// visibility: 9.73,
// cloudCover: 0.77,
// pressure: 1016.82,
// ozone: 300.19
// },
// {
// time: 1463594400,
// summary: "Light Rain",
// icon: "rain",
// precipIntensity: 0.0147,
// precipProbability: 0.55,
// precipType: "rain",
// temperature: 85.28,
// apparentTemperature: 93.93,
// dewPoint: 74.98,
// humidity: 0.71,
// windSpeed: 8.55,
// windBearing: 225,
// visibility: 9.83,
// cloudCover: 0.83,
// pressure: 1016.33,
// ozone: 300.2
// },
// {
// time: 1463598000,
// summary: "Light Rain",
// icon: "rain",
// precipIntensity: 0.0259,
// precipProbability: 0.61,
// precipType: "rain",
// temperature: 86.12,
// apparentTemperature: 95.06,
// dewPoint: 74.86,
// humidity: 0.69,
// windSpeed: 8.63,
// windBearing: 226,
// visibility: 9.9,
// cloudCover: 0.85,
// pressure: 1015.86,
// ozone: 300.18
// },
// {
// time: 1463601600,
// summary: "Light Rain",
// icon: "rain",
// precipIntensity: 0.0419,
// precipProbability: 0.67,
// precipType: "rain",
// temperature: 87.07,
// apparentTemperature: 96.39,
// dewPoint: 74.84,
// humidity: 0.67,
// windSpeed: 8.85,
// windBearing: 230,
// visibility: 9.96,
// cloudCover: 0.87,
// pressure: 1015.3,
// ozone: 300.2
// },
// {
// time: 1463605200,
// summary: "Light Rain",
// icon: "rain",
// precipIntensity: 0.0506,
// precipProbability: 0.69,
// precipType: "rain",
// temperature: 87.87,
// apparentTemperature: 98.26,
// dewPoint: 75.5,
// humidity: 0.67,
// windSpeed: 8.97,
// windBearing: 232,
// visibility: 10,
// cloudCover: 0.85,
// pressure: 1014.91,
// ozone: 300.58
// },
// {
// time: 1463608800,
// summary: "Light Rain",
// icon: "rain",
// precipIntensity: 0.0451,
// precipProbability: 0.67,
// precipType: "rain",
// temperature: 86.6,
// apparentTemperature: 96.11,
// dewPoint: 75.21,
// humidity: 0.69,
// windSpeed: 8.19,
// windBearing: 233,
// visibility: 10,
// cloudCover: 0.82,
// pressure: 1014.88,
// ozone: 301.77
// },
// {
// time: 1463612400,
// summary: "Light Rain",
// icon: "rain",
// precipIntensity: 0.0323,
// precipProbability: 0.64,
// precipType: "rain",
// temperature: 84.5,
// apparentTemperature: 92.5,
// dewPoint: 74.69,
// humidity: 0.73,
// windSpeed: 7.01,
// windBearing: 235,
// visibility: 10,
// cloudCover: 0.78,
// pressure: 1015.13,
// ozone: 303.33
// },
// {
// time: 1463616000,
// summary: "Light Rain",
// icon: "rain",
// precipIntensity: 0.0212,
// precipProbability: 0.59,
// precipType: "rain",
// temperature: 82.46,
// apparentTemperature: 88.89,
// dewPoint: 74.19,
// humidity: 0.76,
// windSpeed: 5.95,
// windBearing: 237,
// visibility: 10,
// cloudCover: 0.68,
// pressure: 1015.43,
// ozone: 304.28
// },
// {
// time: 1463619600,
// summary: "Light Rain",
// icon: "rain",
// precipIntensity: 0.0147,
// precipProbability: 0.55,
// precipType: "rain",
// temperature: 80.38,
// apparentTemperature: 85.02,
// dewPoint: 73.56,
// humidity: 0.8,
// windSpeed: 5.25,
// windBearing: 239,
// visibility: 10,
// cloudCover: 0.5,
// pressure: 1015.77,
// ozone: 304.15
// },
// {
// time: 1463623200,
// summary: "Light Rain",
// icon: "rain",
// precipIntensity: 0.0098,
// precipProbability: 0.5,
// precipType: "rain",
// temperature: 78.36,
// apparentTemperature: 78.36,
// dewPoint: 72.98,
// humidity: 0.84,
// windSpeed: 4.69,
// windBearing: 241,
// visibility: 10,
// cloudCover: 0.26,
// pressure: 1016.16,
// ozone: 303.41
// },
// {
// time: 1463626800,
// summary: "Drizzle",
// icon: "rain",
// precipIntensity: 0.0061,
// precipProbability: 0.28,
// precipType: "rain",
// temperature: 76.73,
// apparentTemperature: 76.73,
// dewPoint: 72.5,
// humidity: 0.87,
// windSpeed: 4.19,
// windBearing: 245,
// visibility: 10,
// cloudCover: 0.1,
// pressure: 1016.39,
// ozone: 302.4
// },
// {
// time: 1463630400,
// summary: "Clear",
// icon: "clear-night",
// precipIntensity: 0.004,
// precipProbability: 0.16,
// precipType: "rain",
// temperature: 75.55,
// apparentTemperature: 75.55,
// dewPoint: 72.13,
// humidity: 0.89,
// windSpeed: 3.88,
// windBearing: 248,
// visibility: 10,
// cloudCover: 0.06,
// pressure: 1016.3,
// ozone: 300.95
// },
// {
// time: 1463634000,
// summary: "Clear",
// icon: "clear-night",
// precipIntensity: 0.0033,
// precipProbability: 0.12,
// precipType: "rain",
// temperature: 74.39,
// apparentTemperature: 74.39,
// dewPoint: 71.55,
// humidity: 0.91,
// windSpeed: 3.75,
// windBearing: 249,
// visibility: 10,
// cloudCover: 0.08,
// pressure: 1016.04,
// ozone: 299.22
// },
// {
// time: 1463637600,
// summary: "Clear",
// icon: "clear-night",
// precipIntensity: 0.0027,
// precipProbability: 0.09,
// precipType: "rain",
// temperature: 73.39,
// apparentTemperature: 73.39,
// dewPoint: 71.02,
// humidity: 0.92,
// windSpeed: 3.81,
// windBearing: 250,
// visibility: 9.95,
// cloudCover: 0.12,
// pressure: 1015.79,
// ozone: 298.05
// },
// {
// time: 1463641200,
// summary: "Clear",
// icon: "clear-night",
// precipIntensity: 0.0016,
// precipProbability: 0.04,
// precipType: "rain",
// temperature: 72.57,
// apparentTemperature: 72.57,
// dewPoint: 70.62,
// humidity: 0.94,
// windSpeed: 4.03,
// windBearing: 252,
// visibility: 7.23,
// cloudCover: 0.2,
// pressure: 1015.63,
// ozone: 297.87
// },
// {
// time: 1463644800,
// summary: "Partly Cloudy",
// icon: "partly-cloudy-night",
// precipIntensity: 0,
// precipProbability: 0,
// temperature: 71.63,
// apparentTemperature: 71.63,
// dewPoint: 70.01,
// humidity: 0.95,
// windSpeed: 3.98,
// windBearing: 252,
// visibility: 3.62,
// cloudCover: 0.28,
// pressure: 1015.48,
// ozone: 298.25
// },
// {
// time: 1463648400,
// summary: "Foggy",
// icon: "fog",
// precipIntensity: 0,
// precipProbability: 0,
// temperature: 70.9,
// apparentTemperature: 70.9,
// dewPoint: 69.41,
// humidity: 0.95,
// windSpeed: 3.8,
// windBearing: 254,
// visibility: 1.83,
// cloudCover: 0.35,
// pressure: 1015.46,
// ozone: 298.74
// },
// {
// time: 1463652000,
// summary: "Partly Cloudy",
// icon: "partly-cloudy-night",
// precipIntensity: 0,
// precipProbability: 0,
// temperature: 71.57,
// apparentTemperature: 71.57,
// dewPoint: 70.06,
// humidity: 0.95,
// windSpeed: 3.33,
// windBearing: 259,
// visibility: 3.65,
// cloudCover: 0.42,
// pressure: 1015.66,
// ozone: 299.42
// },
// {
// time: 1463655600,
// summary: "Partly Cloudy",
// icon: "partly-cloudy-day",
// precipIntensity: 0,
// precipProbability: 0,
// temperature: 72.63,
// apparentTemperature: 72.63,
// dewPoint: 70.91,
// humidity: 0.94,
// windSpeed: 2.77,
// windBearing: 267,
// visibility: 7.28,
// cloudCover: 0.5,
// pressure: 1016,
// ozone: 300.21
// },
// {
// time: 1463659200,
// summary: "Partly Cloudy",
// icon: "partly-cloudy-day",
// precipIntensity: 0,
// precipProbability: 0,
// temperature: 73.89,
// apparentTemperature: 73.89,
// dewPoint: 71.43,
// humidity: 0.92,
// windSpeed: 2.48,
// windBearing: 277,
// visibility: 10,
// cloudCover: 0.55,
// pressure: 1016.35,
// ozone: 300.52
// },
// {
// time: 1463662800,
// summary: "Partly Cloudy",
// icon: "partly-cloudy-day",
// precipIntensity: 0,
// precipProbability: 0,
// temperature: 75.75,
// apparentTemperature: 75.75,
// dewPoint: 71.65,
// humidity: 0.87,
// windSpeed: 2.62,
// windBearing: 280,
// visibility: 10,
// cloudCover: 0.56,
// pressure: 1016.76,
// ozone: 299.87
// },
// {
// time: 1463666400,
// summary: "Partly Cloudy",
// icon: "partly-cloudy-day",
// precipIntensity: 0,
// precipProbability: 0,
// temperature: 79.03,
// apparentTemperature: 79.03,
// dewPoint: 72.55,
// humidity: 0.81,
// windSpeed: 3.02,
// windBearing: 277,
// visibility: 10,
// cloudCover: 0.54,
// pressure: 1017.12,
// ozone: 298.73
// },
// {
// time: 1463670000,
// summary: "Partly Cloudy",
// icon: "partly-cloudy-day",
// precipIntensity: 0,
// precipProbability: 0,
// temperature: 82.19,
// apparentTemperature: 87.79,
// dewPoint: 73.15,
// humidity: 0.74,
// windSpeed: 2.9,
// windBearing: 277,
// visibility: 10,
// cloudCover: 0.49,
// pressure: 1017.27,
// ozone: 297.91
// }
// ]
// },
// daily: {
// summary: "Light rain today through Sunday, with temperatures peaking at 92°F on Thursday.",
// icon: "rain",
// data: [
// {
// time: 1463457600,
// summary: "Heavy rain throughout the day.",
// icon: "rain",
// sunriseTime: 1463481292,
// sunsetTime: 1463530308,
// moonPhase: 0.37,
// precipIntensity: 0.0435,
// precipIntensityMax: 0.2471,
// precipIntensityMaxTime: 1463522400,
// precipProbability: 0.82,
// precipType: "rain",
// temperatureMin: 72.1,
// temperatureMinTime: 1463540400,
// temperatureMax: 84.75,
// temperatureMaxTime: 1463504400,
// apparentTemperatureMin: 72.1,
// apparentTemperatureMinTime: 1463540400,
// apparentTemperatureMax: 91.94,
// apparentTemperatureMaxTime: 1463504400,
// dewPoint: 72.87,
// humidity: 0.87,
// windSpeed: 4.65,
// windBearing: 142,
// visibility: 8.56,
// cloudCover: 0.65,
// pressure: 1018.22,
// ozone: 295.43
// },
// {
// time: 1463544000,
// summary: "Light rain throughout the day.",
// icon: "rain",
// sunriseTime: 1463567662,
// sunsetTime: 1463616744,
// moonPhase: 0.4,
// precipIntensity: 0.0169,
// precipIntensityMax: 0.0506,
// precipIntensityMaxTime: 1463605200,
// precipProbability: 0.69,
// precipType: "rain",
// temperatureMin: 70.52,
// temperatureMinTime: 1463565600,
// temperatureMax: 87.87,
// temperatureMaxTime: 1463605200,
// apparentTemperatureMin: 70.52,
// apparentTemperatureMinTime: 1463565600,
// apparentTemperatureMax: 98.26,
// apparentTemperatureMaxTime: 1463605200,
// dewPoint: 72.8,
// humidity: 0.83,
// windSpeed: 6.06,
// windBearing: 214,
// visibility: 9.64,
// cloudCover: 0.74,
// pressure: 1016.19,
// ozone: 300.4
// },
// {
// time: 1463630400,
// summary: "Drizzle in the evening.",
// icon: "rain",
// sunriseTime: 1463654033,
// sunsetTime: 1463703180,
// moonPhase: 0.43,
// precipIntensity: 0.0021,
// precipIntensityMax: 0.0062,
// precipIntensityMaxTime: 1463698800,
// precipProbability: 0.29,
// precipType: "rain",
// temperatureMin: 70.9,
// temperatureMinTime: 1463648400,
// temperatureMax: 92.34,
// temperatureMaxTime: 1463684400,
// apparentTemperatureMin: 70.9,
// apparentTemperatureMinTime: 1463648400,
// apparentTemperatureMax: 102.71,
// apparentTemperatureMaxTime: 1463684400,
// dewPoint: 72.31,
// humidity: 0.79,
// windSpeed: 1.25,
// windBearing: 297,
// visibility: 8.95,
// cloudCover: 0.32,
// pressure: 1016.2,
// ozone: 298.3
// },
// {
// time: 1463716800,
// summary: "Rain starting in the afternoon.",
// icon: "rain",
// sunriseTime: 1463740405,
// sunsetTime: 1463789616,
// moonPhase: 0.46,
// precipIntensity: 0.0109,
// precipIntensityMax: 0.0545,
// precipIntensityMaxTime: 1463788800,
// precipProbability: 0.69,
// precipType: "rain",
// temperatureMin: 72.89,
// temperatureMinTime: 1463738400,
// temperatureMax: 91.44,
// temperatureMaxTime: 1463767200,
// apparentTemperatureMin: 72.89,
// apparentTemperatureMinTime: 1463738400,
// apparentTemperatureMax: 100.89,
// apparentTemperatureMaxTime: 1463767200,
// dewPoint: 73.15,
// humidity: 0.79,
// windSpeed: 5.18,
// windBearing: 110,
// visibility: 8.36,
// cloudCover: 0.54,
// pressure: 1017.99,
// ozone: 299.06
// },
// {
// time: 1463803200,
// summary: "Rain throughout the day.",
// icon: "rain",
// sunriseTime: 1463826779,
// sunsetTime: 1463876052,
// moonPhase: 0.48,
// precipIntensity: 0.0253,
// precipIntensityMax: 0.0955,
// precipIntensityMaxTime: 1463864400,
// precipProbability: 0.75,
// precipType: "rain",
// temperatureMin: 74.85,
// temperatureMinTime: 1463821200,
// temperatureMax: 92.31,
// temperatureMaxTime: 1463853600,
// apparentTemperatureMin: 74.85,
// apparentTemperatureMinTime: 1463821200,
// apparentTemperatureMax: 104.86,
// apparentTemperatureMaxTime: 1463853600,
// dewPoint: 73.83,
// humidity: 0.81,
// windSpeed: 6.1,
// windBearing: 218,
// cloudCover: 0.68,
// pressure: 1016.61,
// ozone: 299.83
// },
// {
// time: 1463889600,
// summary: "Light rain in the afternoon.",
// icon: "rain",
// sunriseTime: 1463913154,
// sunsetTime: 1463962487,
// moonPhase: 0.53,
// precipIntensity: 0.0024,
// precipIntensityMax: 0.0104,
// precipIntensityMaxTime: 1463940000,
// precipProbability: 0.5,
// precipType: "rain",
// temperatureMin: 71.21,
// temperatureMinTime: 1463907600,
// temperatureMax: 89.49,
// temperatureMaxTime: 1463950800,
// apparentTemperatureMin: 71.21,
// apparentTemperatureMinTime: 1463907600,
// apparentTemperatureMax: 96.7,
// apparentTemperatureMaxTime: 1463950800,
// dewPoint: 70.05,
// humidity: 0.74,
// windSpeed: 9.51,
// windBearing: 256,
// cloudCover: 0.14,
// pressure: 1012.73,
// ozone: 321.34
// },
// {
// time: 1463976000,
// summary: "Partly cloudy starting in the afternoon, continuing until evening.",
// icon: "partly-cloudy-day",
// sunriseTime: 1463999530,
// sunsetTime: 1464048922,
// moonPhase: 0.56,
// precipIntensity: 0.0006,
// precipIntensityMax: 0.0017,
// precipIntensityMaxTime: 1464048000,
// precipProbability: 0.04,
// precipType: "rain",
// temperatureMin: 68.36,
// temperatureMinTime: 1463997600,
// temperatureMax: 84.5,
// temperatureMaxTime: 1464030000,
// apparentTemperatureMin: 68.36,
// apparentTemperatureMinTime: 1463997600,
// apparentTemperatureMax: 85.25,
// apparentTemperatureMaxTime: 1464030000,
// dewPoint: 63.17,
// humidity: 0.67,
// windSpeed: 6.86,
// windBearing: 19,
// cloudCover: 0.13,
// pressure: 1013.37,
// ozone: 329.58
// },
// {
// time: 1464062400,
// summary: "Clear throughout the day.",
// icon: "clear-day",
// sunriseTime: 1464085907,
// sunsetTime: 1464135356,
// moonPhase: 0.59,
// precipIntensity: 0.0007,
// precipIntensityMax: 0.0013,
// precipIntensityMaxTime: 1464123600,
// precipProbability: 0.03,
// precipType: "rain",
// temperatureMin: 64.78,
// temperatureMinTime: 1464080400,
// temperatureMax: 86.08,
// temperatureMaxTime: 1464120000,
// apparentTemperatureMin: 64.78,
// apparentTemperatureMinTime: 1464080400,
// apparentTemperatureMax: 85.99,
// apparentTemperatureMaxTime: 1464120000,
// dewPoint: 61.43,
// humidity: 0.64,
// windSpeed: 3.54,
// windBearing: 70,
// cloudCover: 0,
// pressure: 1017.45,
// ozone: 314.62
// }
// ]
// },
//
// };
