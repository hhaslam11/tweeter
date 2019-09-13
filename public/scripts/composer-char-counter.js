/* eslint-disable no-undef */

/**
 * Manually update char-counter text
 * (used when you need to force update counter but user isnt typing, on page load for example)
 */
const updateCounter = () => {
  const length = $('.new-tweet textarea').val().length;
  const charsLeft = 140 - length;
  $('.counter').text(charsLeft);
};

/**
 * Live-updates the char-counter text as user is typing
 */
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