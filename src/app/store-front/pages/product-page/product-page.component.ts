import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@products/services/products.service';
import { ProductCarouselComponent } from "@products/components/product-carousel/product-carousel.component";

@Component({
  selector: 'app-product-page',
  imports: [ProductCarouselComponent],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent {
  productsService = inject(ProductsService);
  route = inject(ActivatedRoute);

  productId = this.route.snapshot.params['idSlug'];

  productPage = rxResource({
    request: () => ({ idSlug: this.productId }),
    loader: ({ request }) => {
      return this.productsService.getProductById(request.idSlug);
    },
  });
}
