import { AbstractMovie } from "./abstract-movie";

export class Serial extends AbstractMovie {
    constructor(public name: string, public author: string, public duration : number) {
        super();
    }

    override print(): void {
        console.log(`Сериал ${this.name}, режиссёр: ${this.author}, кол-во серий: ${this.duration}`);
    }
}
