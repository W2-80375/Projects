package com.example.product.Controllers;


import com.example.product.Entities.Product;
import com.example.product.Handler.ResponseHandler;
import com.example.product.Services.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;


    @GetMapping
    public ResponseEntity<Object> getProducts(@RequestParam(required = false,defaultValue = "0") int page,
                                              @RequestParam(required = false,defaultValue = "5") int limit,
                                              @RequestParam(required = false)  String productName,
                                              @RequestParam(required = false) Sort.Direction sortType){
        try {
            Page<Product> productPage = productService.getRequestFilters(page,limit,productName,sortType);
            return ResponseHandler.handleResponse("Successfully get products",HttpStatus.OK,productPage);
        }catch (Exception e){
            return ResponseHandler.handleResponse("ERROR",HttpStatus.BAD_REQUEST,e.getMessage());
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Object> addProduct(@RequestBody @Valid Product product){
        try {
            Product addedProduct = productService.addProduct(product);
            return ResponseHandler.handleResponse("Successfully add product", HttpStatus.OK,addedProduct);
        }catch (Exception e){
            return ResponseHandler.handleResponse("ERROR", HttpStatus.BAD_REQUEST,e.getMessage());
        }
    }

    @PutMapping("/edit")
    public ResponseEntity<Object> editProduct(@RequestBody @Valid Product product){
        try {
            Product editedProduct = productService.editProduct(product);
            if(editedProduct!=null){
                return ResponseHandler.handleResponse("Successfully edit product", HttpStatus.OK,editedProduct);
            }else{
                return ResponseHandler.handleResponse("Product Id Not exist", HttpStatus.BAD_REQUEST,null);
            }
        }catch (Exception e){
            return ResponseHandler.handleResponse("ERROR", HttpStatus.BAD_REQUEST,e.getMessage());
        }
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> deleteProduct(@PathVariable Long id){
        try {
            productService.deleteProduct(id);
            return ResponseHandler.handleResponse("Successfully delete product", HttpStatus.OK,null);
        }catch (Exception e){
            return ResponseHandler.handleResponse("ERROR", HttpStatus.BAD_REQUEST,e.getMessage());
        }
    }

}
