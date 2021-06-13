const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let queryParams = req.query.filterParam;
    filterText = req["query"]["query"];
    // console.log(filterText);

    let filterQuery = `SELECT * FROM posts `;

    if (queryParams === "posts") {
      filterQuery += `WHERE post_text LIKE ('%' || $1 || '%' )
                      OR
                      redirect_code LIKE ('%' || $1 || '%')`;
    }
    if (queryParams === "tags") {
      filterQuery += `WHERE tags LIKE ('%' || $1 || '%') `;
    }
    if (!queryParams) {
      filterQuery += ` WHERE tags  LIKE ('%' || $1 || '%')
                       OR
                       redirect_code LIKE ('%' || $1 || '%')
                       OR
                       post_text  LIKE ('%' || $1 || '%')`;
    }

    values = [filterText];
    db.query(filterQuery, values)
      .then((data) => {
        // console.log(data.rows);
        res.status(200).send(data.rows);
      })
      .catch((err) => {
        console.log("error:", err);
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
