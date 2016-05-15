$(document).ready(function(){
  console.log('load');

  function convertDate(num) {
    var stringDate = num.toString();
    var daily = stringDate + '000';
    var numDate = parseInt(daily);

    var weatherDate = moment(numDate).format("DD-MM-YYYY");
    $('.container').append('<div>').text(weatherDate);
  }
  convertDate(1463554800);


  $('#submit-btn').on('click', function() {
    event.preventDefault();
    console.log('click worked');

    $.get('/weather/' + $('#address').val())
      .done( (data) => {
        $('.forecast').append(
          '<p>' + data.currently.humidity +  '<p>',
          '<p>' + data.currently.windSpeed +  '<p>'
        );
      console.log('data', data);
    })

  })

})
