import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  EventEmitter,
  input,
  Output,
} from '@angular/core';
import { DebugPipe } from '@shared/pipes/debug.pipe';

@Component({
  selector: 'pagination',
  imports: [CommonModule, DebugPipe],
  standalone: true,
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  currentPage = input<number>(1);
  pages = input(0);

  @Output() pageChange = new EventEmitter<number>();

  getPagesList = computed<number[]>(() => {
    return Array.from({ length: this.pages() }, (_, i) => i + 1);
  });
}
