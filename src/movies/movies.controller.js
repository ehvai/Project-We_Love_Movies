const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function movieExists(req, res, next){
    const movie = await service.read(req.params.movieId)
    if(movie){
        res.locals.movie = movie;
        return next();
    } else {
        next({ status: 404, message: "Movie cannot be found."})
    }
}

async function list(req, res, next){
    const {is_showing} = req.query;
    if(is_showing === 'true'){
        res.json({ data: await service.showingList(is_showing)})
    }

    res.json({ data: await service.list() });
}

function read(req, res, next){
    res.json({ data: res.locals.movie })
}

// movies/:movieId/theaters
async function movieIdTheater(req,res,next){
    const movie_id = req.params.movieId
    res.json({ data: await service.readTheater(movie_id)})
}

// movies/:movieId/reviews
async function movieIdReviews(req,res,next){
    const movie_id = req.params.movieId
    const reviewList = await service.readReviews(movie_id)
    res.json({ data: reviewList })
}

module.exports = {
    list: [asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(movieExists), read],
    movieIdTheater: [asyncErrorBoundary(movieExists), asyncErrorBoundary(movieIdTheater)],
    movieIdReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(movieIdReviews)]
}