import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_movie/Models/movie.dart';
import 'package:flutter_movie/Providers/movie_provider.dart';
import 'package:flutter_movie/Views/Widgets/elev_button.dart';
import 'package:provider/provider.dart';

class AddMovieDrawer extends StatefulWidget {
  const AddMovieDrawer({Key? key}) : super(key: key);

  @override
  State<AddMovieDrawer> createState() => _AddMovieDrawerState();
}

class _AddMovieDrawerState extends State<AddMovieDrawer> {
  late final Movie _newMovie = Movie.empty();
  Movie? _editMovie;
  TextEditingController titleController = TextEditingController();
  TextEditingController descController = TextEditingController();
  TextEditingController posterUrlController = TextEditingController();
  TextEditingController ratingController = TextEditingController();

  @override
  void initState() {
    super.initState();
    Future.delayed(Duration.zero, () {
      _editMovie =
          Provider.of<MovieProvider>(context, listen: false).movieToEdit;
      if (_editMovie != null) {
        titleController = TextEditingController(text: _editMovie!.title);
        descController = TextEditingController(text: _editMovie!.description);
        posterUrlController = TextEditingController(text: _editMovie!.posterUrl);
        ratingController =
            TextEditingController(text: _editMovie!.rating.toString());
        setState(() {});
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: ListView(
          children: [
            const SizedBox(height: 40),
            Text(
              _editMovie == null ? 'Add Movie' : 'Edit Movie',
              style: const TextStyle(
                color: Colors.black,
                fontWeight: FontWeight.bold,
                fontSize: 20,
              ),
            ),
            const SizedBox(height: 20),
            TextFormField(
              controller: titleController,
              decoration: const InputDecoration(labelText: "Title"),
              onChanged: (value) {
                if (_editMovie == null) {
                  _newMovie.title = value;
                } else {
                  _editMovie!.title = value;
                }
              },
            ),
            const SizedBox(height: 20),
            TextFormField(
              controller: descController,
              decoration: const InputDecoration(labelText: 'Description'),
              maxLines: 3,
              onChanged: (value) {
                if (_editMovie == null) {
                  _newMovie.description = value;
                } else {
                  _editMovie!.description = value;
                }
              },
            ),
            const SizedBox(height: 20),
            TextFormField(
              controller: posterUrlController,
              decoration: const InputDecoration(labelText: 'Poster URL'),
              onChanged: (value) {
                if (_editMovie == null) {
                  _newMovie.posterUrl = value;
                } else {
                  _editMovie!.posterUrl = value;
                }
              },
            ),
            const SizedBox(height: 20),
            TextFormField(
              controller: ratingController,
              decoration: const InputDecoration(labelText: 'Rating'),
              inputFormatters: [
                FilteringTextInputFormatter.allow(RegExp(r'[0-9.]')),
              ],
              keyboardType: TextInputType.number,
              onChanged: (value) {
                if (_editMovie == null) {
                  _newMovie.rating = double.parse(value);
                } else {
                  _editMovie!.rating = double.parse(value);
                }
              },
            ),
            const SizedBox(height: 40),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: ElevButton(
                    text: _editMovie == null ? 'Add Movie' : 'Edit',
                    icon: _editMovie == null ? Icons.add : Icons.edit,
                    onPressed: () {
                      if (_editMovie == null) {
                        Provider.of<MovieProvider>(context, listen: false)
                            .addMovie(_newMovie);
                      } else {
                        Provider.of<MovieProvider>(context, listen: false)
                            .editMovie(_editMovie!);
                      }
                      Navigator.of(context).pop();
                    },
                  ),
                ),
                _editMovie != null
                    ? Padding(
                        padding: const EdgeInsets.only(left: 5),
                        child: ElevButton(
                          text: 'Delete',
                          icon: Icons.delete,
                          color: Colors.red,
                          onPressed: () {
                            Provider.of<MovieProvider>(context, listen: false)
                                .deleteMovie(_editMovie!);
                            Navigator.of(context).pop();
                          },
                        ),
                      )
                    : const SizedBox(),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
