import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AbstractMovie } from './classes/abstract-movie';
import { Cartoon } from './classes/cartoon';
import { CreationType } from './classes/cartoon';
import { Serial } from './classes/serial';
import { GameMovie } from './classes/game-movie';
import { HttpClient, provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent implements OnInit {
  commands: string[] = [];
  http: HttpClient = inject(HttpClient);
  movies: AbstractMovie[] = [];

  movieEnum: { [key: string]: CreationType } = {
    "ComputerAnimation": CreationType.ComputerAnimation,
    "Clay": CreationType.Clay,
    "Doll": CreationType.Doll,
    "Printed": CreationType.Printed
  }

  movieFactory = {
    ADD: (type: string, args: any[]) => {
      switch (type) {
        case 'Serial': {
          if (!isNaN(args[2]) && args[2] > 0) {
            let temp: Serial = new Serial(args[0], args[1], args[2]);
            this.movies.push(temp);
          }
          break;
        }
        case 'GameMovie': {
          let temp = new GameMovie(args[0], args[1], args[2]);
          this.movies.push(temp);
          break;
        }
        case 'Cartoon': {
          if (this.movieTypeToEnum(args[2])) {
            let temp = new Cartoon(args[0], args[1], args[2]);
            this.movies.push(temp);
          }
          break;
        }
        default: break;
      }
    },
    REM: (name: string) => {
      this.movies = this.movies.filter((item) => item.name !== name);
    }
  }

  ngOnInit(): void {
    this.http.get('assets/data.txt', { responseType: 'text' }).subscribe(
      (data) => {
        this.commands = data.split(/\r?\n/);
        this.readCommands(this.commands);
      }
    )
  }

  readCommands(commands: string[]): void {
    for (let command in commands) {
      let splittedCom = commands[command].split(' ');
      switch (splittedCom[0]) {
        case 'ADD': {
          this.movieFactory.ADD(splittedCom[1], splittedCom.slice(2));
          break;
        }
        case 'REM': {
          this.movieFactory.REM(splittedCom[1]);
          break;
        }
        case 'PRINT': {
          for (let movie in this.movies) {
            this.movies[movie].print();
          }
          console.log('=======================================')
          break;
        }
        default: break;
      }
    }
  }

  movieTypeToEnum(type: string): CreationType | undefined {
    return this.movieEnum[type as keyof typeof this.movieEnum];
  }

}
