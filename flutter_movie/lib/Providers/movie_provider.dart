import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter_movie/Common/constants.dart';
import 'package:flutter_movie/Models/movie.dart';
import 'package:flutter_movie/Repositories/movie_repository.dart';
import 'package:flutter_movie/Services/api_service.dart';

class MovieProvider extends ChangeNotifier {
  List<Movie> movies = [];
  Movie? movieToEdit;
  int pagesNumber = 0;

  final MovieRepository _movieRepository = MovieRepository();

  getMovies(int page, String? searchValue, SortTypes? sortType,
      GetTypes getTypes) async {
    Map<String, dynamic> returnedData =
        await _movieRepository.getMoviesList(page, searchValue, sortType);
    List<Movie> pageMovies = returnedData["movies list"];
    pagesNumber = returnedData["pages number"];
    if (getTypes == GetTypes.PAGING) {
      movies = movies + pageMovies;
    } else if (getTypes == GetTypes.FILTER) {
      movies = pageMovies;
    }
    notifyListeners();
  }

  addMovie(Movie movie) async {
    Movie savedMovie = await _movieRepository.addMovie(movie);
    movies.add(savedMovie);
    notifyListeners();
  }

  editMovie(Movie movie) async {
    Movie editedMovie = await _movieRepository.editMovie(movie);
    movies[movies.indexOf(movie)] = editedMovie;
    notifyListeners();
  }

  deleteMovie(Movie movie) async {
    await _movieRepository.deleteMovie(movie);
    movies.remove(movie);
    notifyListeners();
  }
}
