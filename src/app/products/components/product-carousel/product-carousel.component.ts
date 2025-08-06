import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  viewChild,
} from '@angular/core';

import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination } from 'swiper/modules';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';

@Component({
  selector: 'product-carousel',
  imports: [ProductImagePipe],
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.scss'],
})
export class ProductCarouselComponent implements AfterViewInit {
  images = input.required<string[]>();

  swiperContainer = viewChild.required<ElementRef>('swiperContainer');

  ngAfterViewInit(): void {
    const element = this.swiperContainer().nativeElement;

    if (!element) return;

    const swiper = new Swiper(element, {
      direction: 'horizontal',
      loop: true,
      modules: [Navigation, Pagination],

      pagination: {
        el: '.swiper-pagination',
      },

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }
}
