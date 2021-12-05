
export class Category {
    public categoryId: number;
    public categoryName: string;
}

export class Product {
    public productId: number;
    public productName: string;
    public unitPrice: number;
    public unitsInStock: number;
    public discontinued: boolean;
    public categoryId: number;
    public supplierId: number;
    public category?: Category;
    public supplier?: Supplier;
}

export class Supplier {
    public supplierId: number;
    public companyName: string;
}

export class OrderDetails {
    public orderId: number;
    public productId: number;
    public unitPrice: number;
    public quantity: number;
}