
const timeAgo = require('node-time-ago');

function postDetails(arrPost, arrUpvotes){

  const post = arrPost[0];

  let numUpvotes = arrUpvotes[0];
  numUpvotes = numUpvotes.count * 1;


    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <div class="news-list">
        <header><img src="/logo.png"/><a href="/">Wizard News</a></header>
          <div class='news-item'>
            <p>
              <span class="news-position">${post.id}. ▲</span>${post.title}
              <small>(by ${post.name})</small>
              <p>
              ${post.content}
              </p>
              </p>
            <small class="news-info">
              ${numUpvotes} upvotes | ${timeAgo(post.date)}
            </small>
          </div>
      </div>
    </body>
    </html>`

    return html;

}

module.exports = postDetails;