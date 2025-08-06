import { Component, Input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '@products/components/product-card/product-card.component';
import { Product } from '@products/interfaces/product.interface';

export interface ProductsPayload {
  products: Product[];
}

@Component({
  selector: 'products-grid',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './products-grid.component.html',
})
export class ProductsGridComponent {
  @Input({ required: true })
  resource!: {
    isLoading: () => boolean;
    hasValue: () => boolean;
    value: () => ProductsPayload | null | undefined;
  };

  @Input() title = 'Todos los productos';
  @Input() subtitle = 'Para todos los gustos';

  readonly list = computed(() => this.resource?.value()?.products ?? []);
}
