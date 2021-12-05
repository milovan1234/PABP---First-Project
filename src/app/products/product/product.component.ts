import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import { Category, OrderDetails, Product, Supplier } from '../products.models';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Output('onProductEditDelete') onProductEditDelete: EventEmitter<number> = new EventEmitter<number>();
  @Input('product') product: Product;
  @Input('suppliers') suppliers: Array<Supplier>;
  @Input('categories') categories: Array<Category>;
  @Input('index') index: number;

  public isEdit: boolean = false;
  private copyProdyct: Product;

  constructor(private proudctsService: ProductsService,
    private toastr: ToastrService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.copyProdyct = {...this.product};
  }

  editProduct(): void {
    this.isEdit = true;
  }

  cancelEdit(): void {
    this.product = {...this.copyProdyct};
    this.isEdit = false;
  }

  updateProduct(): void {
    this.proudctsService.updateProduct(this.product).subscribe(() => {
      this.toastr.success("Proizvod uspesno izmenjen!", "Proizvod izmenjen");
      this.isEdit = false;
      this.onProductEditDelete.emit();
    });    
  }

  deleteProduct(): void {
    this.proudctsService.deleteProduct(this.product.productId).subscribe(() => {
      this.toastr.success("Proizvod uspesno obrisan!", "Brisanje proizovda");
      this.onProductEditDelete.emit();
    });
  }

  showOrderDetails(): void {
    ModalOptions
    this.proudctsService.getOrderDetails().subscribe((details: Array<OrderDetails>) => {
      const initialState = {orderDetails: [...details.filter(d => d.productId === this.product.productId)]};
      this.modalService.show(OrderDetailsComponent, 
        { 
          initialState,
          class: "modal-xl"
        });
    });
    
  }

}
