const express = require("express");
const morgan = require("morgan");
const postList = require('./views/postList');
const postDetails = require('./views/postDetails');
const client = require('./db/index');

const app = express();

app.use(morgan('dev'));
app.use(express.static('public'));

app.get("/", async (req, res, next) => {
  
  const text = `SELECT posts.*, counting.upvotes 
  FROM posts 
  INNER JOIN (SELECT postId, COUNT(*) as upvotes FROM upvotes GROUP BY postId) AS counting
  ON posts.id = counting.postId;`

  try {
    const data = await client.query(text);
    const posts = data.rows;
    res.send(postList(posts));
  } catch (error) {
    next(error)
  }
});

app.get("/posts/:number", async (req, res, next) => {

  const getPost = 'SELECT id, userid, title, content, date FROM posts WHERE id=$1';
  const getUpvotes = 'SELECT COUNT(postId) FROM upvotes WHERE postId=$1';
  const values = [req.params.number * 1];

  try {
    const data = await client.query(getPost, values);
    const data2 = await client.query(getUpvotes, values);
    const posts = data.rows;
    const upvotes = data2.rows;
    res.send(postDetails(posts, upvotes));
  } catch (error) {
    next(error)
  }
});


const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
