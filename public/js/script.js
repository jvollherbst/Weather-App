$(document).ready(function(){
  console.log('load');

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
