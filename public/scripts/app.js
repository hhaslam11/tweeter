
/**
 * @param {number} timestamp timestamp (in miliseconds)
 * @returns The amount of days (rounded down) since the given timestamp
 */
const getDaysSince = timestamp => {
  const currentDate = new Date();
  const daysSinceTimestamp = currentDate.getTime() - Number(timestamp);
  return Math.floor(daysSinceTimestamp / (24 * 3600 * 1000));
};

/* eslint-disable no-undef */

/**
 * Creates new DOM object for displaying a tweet with the given information
 * @param {object} data tweet object that has information (should be sent from server)
 */
const createNewTweet = data => {
  const tweet = $('<article>').addClass('tweet');

  //build header
  const icon   = $('<span>').addClass('icon').html(`<img class="align-left" src="${data.user.avatars}">`);
  const name   = $('<span>').addClass('name').text(data.user.name);
  const handle = $('<span>').addClass('handle').text(data.user.handle);
  const header = $('<header>').append([icon, name, handle]);

  const content = $('<p>').text(data.content.text);
  const hr = $('<hr>');

  const buttons = $('<span>').html(`
    <i class="fas fa-retweet"></i>
    <i class="fas fa-heart"></i>
    <i class="fas fa-flag"></i>
  `);
  buttons.addClass('align-right');
  const footer = $('<footer>').text(getDaysSince(data.created_at) + ' days ago').append(buttons);

  tweet.append([header, content, hr, footer]);
  return tweet;
};

/**
 * Renders tweets to the page in reverse-chronological order
 * @param {array} arr array of tweets to render
 */
const renderTweets = arr => {
  $('#tweets-container article').remove();
  arr.reverse().forEach(element => {
    $('#tweets-container').append(createNewTweet(element));
  });
};

/**
 * Sends get request to server to grab tweets, then sends it to the renderTweets() function
 */
const loadTweets = () => {
  $.ajax('/tweets', {
    method: 'GET'
  })
    .then(response => {
      renderTweets(response);
    });
};

/**
 * Button in header that toggles the new-tweet section
 */
$('.new-tweet-btn').on('click', () => {
  $('.new-tweet').slideToggle(300);
  $('textarea').focus();
});

/**
 * Validates user input, and sends tweet to server if all looks good
 */
$('#sendTweet').on('submit', function(event) {
  event.preventDefault();

  const inputValue = $('.new-tweet textarea').val();
  $('#error-no-text').css({'display': 'none'});
  $('#error-char-limit').css({'display': 'none'});

  if (inputValue.length > 140) {
    $('#error-char-limit').css({'display': 'inline'});
    return;
  }

  if (inputValue.length === 0) {
    $('#error-no-text').css({'display': 'inline'});
    return;
  }
  
  $.ajax('/tweets', {
    method: 'POST',
    data: $(this).serialize()
  })
    .then((response) => {
      $('.new-tweet textarea').val('');
      updateCounter();
      loadTweets();
    });
});

$('.scroll-to-top').on('click', () => {
  $("html").animate({ scrollTop: 0 }, "slow");
});

/**
 * check if page is scrolled past a certain point and displays scroll-to-top button
 */
$(document).on('scroll', function() {
  if ($(this).scrollTop() >= 1000) {
    $('.scroll-to-top').fadeIn(300);
  } else {
    $('.scroll-to-top').fadeOut(300);
  }
});

updateCounter();
loadTweets();