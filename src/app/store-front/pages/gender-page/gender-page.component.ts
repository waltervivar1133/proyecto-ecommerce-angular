import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@products/services/products.service';
import { map } from 'rxjs';
import { ProductsGridComponent } from '@store-front/components/products-grid/products-grid.component';

@Component({
  selector: 'app-gender-page',
  imports: [ProductsGridComponent],
  template: `
    <products-grid
      [resource]="productsResource"
      [title]="'Productos ' + gender()"
      subtitle="Encuentra tu estilo"
    />
  `,
})
export class GenderPageComponent {
  route = inject(ActivatedRoute);
  productsService = inject(ProductsService);

  gender = toSignal(this.route.params.pipe(map(({ gender }) => gender)));

  productsResource = rxResource({
    request: () => ({ gender: this.gender() }),
    loader: ({ request }) => {
      return this.productsService.getProducts({ gender: request.gender });
    },
  });
}
