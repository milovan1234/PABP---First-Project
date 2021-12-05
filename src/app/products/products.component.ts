import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Category, Product, Supplier } from './products.models';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductsService]
})
export class ProductsComponent implements OnInit {
  public categories: Array<Category>;
  public products: Array<Product>;
  public filteredProducts: Array<Product>;
  public suppliers: Array<Supplier>;
  public selectedCategory: number;

  public isAdding: boolean = false;

  public supplierId: number = 0;
  public unitPrice: number;

  constructor(private productsService: ProductsService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initCategories();    
    this.initSuppliers();
    this.initProducts();
  }

  private initCategories(): void {
    this.productsService.getCategories().subscribe((categories: Array<Category>) => {
      this.categories = categories;
    });
  }

  private initProducts(): void {
    this.productsService.getProducts().subscribe((products: Array<Product>) => {
      this.products = products;
    });
  }

  private initSuppliers(): void {
    this.productsService.getSuppliers().subscribe((suppliers: Array<Supplier>) => {
      this.suppliers = suppliers;
    });
  }

  public onCategoryChange(): void {
    this.filteredProducts = [...this.products.filter(p => p.categoryId === +this.selectedCategory)];
    this.filteredProducts.forEach(product => {
      product.category = this.categories.find(c => c.categoryId === product.categoryId);
      product.supplier = this.suppliers.find(s => s.supplierId === product.supplierId);
    });
  }

  public onProductAdd(): void {
    this.isAdding = false;
    this.productsService.getProducts().subscribe((products: Array<Product>) => {
      this.products = products;
      this.onCategoryChange();
    });    
  }

  public addProduct(): void {
    this.isAdding = true;
  }

  public backToProductsView(): void {
    this.isAdding = false;
  }

  public onProductEditDelete(): void {
    this.productsService.getProducts().subscribe((products: Array<Product>) => {
      this.products = products;
      this.onCategoryChange();      
    });
  }

  searchProducts(): void {
    this.onCategoryChange();
    if (+this.supplierId) {
      this.filteredProducts = [...this.filteredProducts.filter(p => p.supplierId === +this.supplierId)];
    }
    if (+this.unitPrice) {
      this.filteredProducts = [...this.filteredProducts.filter(p => p.unitPrice <= +this.unitPrice)];
    }
  }
}
