import { NgModule } from '@angular/core';
import { CardComponent } from './card.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';




@NgModule({
  declarations: [CardComponent],
  imports: [ MatCardModule, MatButtonModule ],
  exports: [CardComponent]

})
export class CardModule { 

}
