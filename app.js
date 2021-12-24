// home: 1 = side one only. 2 = both sides. 3 = chilled rail

var times = [
  {name: 'Regular Onions', id: 'reg_onion', time: '4h', home: '1'},
  {name: 'Slivered Onions', id: 'sliv_onion', time: '2h', home: '1'},
  {name: 'Shredded Lettuce', id: 'shred', time: '2h', home: '1'},
  {name: 'Cheese', id: 'cheese', time: '2h', home: '1'},
//  {name: 'Check Towels', id: 'towels', time: '2h', home: '1'},
  {name: 'Regular Onions 2', id: 'reg_onion2', time: '4h', home: '3'},
  {name: 'Slivered Onions 2', id: 'sliv_onion2', time: '2h', home: '3'},
  {name: 'Shredded Lettuce 2', id: 'shred2', time: '2h', home: '3'},
  {name: 'Cheese 2', id: 'cheese2', time: '2h', home: '3'},
//  {name: 'Sanitize Utensils', id: 'utensils', time: '4h', home: '3'},
//  {name: 'Leaf', id: 'leaf', time: '2h', home: '2'},
//  {name: 'Cheddar Jack', id: 'ched_jack', time: '2h', home: '2'},
//  {name: 'Tortilla Chips', id: 'tchips', time: '12h', home: '2'},
  {name: 'Crinkle Pickles', id: 'crPickle', time: '4h', home: '6'},
  {name: 'Sliced Tomatoes', id: 'sliced_tom', time: '4h', home: '6'},
  {name: 'McGriddle 1', id: 'mcgriddle1', time: '3h', home: '4'},
  {name: 'McGriddle 2', id: 'mcgriddle2', time: '3h', home: '4'},
  {name: 'Biscuit Butter', id: 'biscuit_butter', time: '4h', home: '4'},
  {name: 'Butter Warmer', id: 'muffin_butter', time: '4h', home: '5'},
  {name: 'Bacon Strips 1', id: 'bacon1', time: '4h', home: '5'},
  {name: 'Bacon Strips 2', id: 'bacon2', time: '4h', home: '5'},
  {name: 'Bacon Strips 3', id: 'bacon3', time: '4h', home: '5'}
]

function startTimer(name, id, time, home){
// create the div used to start the timer
  function appendTimer(row) {
    $(row).append('\
      <div class="col-xs-2">\
        <h4>' + name  + '</h4>\
        <button class="timer btn btn-success btn-lg" id="' + id + '"></button>\
      </div>\
    ');
  }


// check where it belongs, put it in the right row
  appendTimer("#row" + home)

  id = $("#" + id);
  id.timer({
    countdown: true,
    format: '%H:%M',
    duration: time,
    callback: function() {
      $(id).removeClass('btn-warning');
      $(id).addClass('btn-danger');
      $('#alertSound').trigger('play');
  }
  });
}

function createTimers(){
  $.each(times, function(key, val){
    startTimer(val.name, val.id, val.time, val.home)
  }); 
}

$(document).ready(function() {
  createTimers(); 
// reset the timer states on click
  $('.timer').click(function(event){
    var timerID = event.target.id;
    $(this).timer('reset');
    $(this).removeClass('btn-danger btn-warning').addClass('btn-success')
  });
// pretty up the buttons
  $('#row6').children('.col-xs-2').each(function(){
    $(this).addClass('rail');
    });
  $('.rail:first').addClass('lrail');
  $('.rail:last').addClass('rrail');
  $('#towels').parent().addClass('other');
  $('#utensils').parent().addClass('other');

  function warningTimers(){
      $('.timer').each(function(){ 
      timeLeft = $(this).data('seconds');
      if(timeLeft < 1800){
        $(this).removeClass('btn-success').addClass('btn-warning');
      };
      });

    }; 
  

// watch for a product to get below thirty minutes, and change colors if so.
  setInterval(function(){
    warningTimers()
  }, 300);

  setInterval(function(){
    currentDate = new Date();
    if (currentDate.getHours() > 11 && $('#row4').length > 0) {
      $('#row4').remove();      
    }
  }, 300);

  setInterval(function(){
    currentDate = new Date();
    if (currentDate.getHours() > 4 && currentDate.getHours() < 11 && $('#row4').length < 1) {
      $('#row4').remove();      
    }
  }, 300);
});

//test
