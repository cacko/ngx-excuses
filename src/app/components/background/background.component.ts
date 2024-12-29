import { Component, ElementRef, inject, Renderer2, SimpleChange } from '@angular/core';
import { EventType, Router } from '@angular/router';

@Component({
  selector: 'app-background',
  imports: [],
  templateUrl: './background.component.html',
  styleUrl: './background.component.scss'
})
export class BackgroundComponent {

  private backgrounds: string[] = [
    '/backgrounds/1.webp',
    '/backgrounds/2.webp',
    '/backgrounds/3.webp',
    '/backgrounds/4.webp',
    '/backgrounds/5.webp',
  ]

  constructor(
    private element: ElementRef = inject(ElementRef),
    private renderer: Renderer2 = inject(Renderer2),
    private router: Router
  ) {
    this.router.events.subscribe((e) => {
      switch (e.type) {
        case EventType.NavigationEnd:
          this.ngAfterViewInit();
          break;
        default:
          break
      }
    })
  }

  ngOnChanges(changes: SimpleChange): void {
    // this.dbSub?.unsubscribe();
    this.ngAfterViewInit();
  }

  ngAfterViewInit(): void {
    const current = this.backgrounds.shift() as string;
    this.backgrounds.push(current);
    this.renderer.setStyle(this.element.nativeElement, "background-image", `url(${current})`);
  }
}
