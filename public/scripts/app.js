const getDaysSince = timestamp => {
  const currentDate = new Date();
  const daysSinceTimestamp = currentDate.getTime() - Number(timestamp);
  return Math.floor(daysSinceTimestamp / (24 * 3600 * 1000));
};

/* eslint-disable no-undef */
const createNewTweet = data => {
  const tweet = $("<article>").addClass("tweet");

  //TODO don't use template literal, its a security flaw
  $(tweet).append(`
    <header>
      <span class="icon">
        <img class="align-left" src="${data.user.avatars}">
      </span>

      <span class="name">${data.user.name}</span>

      <span class="handle">
        ${data.user.handle}
      </span>
    </header>
    <p>${data.content.text}</p>
    <hr>
    <footer>
      ${getDaysSince(data.created_at)} days ago
    </footer>
  `);
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

$('#sendTweet').on('submit', function(event) {
  event.preventDefault();

  const inputValue = $('.new-tweet textarea').val();

  if (inputValue.length > 140) {
    alert('Tweet is too long! Max 140 characters.');
    return;
  }

  if (inputValue.length === 0) {
    alert('Tweet is empty!');
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

loadTweets();