import 'package:flutter/material.dart';
import 'package:flutter_movie/Common/constants.dart';
import 'package:flutter_movie/Providers/movie_provider.dart';
import 'package:flutter_movie/Views/Widgets/add_movie_drawer.dart';
import 'package:flutter_movie/Views/Widgets/elev_button.dart';
import 'package:flutter_movie/Views/Widgets/movie_container.dart';
import 'package:provider/provider.dart';
import 'package:responsive_grid/responsive_grid.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  List<String> sortBy = ['Rating Ascending', 'Rating Descending', 'none'];
  SortTypes? sortType;
  String? sortValue;
  String? searchValue;
  int pagesNum = 0;
  int nextPage = 1;

  @override
  void initState() {
    super.initState();
    Future.delayed(Duration.zero, () async {
      await Provider.of<MovieProvider>(context, listen: false)
          .getMovies(0, null, null, GetTypes.PAGING);
      pagesNum = Provider.of<MovieProvider>(context, listen: false).pagesNumber;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      key: _scaffoldKey,
      appBar: AppBar(
        backgroundColor: APP_COLOR,
        title: const Text(
          "Movie House 🎥",
          style: TextStyle(fontWeight: FontWeight.w700),
        ),
        centerTitle: true,
        actions: const [SizedBox()],
      ),
      endDrawer: const AddMovieDrawer(),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SizedBox(height: 30),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 30),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'Movies 🎬',
                  style: TextStyle(fontSize: 25, fontWeight: FontWeight.bold),
                ),
                ElevButton(
                  text: 'Add Movie 🎬',
                  icon: Icons.add,
                  onPressed: () {
                    Provider.of<MovieProvider>(context, listen: false)
                        .movieToEdit = null;
                    _scaffoldKey.currentState!.openEndDrawer();
                  },
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),
          Padding(
            padding: const EdgeInsets.only(right: 20),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                SizedBox(
                  width: 180,
                  child: TextField(
                    decoration: const InputDecoration(
                      contentPadding: EdgeInsets.symmetric(vertical: 15),
                      hintText: 'search by title...',
                      border: InputBorder.none,
                      prefixIcon: Icon(Icons.search),
                    ),
                    onChanged: (input) {
                      searchValue = input;
                    },
                  ),
                ),
                const SizedBox(width: 10),
                SizedBox(
                  width: 150,
                  child: DropdownButton(
                    hint: const Text("Sort By"),
                    value: sortValue,
                    items: sortBy.map((String value) {
                      return DropdownMenuItem<String>(
                        value: value,
                        child: Text(value),
                      );
                    }).toList(),
                    onChanged: (value) {
                      sortValue = value;
                      if (value == sortBy[0]) {
                        sortType = SortTypes.ASC;
                      } else if (value == sortBy[1]) {
                        sortType = SortTypes.DESC;
                      } else {
                        sortType = null;
                      }
                      setState(() {});
                    },
                  ),
                ),
                const SizedBox(width: 10),
                ElevButton(
                  text: "Filter",
                  icon: Icons.filter_list,
                  color: Colors.black,
                  onPressed: () async {
                    await Provider.of<MovieProvider>(context, listen: false)
                        .getMovies(0, searchValue, sortType, GetTypes.FILTER);
                    pagesNum =
                        Provider.of<MovieProvider>(context, listen: false)
                            .pagesNumber;
                    nextPage = 1;
                    setState(() {});
                  },
                )
              ],
            ),
          ),
          const SizedBox(height: 30),
          Expanded(
            child: ResponsiveGridList(
              desiredItemWidth: 200,
              minSpacing: 20,
              children: Provider.of<MovieProvider>(context)
                  .movies
                  .map<Widget>((movie) {
                return GestureDetector(
                  onTap: () {
                    Provider.of<MovieProvider>(context, listen: false)
                        .movieToEdit = movie;
                    _scaffoldKey.currentState!.openEndDrawer();
                  },
                  child: MovieContainer(movie: movie),
                );
              }).toList()
                ..add(
                  pagesNum > 1
                      ? Column(
                          mainAxisAlignment: MainAxisAlignment.end,
                          children: [
                            SizedBox(
                              height: 210,
                              child: ElevButton(
                                text: 'Load More',
                                icon: Icons.add,
                                color: Colors.grey,
                                onPressed: () {
                                  Provider.of<MovieProvider>(context,
                                          listen: false)
                                      .getMovies(nextPage, searchValue,
                                          sortType, GetTypes.PAGING);
                                  pagesNum--;
                                  nextPage++;
                                },
                              ),
                            ),
                          ],
                        )
                      : const SizedBox(),
                ),
            ),
          ),
        ],
      ),
    );
  }
}
