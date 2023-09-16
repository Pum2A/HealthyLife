import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ScrollingModule}  from '@angular/cdk/scrolling';
import { NgOptimizedImage } from '@angular/common'




@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    LazyLoadImageModule,
    ScrollingModule,
    NgOptimizedImage,

  ]
})
export class HomeModule { }
