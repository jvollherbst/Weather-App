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

  // $.get('/searches')
  //   .done( (data) => {
  //     var currentconvertDate(currentWeather.time);
  //
  //     if(currentDamoment().format("MM/DD/YYYY")) {
  //
  //       $('#weather-current').append(
  //         '<div class="current"><h5>Today<p>'
  //         + $('#address').val() +
  //         '</p> <p>'
  //         + currentDate +
  //         '</p> <p>'
  //         Math.round(currentWeather.temper+ '&deg;' +
  //         '</p> <p> Humidity: '
  //         + currentWeather.humidity +
  //         '</p> <p> Wind Speed: '
  //         + currentWeather.windSpeed +
  //         '</p> <p> Cloud Cover: '
  //         + currentWeather.cloudCover  +
  //         '</p> <p> Summary: '
  //         + currentWeather.summary +
  //         '</p> ' +
  //         '<class="save-info">Save</button></div>'
  //       );
  //     }
  //   }


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
