import 'dart:convert';
import 'package:flutter_movie/Common/constants.dart';
import 'package:flutter_movie/Models/movie.dart';

class MovieRepository {
  Future<Map<String, dynamic>> getMoviesList(
      int page, String? searchValue, SortTypes? sortType) async {
    List<Movie> dummyMovies = [
      Movie(
          id: 1,
          title: "Inception",
          description: "A mind-bending thriller",
          posterUrl:
              "https://c4.wallpaperflare.com/wallpaper/764/590/391/inception-leonardo-dicaprio-movie-posters-2400x3500-entertainment-movies-hd-art-wallpaper-preview.jpg",
          rating: 8.8),
      Movie(
          id: 2,
          title: "The Dark Knight",
          description: "A superhero film",
          posterUrl:
              "https://i.pinimg.com/564x/71/aa/e0/71aae046f952861bc6a9dec5f3ee0c89.jpg",
          rating: 9.0),
      Movie(
          id: 3,
          title: "Interstellar",
          description: "A space exploration film",
          posterUrl:
              "https://i.pinimg.com/564x/62/af/83/62af83f7166858dc69420d36fc928cd6.jpg",
          rating: 8.6),
      Movie(
          id: 4,
          title: "The Matrix",
          description: "A science fiction film",
          posterUrl:
              "https://i.pinimg.com/564x/e4/46/4b/e4464bdf55dc7d55d5fdd7f0e53ffec7.jpg",
          rating: 8.7),
      Movie(
          id: 5,
          title: "Fight Club",
          description: "A cult classic",
          posterUrl:
              "https://w0.peakpx.com/wallpaper/583/712/HD-wallpaper-fight-club-brad-pitt-fight-club-thumbnail.jpg",
          rating: 8.8),
    ];
 if (searchValue != null && searchValue.isNotEmpty) {
      dummyMovies = dummyMovies.where((movie) => movie.title?.toLowerCase().contains(searchValue.toLowerCase()) ?? false).toList();
    }

    if (sortType != null) {
      if (sortType == SortTypes.ASC) {
        dummyMovies.sort((a, b) => a.rating?.compareTo(b.rating ?? 0) ?? 0);
      } else if (sortType == SortTypes.DESC) {
        dummyMovies.sort((a, b) => b.rating?.compareTo(a.rating ?? 0) ?? 0);
      }
    }
    return {
      "movies list": dummyMovies,
      "pages number": 1,
    };
  }

  Future<Movie> addMovie(Movie movie) async {
    
    return movie;
  }

  Future<Movie> editMovie(Movie movie) async {
   
    return movie;
  }

  Future<void> deleteMovie(Movie movie) async {
   
  }
}
