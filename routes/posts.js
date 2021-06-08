const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
 
  });

  router.post("/", (req, res) => {
    const post = req.body.message;
    let query = `INSERT INTO posts
    (user_id, image_url,tags, post_text, total_likes,total_comments, parent_post_id)
 VALUES($1,$2,$3,$4,$5,$6,$7)`;
    const values = [1, "image", "tags", post, 5, 5, 1];

    db.query(query, values)
      .then(() => {
        res.status(200, "ok");
      })
      .catch((err) => {
        console.log("error:", err);
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
