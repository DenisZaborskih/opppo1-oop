import { AbstractMovie } from "./abstract-movie";

export class GameMovie extends AbstractMovie {
    constructor(public name: string, public author: string, public originGame : string) {
        super();
    }

    override print(): void {
        console.log(`Игровой фильм ${this.name}, режиссёр: ${this.author}, игра-источник: ${this.originGame}`);
    }
}
