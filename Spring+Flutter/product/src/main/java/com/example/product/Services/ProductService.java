package com.example.product.Services;

import com.example.product.Entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;

public interface ProductService {

    Product addProduct(Product product);

    Product editProduct(Product product);

    void deleteProduct(Long id);

    Page<Product> getRequestFilters(int page, int limit, String productName, Sort.Direction sortType);

}
