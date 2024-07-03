import 'package:flutter/cupertino.dart';
import 'package:product_flutter/Common/constants.dart';
import 'package:product_flutter/Models/product.dart';
import 'package:product_flutter/Repositories/product_repository.dart';

class ProductProvider extends ChangeNotifier {
  // List<Product> products = [];
  // Product? productToEdit;
  // int pagesNumber = 0;

  List<Product> products = [
    Product(id: 1, name: "Inception", description: "A mind-bending thriller", image: "https://example.com/inception.jpg", price: 8.8),
    Product(id: 2, name: "The Dark Knight", description: "A superhero film", image: "https://example.com/dark_knight.jpg", price: 9.0),
    Product(id: 3, name: "Interstellar", description: "A space exploration film", image: "https://example.com/interstellar.jpg", price: 8.6),
    Product(id: 4, name: "The Matrix", description: "A science fiction film", image: "https://example.com/matrix.jpg", price: 8.7),
    Product(id: 5, name: "Fight Club", description: "A cult classic", image: "https://example.com/fight_club.jpg", price: 8.8),
  ];
  Product? productToEdit;
  int pagesNumber = 1;

  final ProductRepository _productRepository = ProductRepository();

  getProducts(int page, String? searchValue, SortTypes? sortType,
      GetTypes getTypes) async {
    Map<String, dynamic> returnedData =
        await _productRepository.getProductsList(page, searchValue, sortType);
    List<Product> pageProducts = returnedData["products list"];
    pagesNumber = returnedData["pages number"];
    if (getTypes == GetTypes.PAGING) {
      products = products + pageProducts;
    } else if (getTypes == GetTypes.FILTER) {
      products = pageProducts;
    }
    notifyListeners();
  }

  addProduct(Product product) async {
    Product savedProduct = await _productRepository.addProduct(product);
    products.add(savedProduct);
    notifyListeners();
  }

  editProduct(Product product) async {
    Product editedProduct = await _productRepository.editProduct(product);
    products[products.indexOf(product)] = editedProduct;
    notifyListeners();
  }

  deleteProduct(Product product) async {
    await _productRepository.deleteProduct(product);
    products.remove(product);
    notifyListeners();
  }
}