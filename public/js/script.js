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

  $.get('/searches/all')
    .done( (data) => {

        $('#weather-current').append('<div class="searches"><h3>Past Searches</h3>');
        data.forEach(el => {
          $('.searches').append(
            '<p>' + el.location + '</p>'
          );
      })
    });


  $('#submit-btn').on('click', function() {
    event.preventDefault();

    $('#weather-info').empty();

    $.get('/weather/' + $('#address').val())
      .done( (data) => {
        var weatherData = data.hourly.data;
        var dailyWeather = data.daily.data;

        var labels = [];
        var precip  = [];

        $('#weather-info').append('<div class="hourly card"><h3>Hourly Weather</h3>');

        weatherData.forEach(el => {
          var date = convertDate(el.time);
          var time = convertHour(el.time);

          if(date === moment().format("MM/DD/YYYY")) {

          $('.hourly').append(
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

        });

        $('#weather-info-daily').append('<div class="daily card"> <h3>Daily Weather</h3>');

        dailyWeather.forEach(el => {
          var date = convertDate(el.time);
          var time = convertHour(el.time);

          $('.daily').append(
            '<div class="forecast"><p>'
            + date +
            '</p> <p>'
            + Math.round(el.temperatureMax) + '&deg; | ' +
            + Math.round(el.temperatureMin) + '&deg;' +
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

        });

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

              var searchData = {
                location: $('#address').val(),
                latitude: data.latitude,
                longitude: data.longitude
              };

              $.post('/searches', searchData)
               .done((data) => {})

          })
        })
      })
