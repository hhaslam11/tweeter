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