import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: 'card.component.html',
})
export class CardComponent {
  @Input() imageSRC!: string;
  @Input() imageALT!: string;
  @Input() cardTitle!: string;
  @Input() buttonText?: string = undefined;
}
