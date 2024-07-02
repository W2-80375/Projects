class Movie {
  int? id;
  String? title;
  String? description;
  String? posterUrl;
  double? rating;

  Movie({
    required this.id,
    required this.title,
    required this.description,
    required this.posterUrl,
    required this.rating,
  });

  Movie.empty();

  factory Movie.fromJson(Map<String, dynamic> json) {
    return Movie(
      id: json['id'],
      title: json['title'],
      description: json['description'],
      posterUrl: json['posterUrl'],
      rating: json['rating'],
    );
  }

  Map<String, dynamic> toJson(Movie movie) {
    return {
      "id": movie.id,
      "title": movie.title,
      "description": movie.description,
      "posterUrl": movie.posterUrl,
      "rating": movie.rating,
    };
  }

  @override
  String toString() {
    return 'Movie{id: $id,'
        ' title: $title,'
        ' description: $description,'
        ' posterUrl: $posterUrl,'
        ' rating: $rating}';
  }
}
