import { Component, inject } from '@angular/core';
import { ProductsService } from '@products/services/products.service';
import { rxResource } from '@angular/core/rxjs-interop';

import { ProductsGridComponent } from '@store-front/components/products-grid/products-grid.component';
import { PaginationService } from '@shared/components/pagination/pagination.service';

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

  paginationService = inject(PaginationService);

  productsResource = rxResource({
    request: () => ({ page: this.paginationService.currentPage() }),
    loader: ({ request }) => {
      return this.productsService.getProducts({
        limit: 12,
        offset: (request.page - 1) * 12,
      });
    },
  });
}
