import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img {
  
        }
  `
  ]
})
export class AgregarComponent implements OnInit {

  constructor(private heroesService: HeroesService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.heroesService.getHeroesPorId(id))  
      )
      .subscribe( heroe => this.heroe = heroe);
  }

  heroe: Heroe= {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  };

  publishers= [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    }
  ];

  guardar(){

    if(this.heroe.superhero.trim().length === 0){
      return;
    }

    if ( this.heroe.id ){
      this.heroesService.actualizarHeroe(this.heroe)
        .subscribe(heroe => console.log(heroe));
    }else {
      this.heroesService.agregarHeroe(this.heroe)
      .subscribe(heroe=>{
        this.router.navigate(['/heroes/editar/', heroe.id]);
      });
    }
    



  }

}
