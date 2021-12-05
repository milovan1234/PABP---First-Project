import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, OrderDetails, Product, Supplier } from './products.models';

@Injectable()
export class ProductsService {

  constructor(private http: HttpClient) { }

  public getCategories(): Observable<Array<Category>> {
    return this.http.get<Array<Category>>(`http://94.156.189.137:8000/api/categories`);
  }

  public getProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(`http://94.156.189.137:8000/api/products`);
  }

  public getSuppliers(): Observable<Array<Supplier>> {
    return this.http.get<Array<Supplier>>(`http://94.156.189.137:8000/api/suppliers`);
  }

  public updateProduct(model: Product): Observable<void> {
    return this.http.put<void>(`http://94.156.189.137:8000/api/products/${model.productId}`, model);
  }

  public deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`http://94.156.189.137:8000/api/products/${productId}`);
  }

  public addProduct(model: Product): Observable<void> {
    return this.http.post<void>(`http://94.156.189.137:8000/api/products`, model);
  }

  public getOrderDetails(): Observable<Array<OrderDetails>> {
    return this.http.get<Array<OrderDetails>>(`http://94.156.189.137:8000/api/orderDetails`);
  }
}
