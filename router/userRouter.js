const router = require("express").Router();
const userHelper = require("../helper/userHelper");

router.post("/signup", (req, res) => {
  userHelper.addUser(req.body).then((resp) => {
    res.json(resp.message);
    //  res.status(200).json(response);
  });
});

router.get("/signin", (req, res) => {
  userHelper.checkUser(req.query).then((resp) => {
    res.json(resp);
  });
});

module.exports = router;