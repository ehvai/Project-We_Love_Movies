const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next){
    res.json({ data: await service.list()});
}

async function movieIdTheater(req,res,next){
    const response = await service.singleTheaterList(movie_id);
    const moviesTheater = json.stringify(reduceMovies(response), null, 4)
    res.json({ data: moviesTheater})
}


module.exports = {
    list: [asyncErrorBoundary(list)],
    movieIdTheater: [asyncErrorBoundary(movieIdTheater)]
}