import { CommonModule } from '@angular/common';
import { Component, input, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@products/interfaces/product.interface';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'product-card',
  imports: [CommonModule, RouterLink, ProductImagePipe],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  // @Input() product!: Product;

  product = input.required<Product>();

  imageBaseUrl = `${environment.baseUrl}/files/product`;
}
