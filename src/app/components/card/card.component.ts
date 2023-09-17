import { Component, Input } from '@angular/core';
import { CardProps } from 'src/app/common/interfaces/card.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() cardData!: CardProps;


}
