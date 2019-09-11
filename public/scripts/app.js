const getDaysSince = timestamp => {
  const currentDate = new Date();
  const daysSinceTimestamp = currentDate.getTime() - Number(timestamp);
  return Math.floor(daysSinceTimestamp / (24 * 3600 * 1000));
};

/* eslint-disable no-undef */
const createNewTweet = data => {
  const tweet = $("<article>").addClass("tweet");
  $(tweet).append(`
    <header>
      <span class="icon">
        <img src="${data.user.avatars}">
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
  arr.forEach(element => {
    $('#tweets-container').append(createNewTweet(element));
  });
};

//Driver code underneath here ========================== :)
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

renderTweets(data);