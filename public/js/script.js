$(document).ready(function(){
  console.log('load');

  $('#submit-btn').on('click', function() {
    event.preventDefault();
    console.log('click worked');

    $.get('/weather/' + $('#address').val())
    .done((data) => {
      // data.forEach(el => {
      //   $('.forecast').append('<p>').text(el);
      //
      // })
      console.log(data);
    })

  })

})
