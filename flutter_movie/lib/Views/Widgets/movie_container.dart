import 'package:flutter/material.dart';
import 'package:flutter_movie/Models/movie.dart';

class MovieContainer extends StatelessWidget {
  final Movie movie;
  const MovieContainer({Key? key, required this.movie}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SizedBox(
          height: 210,
          width: 300,
          child: ClipRRect(
          child: movie.posterUrl != null && movie.posterUrl!.isNotEmpty
                ? Image.network(
                    movie.posterUrl!,
                    fit: BoxFit.cover,
                    errorBuilder: (context, error, stackTrace) {
                      print('Error loading image: $error');
                      return Center(
                        child: Text(
                          'Image not available',
                          style: TextStyle(color: Colors.red),
                        ),
                      );
                    },
                  )
                : Center(
                    child: Text(
                      'No Image',
                      style: TextStyle(color: Colors.red),
                    ),
                  ),
          ),
        ),
        const SizedBox(height: 10),
        Text(
          movie.title!,
          style: const TextStyle(
            color: Colors.black,
            fontSize: 15,
            fontWeight: FontWeight.w700,
          ),
        ),
        Text(
          movie.rating.toString() + " ⭐",
          style: const TextStyle(
            color: Colors.black,
          ),
        ),
      ],
    );
  }
}
