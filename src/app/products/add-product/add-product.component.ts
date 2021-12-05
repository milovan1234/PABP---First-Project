import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product, Supplier } from '../products.models';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  @Output('onProductAdd') onProductAdd: EventEmitter<void> = new EventEmitter<void>();
  @Input('categoryId') categoryId: number;
  @Input('suppliers') suppliers: Array<Supplier>;

  public product: Product = new Product();

  constructor(private productsService: ProductsService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  public saveProduct(): void {
    this.product.categoryId = this.categoryId;
    this.productsService.addProduct(this.product).subscribe(() => {
      this.toastr.success("Proizvod uspesno dodat!", "Dodavanje proizvoda");
      this.onProductAdd.emit();
    });
  }

}
