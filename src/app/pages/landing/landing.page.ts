import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UrlPages } from 'src/app/common/enums/url-pages.enum';
import { CardProps } from 'src/app/common/interfaces/card.interface';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss']
})
export class LandingPage {

  constructor(
    private readonly router: Router,
  ) { }

  cards: CardProps[] = [
    {
      title: 'Alex Quesada',
      subtitle: 'Cordinador General',
      content_1: 'Tel: 7203-3023',
      content_2: 'E-mail: aquesadav@ucenfotec.ac.cr',
      image: 'assets/images/alex_foto.jpg',
     
    },
    {
      title: 'Abraham Salas',
      subtitle: 'Coordinador de soporte',
      content_1: 'Teléfono: 8320-9053 ',
      content_2: 'E-mail: asalasa@ucenfotec.ac.cr',
      image: 'assets/images/abraham_foto.jpg',
      
    },
    {
      title: 'Alberto Solano Villalta',
      subtitle: 'Coordinador de calidad',
      content_1: 'Teléfono: 8791-8947',
      content_2: 'E-mail: asolanov@ucenfotec.ac.cr',
      image: 'assets/images/alberto_foto.jpg',
      
    }
    ,
    {
      title: 'Diego Fiatt Vargas',
      subtitle: 'Coordinador de calidad',
      content_1: 'Teléfono: 7204-9343',
      content_2: 'E-mail: dfiattv@ucenfotec.ac.cr',
      image: 'assets/images/diego_foto.jpg',
      
    }
    ,
    {
      title: 'Kristel Segura Gamez',
      subtitle: 'Coordinador de desarrollo',
      content_1: 'Teléfono: 8537-1754  ',
      content_2: 'E-mail: ksegurag@ucenfotec.ac.cr',
      image: 'assets/images/kristel_temp.jpeg',
      
    }
   
  ];

  goToHome(): void {
    this.router.navigate([UrlPages.HOME]);
  }
}
