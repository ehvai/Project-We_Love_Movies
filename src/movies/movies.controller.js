const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

// validation
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

async function read(req, res, next){
    res.json({ data: res.locals.movie })
}

module.exports = {
    list: [asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(movieExists), read]
}