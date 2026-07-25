import { Directive, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  @Input() appHighlight = 'yellow';

  @HostBinding('style.background-color')
  backgroundColor = 'transparent';

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.backgroundColor = this.appHighlight;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.backgroundColor = 'transparent';
  }
}

