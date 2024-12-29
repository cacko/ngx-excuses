import { Component, ElementRef, inject, Renderer2 } from '@angular/core';
import { Router, EventType } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
@Component({
  selector: 'app-background',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './background.component.html'
})
export class BackgroundComponent {

  private backgrounds: string[] = [
    '/backgrounds/1.webp',
    '/backgrounds/2.webp',
    '/backgrounds/3.webp',
    '/backgrounds/4.webp',
    '/backgrounds/5.webp',
  ]

  imgSrc ?: string;

  constructor(
    private element: ElementRef = inject(ElementRef),
    private renderer: Renderer2 = inject(Renderer2),
    private router: Router
  ) {
    this.router.events.subscribe((e) => {
      switch (e.type) {
        case EventType.NavigationStart:
          this.rotateBackground();
          break;
        default:
          break
      }
    })
  }

  rotateBackground() {
    const current = this.backgrounds.shift() as string;
    this.backgrounds.push(current);
    this.imgSrc = current;
  }
}
