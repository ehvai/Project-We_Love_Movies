const router = require("express").Router();
const controller = require("./movies.controller");
const theaterController = require("../theaters/theaters.controller");
const reviewsController = require("../reviews/reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.use("/:movieId/theaters", theaterController.list);
//router.use("/:movieId/reviews", reviewsController.list);

router.route("/:movieId")
.get(controller.read)
.all(methodNotAllowed)

router.route("/")
.get(controller.list)
.all(methodNotAllowed)



module.exports = router;