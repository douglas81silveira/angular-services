import { Component, OnInit } from '@angular/core';
import { PokemonData } from 'src/app/models/pokemonData';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  searchText: string = '';

  pokemon: PokemonData;

  constructor(private service: PokemonService) {
    this.pokemon = {
      id: 0,
      name: '',
      sprites: {
        front_default: '',
      },
      types: [],
    };
  }

  ngOnInit(): void {
    this.getPokemon('pikachu');
  }

  getPokemon(searchName: string) {
    this.service.getPokemon(searchName).subscribe({
      next: (res) => {
        this.pokemon = {
          id: res.id,
          name: res.name,
          sprites: res.sprites,
          types: res.types,
        };
      },
      error: (err) => {
        console.log(err);
        this.pokemon = {
          id: 0,
          name: 'Unfound Pokémon!',
          sprites: {
            front_default:
              'https://www.sqwordle.io/static/media/pokeball-2.ead60815894a4642571c.png',
          },
          types: [{ slot: 1, type: { name: 'Null  ', url: '' } }],
        };
      },
    });
  }

  setSearchText(searchText: string) {
    this.searchText = searchText;
  }
}
