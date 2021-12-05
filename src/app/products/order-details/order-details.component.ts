import { Component, OnInit } from '@angular/core';
import { OrderDetails } from '../products.models';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  public orderDetails: Array<OrderDetails>;
  public orderDetailsView: Array<OrderDetails> = new Array<OrderDetails>();
  public currentPage: number = 0;
  public numberOfPages: number;
  public itemsPerPage: number = 10;

  constructor() { }

  ngOnInit(): void {
    this.numberOfPages = Math.ceil(this.orderDetails.length / this.itemsPerPage);
    this.initOrderDetailsView();
  }

  nextPage(): void {    
    if (this.currentPage < this.numberOfPages - 1) {
      this.orderDetailsView = [];
      this.currentPage++;
      this.initOrderDetailsView();
    }
  }

  previousPage(): void {    
    if (this.currentPage > 0) {
      this.orderDetailsView = [];
      this.currentPage--;
      this.initOrderDetailsView();
    }
  }

  initOrderDetailsView(): void {
    for (let i = this.currentPage * this.itemsPerPage; i < (this.currentPage + 1) * this.itemsPerPage; i ++) {
      if (this.orderDetails[i]) {
        this.orderDetailsView.push(this.orderDetails[i]);
      }     
    }
  }
}
