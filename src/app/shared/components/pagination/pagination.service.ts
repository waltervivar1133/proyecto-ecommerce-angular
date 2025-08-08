import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PaginationService {
  activeRoute = inject(ActivatedRoute);

  currentPage = toSignal(
    this.activeRoute.queryParams.pipe(
      map((params) => (params['page'] ? +params['page'] : 1)),
      map((page) => (isNaN(page) ? 1 : page))
    ),
    { initialValue: 1 }
  );
}
