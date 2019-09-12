const getDaysSince = timestamp => {
  const currentDate = new Date();
  const daysSinceTimestamp = currentDate.getTime() - Number(timestamp);
  return Math.floor(daysSinceTimestamp / (24 * 3600 * 1000));
};

/* eslint-disable no-undef */
const createNewTweet = data => {
  const tweet = $('<article>').addClass('tweet');

  //build header
  const icon   = $('<span>').addClass('icon').html(`<img class="align-left" src="${data.user.avatars}">`);
  const name   = $('<span>').addClass('name').text(data.user.name);
  const handle = $('<span>').addClass('handle').text(data.user.handle);
  const header = $('<header>').append([icon, name, handle]);

  const content = $('<p>').text(data.content.text);
  const hr = $('<hr>');

  const footer = $('<footer>').text(getDaysSince(data.created_at) + ' days ago');

  tweet.append([header, content, hr, footer]);
  return tweet;
};

const renderTweets = arr => {
  $('#tweets-container article').remove();
  arr.reverse().forEach(element => {
    $('#tweets-container').append(createNewTweet(element));
  });
};

const loadTweets = () => {
  $.ajax('/tweets', {
    method: 'GET'
  })
    .then(response => {
      renderTweets(response);
    });
};

$('.new-tweet-btn').on('click', () => {
  $('.new-tweet').slideToggle(300);
  $('textarea').focus();
});

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
      loadTweets();
    });
});

$('.scroll-to-top').on('click', () => {
  $("html").animate({ scrollTop: 0 }, "slow");
});

$(document).on('scroll', function() {
  if ($(this).scrollTop() >= 1000) {
    $('.scroll-to-top').fadeIn(300);
  } else {
    $('.scroll-to-top').fadeOut(300);
  }
});

loadTweets();