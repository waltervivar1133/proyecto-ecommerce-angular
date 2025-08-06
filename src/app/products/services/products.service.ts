import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  Product,
  ProductsResponse,
} from '@products/interfaces/product.interface';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const baseUrl = environment.baseUrl;

interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private http = inject(HttpClient);

  getProducts(options: Options): Observable<ProductsResponse> {
    const { limit = 9, gender = '', offset = 0 } = options;
    return this.http
      .get<ProductsResponse>(`${baseUrl}/products`, {
        params: {
          limit,
          offset,
          gender,
        },
      })
      .pipe(tap((response) => console.log('Products fetched:', response)));
  }

  getProductById(idSlug: string): Observable<Product> {
    return this.http
      .get<Product>(`${baseUrl}/products/${idSlug}`)
      .pipe(
        tap((response) =>
          console.log(`Product with ID ${idSlug} fetched:`, response)
        )
      );
  }
}
