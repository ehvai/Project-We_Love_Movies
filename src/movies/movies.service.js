const knex = require("../db/connection");

// lists all of the movies
function list(){
    return knex("movies")
    .select("*")
}

// lists all movies which have is_showing as true
function showingList(is_showing){
    return knex("movies as m")
    .distinct()
    .join("movies_theaters as mt", "m.movie_id","mt.movie_id")
    .select("m.movie_id as id","m.title","m.runtime_in_minutes","m.rating","m.description","m.image_url")
    .where({ "mt.is_showing": true })
}

function read(movie_id){
    return knex("movies as m")
    .select("m.*")
    .where({movie_id})
    .first();
}

module.exports = {
    list,
    showingList,
    read,
}