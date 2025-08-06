import { Component, inject } from '@angular/core';
import { ProductsService } from '@products/services/products.service';
import { rxResource } from '@angular/core/rxjs-interop';

import { ProductsGridComponent } from '@store-front/components/products-grid/products-grid.component';

@Component({
  selector: 'app-home-page',
  imports: [ProductsGridComponent],
  template: `
    <products-grid
      [resource]="productsResource"
      title="Productos destacados"
      subtitle="Para todos los gustos"
    />
  `,
})
export class HomePageComponent {
  productsService = inject(ProductsService);

  productsResource = rxResource({
    request: () => ({}),
    loader: () => {
      return this.productsService.getProducts({ limit: 5, gender: 'woman' });
    },
  });
}
