var express = require('express');
const mysqlConnection = require('../lib/db');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// get posts
router.get('/api/post', async (req, res, next) => {
  let connection = await mysqlConnection()
  try {
    const query =
      "select post_id, user_name, user_email, content, posted_at from posts";
    // SQL実行
    const [result] = await connection.execute(query);
    const posts = result.map(post => ({
      postId: post.post_id,
      userName: post.user_name,
      userEmail: post.user_email,
      content: post.content,
      postedAt: post.posted_at
    }))
    res.status(200).json({posts: posts})
  } catch (error) {
      console.error('/api/post Error:', error);
      res.status(500).json({message: "server error"})
  } finally {
    if(connection) connection.destroy()
  }
})

// create post
router.post('/api/post', async (req, res, next) => {
  const {userName, userEmail, content} = req.body
  if (!userName || !userEmail || !content) {
    res.status(400).json({message: "データが不足しています"})
    return
  }

  let connection = await mysqlConnection()

  try {
    const query =
      "insert into posts (user_name, user_email, content) values (?, ?, ?)";
    // SQL実行
    await connection.execute(query, [userName, userEmail, content]);
    res.status(200).json({message: "success"})
  } catch (error) {
      console.error('/api/post Error:', error);
      res.status(500).json({message: "server error"})
  } finally {
    if(connection) connection.destroy()
  }
  
})

module.exports = router;
