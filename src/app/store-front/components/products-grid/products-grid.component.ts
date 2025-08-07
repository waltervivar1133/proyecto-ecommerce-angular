import { Component, computed, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '@products/components/product-card/product-card.component';
import {
  ProductsResponse,
} from '@products/interfaces/product.interface';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';

@Component({
  selector: 'products-grid',
  imports: [CommonModule, ProductCardComponent, PaginationComponent],
  templateUrl: './products-grid.component.html',
})
export class ProductsGridComponent {
  resource = input.required<{
    isLoading: () => boolean;
    hasValue: () => boolean;
    value: () => ProductsResponse | null | undefined;
  }>();

  title = input<string>('Todos los productos');
  subtitle = input<string>('Para todos los gustos');

  readonly list = computed(() => this.resource()?.value()?.products ?? []);

   readonly pages = computed<number>(() =>
    this.resource()?.value()?.pages ?? 0
  );
}
