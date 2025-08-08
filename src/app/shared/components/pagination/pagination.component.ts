import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  EventEmitter,
  input,
  linkedSignal,
  Output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { DebugPipe } from '@shared/pipes/debug.pipe';

@Component({
  selector: 'pagination',
  imports: [CommonModule, DebugPipe, RouterLink],
  standalone: true,
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  currentPage = input<number>(1);
  pages = input(0);

  activePage = linkedSignal(this.currentPage);

  @Output() pageChange = new EventEmitter<number>();

  getPagesList = computed<number[]>(() => {
    return Array.from({ length: this.pages() }, (_, i) => i + 1);
  });
}
