const express = require("express")
const Movie = require("../models/movie")

const getAllMovies = async (params = {}) => {
  return await Movie.find(params)
}

exports.getAllMovies = getAllMovies
