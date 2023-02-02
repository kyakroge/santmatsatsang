;(function($){
  
  var btnStartTxt = '<span class="button__text button__text--download">Download <svg class="icon button__icon--cloud-download"><use xlink:href="#icon-cloud-download"></use></svg></span>';
  var btnProgressTxt = '<span class="button__text button__text--progress">0<sub>%</sub></span>';
  var btnEndTxt = '<span class="button__text button__text--complete"><svg class="icon button__icon--checkmark"><use xlink:href="#icon-checkmark"></use></svg></span>';

  var isActive = false;
  
  var stageStep = function( $el, delay, returnFunction ) {
    var delay = ( typeof delay !== 'undifined' ) ? delay : 0;
    setTimeout(function(){
      $el.addClass('is_animated');
    },10);
    if (typeof returnFunction === 'function') {
      setTimeout(function(){ 
        returnFunction();
      }, delay);
    }
  };

  var calcDownload = function(current) {
    // you can use this to add in your logic for calculating the progress of the download.
    // current == the current download percentage
    // return the current percentage of the download
    return current + (Math.floor(Math.random() * (2 - 0 + 1) + 0));
  };

  var initCounter = function($el, returnFunction) {
    var wrapper = $el.parent('div');
    var timerInterval = (1000 / 33);
    var counter = 0;
    var circle = (252 / 100);
    
    var timer = setInterval(function(){
      counter = calcDownload(counter);
      $('.button__text--progress', wrapper).html(counter+'<sub>%</sub>');
      $('.pie-loader circle', wrapper).css('stroke-dasharray', (counter * circle) + ' 252');
      if (counter === 100 || counter > 100 ) {
        clearTimeout(timer);
        $('.pie-loader', wrapper).addClass('is_hidden');
        returnFunction();
      }
    }, timerInterval);
  };


  function clickHandler() {
    if (isActive) {return;}

    isActive = true;
    var btn = $(this);

    stageStep( btn.find('.button__text--download'), 500, function(){
      btn.html(btnProgressTxt);
      btn.parent('div').addClass('is_fixed_size');
      stageStep( btn.find('.button__text--progress'), 500, function(){
        initCounter(btn, function(){
          btn.append(btnEndTxt);
          stageStep( btn.find('.button__text--complete'));
          btn.find('.button__text--progress').remove();
        });
      });
    });
  };

  function reset() {
    isActive = false;
    $('.button').html( btnStartTxt );
    $('.pie-loader').removeClass('is_hidden')
      .find('circle').removeAttr('style')
      .parents('.button-wrapper').removeClass('is_fixed_size');
  }

  $('.reset').on('click', reset);
  $('.button').on('click', clickHandler);

}(jQuery));
