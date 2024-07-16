var express = require("express");
const mysqlConnection = require("../lib/db");
const { comparePassword, hashPassword } = require("../lib/password");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// get posts
router.get("/api/post", async (req, res, next) => {
  let connection = await mysqlConnection();
  try {
    const query =
      "select p.post_id, u.user_id, u.user_name, p.content, p.posted_at from posts p join users u on p.user_id = u.user_id";
    // SQL実行
    const [result] = await connection.execute(query);
    const posts = result.map((post) => ({
      postId: post.post_id,
      userId: post.user_id,
      userName: post.user_name,
      content: post.content,
      postedAt: post.posted_at,
    }));
    res.status(200).json({ posts: posts });
  } catch (error) {
    console.error("/api/post Error:", error);
    res.status(500).json({ message: "server error" });
  } finally {
    if (connection) connection.destroy();
  }
});

// create post
router.post("/api/post", async (req, res, next) => {
  const { userId, content } = req.body;
  if (!userId || !content) {
    res.status(400).json({ message: "データが不足しています" });
    return;
  }

  let connection = await mysqlConnection();

  try {
    const query = "insert into posts (user_id, content) values (?, ?)";
    // SQL実行
    await connection.execute(query, [userId, content]);
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.error("/api/post Error:", error);
    res.status(500).json({ message: "server error" });
  } finally {
    if (connection) connection.destroy();
  }
});

router.post("/api/login", async (req, res, next) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    res.status(400).json({ message: "データが不足しています" });
    return;
  }

  let connection = await mysqlConnection();

  try {
    const query = "select user_id, user_name, user_email, password from users where user_name = ?";
    // SQL実行
    const [result] = await connection.execute(query, [userName]);
    if (result.length > 0) {
      const user = result[0];
      const passwordMatch = comparePassword(password, user.password);
      if (passwordMatch) {
        res.status(200).json({ message: "success login", userId: user.user_id, userName: userName }); // userIdとトークンを一緒に返す。
      } else {
        res.status(401).json({ message: "password is incorrect" });
      }
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    console.error("/api/login Error:", error);
    res.status(500).json({ message: "server error" });
  } finally {
    if (connection) connection.destroy();
  }
});

router.post("/api/register", async (req, res, next) => {
  const { userName, userEmail, password } = req.body;
  if (!userName || !userEmail || !password) {
    res.status(400).json({ message: "データが不足しています" });
    return;
  }

  let connection = await mysqlConnection();

  try {
    const [existUsers] = await connection.execute("select user_id, user_name, user_email, password from users where user_name = ? or user_email = ?", [userName, userEmail]);
    if (existUsers.length > 0) {
      res.status(400).json({message: "the same user name or email exists"})
      return
    }

    const query =
      'INSERT INTO users (user_name, user_email, password) VALUES (?, ?, ?)';
    const [result] = await connection.execute(query, [
      userName,
      userEmail,
      hashPassword(password),
    ]);

    const userId = result.insertId;

    res.status(201).json({
      message: "created user",
      userId: userId,
      userName: userName
    })
    
  } catch (error) {
    console.error("/api/register Error:", error);
    res.status(500).json({ message: "server error" });
  } finally {
    if (connection) connection.destroy();
  }
});

router.get("/api/users/:userId", async (req, res, next) => {
  const userId = req.params.userId

  if (!userId) {
    res.status(400).json({message: "empty param"})
    return
  }

  let connection = await mysqlConnection();
  try {
    const query =
      "select user_id, user_name, user_email from users where user_id = ?";
    // SQL実行
    const [result] = await connection.execute(query, [userId]);

    if (result.length === 0) {
      
      res.status(404).json({ message: "user not found" });
      return
    }

    const user = result[0]
    
    res.status(200).json({ user: user });
  } catch (error) {
    console.error(`/api/user/${userId} Error:`, error);
    res.status(500).json({ message: "server error" });
  } finally {
    if (connection) connection.destroy();
  }
});

module.exports = router;
