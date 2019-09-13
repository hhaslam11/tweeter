/* eslint-disable no-undef */


const updateCounter = () => {
  const length = $('.new-tweet textarea').val().length;
  const charsLeft = 140 - length;
  $('.counter').text(charsLeft);
};

$('.new-tweet textarea').on('input', function() {
  const length = $(this).val().length;
  const charsLeft = 140 - length;

  $('.counter').text(charsLeft);

  if (charsLeft < 0) {
    $(this).css({'borderBottomColor' : '#f53d3d'});
    $('.counter').css({'color' : '#f53d3d'});
    
  } else {
    $(this).css({'borderBottomColor': ''});
    $('.counter').css({'color': ''});
  }
});