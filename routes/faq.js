const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("faq", { festivalDate: "JUNE 20, 2024"});
});

module.exports = router;
